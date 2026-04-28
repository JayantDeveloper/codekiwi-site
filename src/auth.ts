import NextAuth, { type NextAuthOptions, type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      givenName?: string | null;
      familyName?: string | null;
    };
    provider?: string;
    accessToken?: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid?: string;
    provider?: string;
    givenName?: string | null;
    familyName?: string | null;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    error?: string;
  }
}

type GoogleProfile = {
  email?: string;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
};

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken!,
      }),
    });

    const refreshed = await response.json();
    if (!response.ok) throw refreshed;

    return {
      ...token,
      accessToken: refreshed.access_token,
      accessTokenExpires: Date.now() + refreshed.expires_in * 1000,
      refreshToken: refreshed.refresh_token ?? token.refreshToken,
      error: undefined,
    };
  } catch (error) {
    console.error("Failed to refresh Google access token:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: [
            "openid",
            "email",
            "profile",
            "https://www.googleapis.com/auth/presentations",
            "https://www.googleapis.com/auth/drive", // Changed from drive.file to drive
          ].join(" "),
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const gp = profile as GoogleProfile | undefined;
        if (!gp?.email) return false;

        try {
          const dbUser = await prisma.user.upsert({
            where: { email: gp.email },
            create: {
              email: gp.email,
              name: gp.name ?? null,
              image: gp.picture ?? null,
              givenName: gp.given_name ?? null,
              familyName: gp.family_name ?? null,
              settings: { create: {} },
            },
            update: {
              name: gp.name ?? undefined,
              image: gp.picture ?? undefined,
              givenName: gp.given_name ?? undefined,
              familyName: gp.family_name ?? undefined,
            },
            select: { id: true },
          });

          // Ensure settings exist for users who signed up via credentials
          await prisma.settings.upsert({
            where: { userId: dbUser.id },
            create: { userId: dbUser.id },
            update: {},
          });
        } catch (error) {
          console.error("Google sign-in DB error:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, account, user }) {
      // Initial sign-in: store everything from the account
      if (account) {
        token.provider = account.provider;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at
          ? account.expires_at * 1000
          : Date.now() + 3600 * 1000;
      }

      if (user) {
        token.uid = user.id;
      }

      if (token.email) {
        const u = await prisma.user.findUnique({
          where: { email: token.email },
          select: { id: true, givenName: true, familyName: true },
        });
        if (u) {
          token.uid = u.id;
          token.givenName = u.givenName ?? null;
          token.familyName = u.familyName ?? null;
        }
      }

      // Token still valid — return as-is
      if (Date.now() < (token.accessTokenExpires ?? 0)) {
        return token;
      }

      // Access token expired — try to refresh
      if (token.refreshToken && token.provider === "google") {
        return refreshAccessToken(token);
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.uid ?? "";
        session.user.givenName = token.givenName ?? undefined;
        session.user.familyName = token.familyName ?? undefined;
      }
      session.provider = token.provider ?? undefined;
      session.accessToken = token.accessToken ?? undefined;
      session.error = token.error ?? undefined;
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      // Otherwise redirect to launch-session
      return `${baseUrl}/launch-session`;
    },
  },

  pages: { signIn: "/signin" },
};

export async function getServerSession() {
  const { getServerSession: getSession } = await import("next-auth/next");
  return getSession(authOptions);
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
