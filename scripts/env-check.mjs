import { existsSync } from "node:fs";

// Verificação não-destrutiva da presença do .env.local.
// Nunca sobrescreve, nunca apaga e nunca expõe valores de variáveis de ambiente.
//
// Saída:
//   - SKIP_ENV_VALIDATION=1 (ex.: CI): sai silenciosamente com 0.
//   - .env.local ausente: aviso claro apontando para `cp .env.example .env.local`, sai com 0 (não quebra dev/build).
//   - .env.local presente: sai silenciosamente com 0.

if (process.env.SKIP_ENV_VALIDATION === "1") {
  process.exit(0);
}

if (!existsSync(".env.local")) {
  console.error(
    "⚠️  .env.local não encontrado.\n" +
      "   Crie uma cópia do exemplo e preencha com valores reais:\n" +
      "     cp .env.example .env.local\n" +
      "   Nunca commite valores sensíveis. Veja o README.md (seção 'Variáveis de ambiente').",
  );
  process.exit(0);
}

process.exit(0);
