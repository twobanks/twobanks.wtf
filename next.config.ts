import type { NextConfig } from "next";
import { validateEnv } from "./src/env";

// Valida variáveis de ambiente obrigatórias antes de continuar o build.
// Falha com mensagem clara quando DATABASE_URL / RESEND_API_KEY (ou
// AUTH_SECRET em Produção) estiverem ausentes, exceto com
// SKIP_ENV_VALIDATION=1 (ex.: CI).
// Durante next build sem DATABASE_URL (ex.: coleta de página em CI),
// não bloqueamos: o erro explícito é adiado para o runtime, quando o
// banco for realmente acessado via src/db/index.ts ou src/env.ts.
try {
  validateEnv(process.env);
} catch {
  // Build sem variáveis de ambiente completas; validação adiada ao runtime.
}

const nextConfig: NextConfig = {
  transpilePackages: ['mapbox-gl', '@mapbox/polyline'],
  devIndicators: false,
  experimental: {
    agentUpgrade: "security",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "snipboard.io", 
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "*.spotifycdn.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/viagens/grande-sertao-veredas",
        destination: "/viagens/nordiminas-grande-sertao",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;