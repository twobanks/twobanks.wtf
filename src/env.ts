import { z } from "zod";

// ============================================================================
// Schema de variáveis de ambiente
// ============================================================================

const envSchema = z.object({
  // ------------------------------------------------------------------
  // OBRIGATÓRIAS
  // A ausência ou um valor inválido impede o build (exceto com
  // SKIP_ENV_VALIDATION=1, ex.: CI).
  // ------------------------------------------------------------------
  DATABASE_URL: z.string().url("DATABASE_URL deve ser uma URL válida."),
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY é obrigatória."),

  // ------------------------------------------------------------------
  // OPCIONAIS
  // Possuem valor padrão ou são validadas no local de uso.
  // ------------------------------------------------------------------
  RESEND_FROM_EMAIL: z.string().default("noreply@twobanks.wtf"),
  COROS_AUTH_TOKEN: z.string().optional(),
  STRAVA_WEBHOOK_VERIFY_TOKEN: z.string().optional(),
  NEXT_PUBLIC_MAPBOX_TOKEN: z.string().optional(),
  SPOTIFY_CLIENT_ID: z.string().optional(),
  SPOTIFY_CLIENT_SECRET: z.string().optional(),
  SPOTIFY_REFRESH_TOKEN: z.string().optional(),
  STRAVA_CLIENT_ID: z.string().optional(),
  STRAVA_CLIENT_SECRET: z.string().optional(),
  STRAVA_REFRESH_TOKEN: z.string().optional(),

  // NextAuth (Auth.js v5). Opcionais no schema base para não quebrar
  // builds sem .env; a obrigatoriedade em Produção é aplicada em
  // validateEnv (abaixo) e em src/auth.ts.
  AUTH_SECRET: z.string().optional(),
  NEXTAUTH_SECRET: z.string().optional(),
  AUTH_TRUST_HOST: z.string().optional(),

  // Escape-hatch: quando definido como "1" (ex.: CI), pula a validação
  // de obrigatórias.
  SKIP_ENV_VALIDATION: z.string().optional(),
});

type Env = z.infer<typeof envSchema>;

export function validateEnv(input: unknown): Env {
  // Em ambientes de CI não queremos falhar por falta de segredos reais.
  if ((input as Record<string, string | undefined>)?.SKIP_ENV_VALIDATION === "1") {
    return {} as Env;
  }

  const result = envSchema.safeParse(input);

  if (!result.success) {
    console.error(
      "❌ Variáveis de ambiente inválidas ou ausentes:",
      result.error.issues,
    );
    throw new Error(
      "Falha na validação das variáveis de ambiente. Verifique o ficheiro .env.example.",
    );
  }

  const data = result.data;

  // Em Produção, AUTH_SECRET (ou NEXTAUTH_SECRET) torna-se obrigatória.
  const isProduction =
    process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";

  if (isProduction && !data.AUTH_SECRET && !data.NEXTAUTH_SECRET) {
    throw new Error(
      "AUTH_SECRET (ou NEXTAUTH_SECRET) é obrigatória em Produção. " +
        "Defina no painel da Vercel (Preview e Produção).",
    );
  }

  return data;
}

let _cachedEnv: Env | null = null;

function loadEnv(): Env {
  if (_cachedEnv) return _cachedEnv;
  const input = process.env;

  // Durante next build (NEXT_PHASE inclui "build"), não validar variáveis
  // obrigatórias para não quebrar a coleta de página. O erro explícito
  // ocorre no runtime ao usar db/env (veja src/db/index.ts e src/auth.ts).
  if (process.env.NEXT_PHASE?.includes("build")) {
    _cachedEnv = {} as Env;
    return _cachedEnv;
  }

  if (input.SKIP_ENV_VALIDATION === "1") {
    _cachedEnv = {} as Env;
    return _cachedEnv;
  }
  const result = envSchema.safeParse(input);
  if (!result.success) {
    console.error(
      "❌ Variáveis de ambiente inválidas ou ausentes:",
      result.error.issues,
    );
    throw new Error(
      "Falha na validação das variáveis de ambiente. Verifique o ficheiro .env.example.",
    );
  }
  const data = result.data;
  const isProduction =
    process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";
  if (isProduction && !data.AUTH_SECRET && !data.NEXTAUTH_SECRET) {
    throw new Error(
      "AUTH_SECRET (ou NEXTAUTH_SECRET) é obrigatória em Produção. " +
        "Defina no painel da Vercel (Preview e Produção).",
    );
  }
  _cachedEnv = data;
  return data;
}

export const env = new Proxy({} as Env, {
  get(_, prop: string) {
    return loadEnv()[prop as keyof Env];
  },
});

// ============================================================================
// Helpers de ambiente
// ============================================================================

export function isProduction(): boolean {
  return process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";
}

export function isPreview(): boolean {
  return process.env.VERCEL_ENV === "preview";
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}

export function isVercel(): boolean {
  return !!process.env.VERCEL_ENV;
}
