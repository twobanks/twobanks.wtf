import { db } from "@/db";
import { otpCodes, users } from "@/db/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import { and, desc, eq, gt, isNull } from "drizzle-orm";
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User {
    role?: string | null;
  }
  interface Session {
    user: {
      id: string;
      role?: string | null;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 horas
  },
  providers: [
    Credentials({
      name: "OTP",
      credentials: {
        identifier: { label: "Email", type: "text" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.otp) return null;

        const identifier = String(credentials.identifier).toLowerCase();
        const otp = String(credentials.otp);

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, identifier));

        if (!user) return null;

        const [otpRecord] = await db
          .select()
          .from(otpCodes)
          .where(
            and(
              eq(otpCodes.userId, user.id),
              isNull(otpCodes.consumedAt),
              gt(otpCodes.expiresAt, new Date())
            )
          )
          .orderBy(desc(otpCodes.createdAt))
          .limit(1);

        if (!otpRecord) return null;

        const isValid = await bcrypt.compare(otp, otpRecord.codeHash);
        if (!isValid) return null;

        await db
          .update(otpCodes)
          .set({ consumedAt: new Date() })
          .where(eq(otpCodes.id, otpRecord.id));

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});