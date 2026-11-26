import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Em ambientes não-produção (Preview da branch `banks`, DEV, etc.)
  // bloqueamos a indexação para proteger o conteúdo de pré-visualização.
  // Apenas em Produção liberamos a indexação completa.
  const isProduction =
    process.env.NODE_ENV === "production" ||
    process.env.VERCEL_ENV === "production";

  if (isProduction) {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}