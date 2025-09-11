import NextAuth, {
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import type { JWT } from "next-auth/jwt";

// ---- Type augmentations so we never need `any`

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      givenName?: string | null;
      familyName?: string | null;
    };
    provider?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid?: string;
    provider?: string;
    givenName?: string | null;
    familyName?: string | null;
  }
}

// Minimal shape we care about from Google's profile
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
    }),
  ],
  session: { strategy: "jwt" },

  callbacks: {
    // Upsert user on sign-in
    async signIn({ profile }) {
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
      return true;
    },

    // Enrich JWT with db id + provider + names
    async jwt({ token, account }) {
      if (account?.provider) token.provider = account.provider;

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

    // Reflect JWT onto session (fully typed)
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.uid ?? "";
        session.user.givenName = token.givenName ?? undefined;
        session.user.familyName = token.familyName ?? undefined;
      }
      session.provider = token.provider ?? undefined;
      return session;
    },
  },

  pages: { signIn: "/signin" },
};

// App Router handlers + `auth` helper
export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(authOptions);
