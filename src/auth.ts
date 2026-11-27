import { db, ensureDb } from "@/db";
import { otpCodes, users } from "@/db/schema";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import { and, desc, eq, gt, isNull } from "drizzle-orm";
import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { isProduction } from "./env";

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

const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;

const isNextBuild = process.env.NEXT_PHASE?.includes("build") === true;

if (!secret && isProduction() && !isNextBuild) {
  throw new Error(
    "AUTH_SECRET (ou NEXTAUTH_SECRET) é obrigatório em produção. " +
      "Defina no painel da Vercel (Preview e Produção) e nunca commite no repositório.",
  );
}

// Se DATABASE_URL não estiver definida no ambiente de build, não inicializamos
// o DrizzleAdapter aqui (evita falha na coleta de página do next build).
// O erro explícito é adiado para o runtime, quando auth() for realmente chamado.
const hasDatabaseUrl = !!process.env.DATABASE_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let authExports: any;

if (hasDatabaseUrl) {
  // Força a inicialização do db para que o DrizzleAdapter receba
  // uma instância real de drizzle (não o Proxy lazy).
  ensureDb();
  authExports = NextAuth({
    adapter: DrizzleAdapter(db),
    secret,
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
} else {
  const authError = () => {
    throw new Error(
      "DATABASE_URL não está configurada. Defina-a no .env antes de usar autenticação."
    );
  };
  authExports = {
    handlers: {
      GET: authError,
      POST: authError,
    },
    // Durante build sem DATABASE_URL, auth() retorna null (sem sessão) para
    // permitir a pré-renderização estática de páginas. O erro explícito
    // ocorre apenas quando auth() é realmente usado em runtime.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    auth: async () => null as any,
    signIn: null,
    signOut: null,
  };
}

export const { handlers, auth, signIn, signOut } = authExports;