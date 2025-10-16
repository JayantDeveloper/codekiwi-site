import NextAuth, {
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
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
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid?: string;
    provider?: string;
    givenName?: string | null;
    familyName?: string | null;
    accessToken?: string;
  }
}

type GoogleProfile = {
  email?: string;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
};

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
            "https://www.googleapis.com/auth/drive",  // Changed from drive.file to drive
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
        const gp = (profile ?? {}) as GoogleProfile;
        if (!gp.email) return false;

        await prisma.user.upsert({
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
        });
      }
      return true;
    },

    async jwt({ token, account, user }) {
      if (account?.provider) token.provider = account.provider;

      // Store the access token when user signs in with Google
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }

      if (user) {
        token.uid = user.id;
      }

      if (token.email) {
        const u = await prisma.user.findUnique({
          where: { email: token.email as string },
          select: { id: true, givenName: true, familyName: true },
        });
        if (u) {
          token.uid = u.id;
          token.givenName = u.givenName ?? null;
          token.familyName = u.familyName ?? null;
        }
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
      return session;
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
export { signOut } from "next-auth/react";