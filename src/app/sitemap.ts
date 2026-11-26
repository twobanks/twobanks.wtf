import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://twobanks.wtf";

  const staticRoutes = [
    "",
    "/sobre",
    "/fotos",
    "/atividades",
    "/treinos",
    "/viagens",
    "/login",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return staticRoutes;
}