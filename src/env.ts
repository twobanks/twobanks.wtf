import { z } from "zod";

const envSchema = z.object({
  // Obrigatórias: a ausência ou um valor inválido impede o build.
  DATABASE_URL: z.string().url("DATABASE_URL deve ser uma URL válida."),
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY é obrigatória."),

  // Opcionais: possuem valor padrão ou são validadas onde são usadas.
  RESEND_FROM_EMAIL: z.string().optional(),
  COROS_AUTH_TOKEN: z.string().optional(),
  STRAVA_WEBHOOK_VERIFY_TOKEN: z.string().optional(),
  NEXT_PUBLIC_MAPBOX_TOKEN: z.string().optional(),
  SPOTIFY_CLIENT_ID: z.string().optional(),
  SPOTIFY_CLIENT_SECRET: z.string().optional(),
  SPOTIFY_REFRESH_TOKEN: z.string().optional(),
  STRAVA_CLIENT_ID: z.string().optional(),
  STRAVA_CLIENT_SECRET: z.string().optional(),
  STRAVA_REFRESH_TOKEN: z.string().optional(),

  // Quando definido como "1" (ex.: CI), pula a validação de obrigatórias.
  SKIP_ENV_VALIDATION: z.string().optional(),
});

type Env = z.infer<typeof envSchema>;

function validateEnv(input: unknown): Env {
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

  return result.data;
}

export const env = validateEnv(process.env);
