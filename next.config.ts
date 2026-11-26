import type { NextConfig } from "next";
import { validateEnv } from "./src/env";

// Valida variáveis de ambiente obrigatórias antes de continuar o build.
// Falha com mensagem clara quando DATABASE_URL / RESEND_API_KEY (ou
// AUTH_SECRET em Produção) estiverem ausentes, exceto com
// SKIP_ENV_VALIDATION=1 (ex.: CI).
validateEnv(process.env);

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
};

export default nextConfig;