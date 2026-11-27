import { auth } from "@/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Palette, Layers, Shield, Layout, Type, Square, Circle } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Design Tokens",
  description: "Inspeção dos tokens de design da v1 (cores, tipografia, espaçamento, superfícies e bordas)",
};

const BRAND_COLORS = [
  { name: "brand-blue", css: "--color-brand-blue", value: "#5EACCF", usage: "Marca primária, foco de inputs, ring" },
  { name: "brand-pink", css: "--color-brand-pink", value: "#F35894", usage: "Marca secundária, destaques" },
  { name: "brand-yellow", css: "--color-brand-yellow", value: "#FBE122", usage: "Marca de acento, alertas visuais" },
  { name: "brand-skin", css: "--color-brand-skin", value: "#C88D5D", usage: "Marca de pele, tons terrosos" },
] as const;

const SEMANTIC_COLORS = [
  { name: "success", css: "--color-success", value: "#059669", usage: "Estado de sucesso" },
  { name: "success-foreground", css: "--color-success-foreground", value: "#ffffff", usage: "Texto sobre sucesso" },
  { name: "success-subtle", css: "--color-success-subtle", value: "#d1fae5", usage: "Fundo sutil de sucesso" },
  { name: "warning", css: "--color-warning", value: "#d97706", usage: "Estado de aviso" },
  { name: "warning-foreground", css: "--color-warning-foreground", value: "#ffffff", usage: "Texto sobre aviso" },
  { name: "warning-subtle", css: "--color-warning-subtle", value: "#fef9c3", usage: "Fundo sutil de aviso" },
  { name: "info", css: "--color-info", value: "#2563eb", usage: "Estado de informação" },
  { name: "info-foreground", css: "--color-info-foreground", value: "#ffffff", usage: "Texto sobre informação" },
  { name: "info-subtle", css: "--color-info-subtle", value: "#dbeafe", usage: "Fundo sutil de informação" },
] as const;

const SURFACE_COLORS = [
  { name: "surface-1", css: "--color-surface-1", value: "#f9f9fa", usage: "1 nível acima do background" },
  { name: "surface-2", css: "--color-surface-2", value: "#f4f4f5", usage: "Fundo médio (muted)" },
  { name: "surface-3", css: "--color-surface-3", value: "#e4e4e7", usage: "Superfície mais elevada" },
] as const;

const BORDER_COLORS = [
  { name: "border", css: "--color-border", value: "#e4e4e7", usage: "Borda padrão" },
  { name: "border-subtle", css: "--color-border-subtle", value: "#f0f0f1", usage: "Separadores muito sutis" },
  { name: "border-strong", css: "--color-border-strong", value: "#d4d4d8", usage: "Borda com ênfase" },
] as const;

const TEXT_COLORS = [
  { name: "foreground", css: "--color-foreground", value: "#09090b", usage: "Texto principal" },
  { name: "muted-foreground", css: "--color-muted-foreground", value: "#71717a", usage: "Texto secundário" },
  { name: "subtle-foreground", css: "--color-subtle-foreground", value: "#a1a1aa", usage: "Texto terciário / rótulos" },
] as const;

const RADIUS_TOKENS = [
  { name: "radius-sm", css: "--radius-sm", value: "calc(var(--radius) * 0.6)", usage: "Chips, badges pequenos" },
  { name: "radius-md", css: "--radius-md", value: "calc(var(--radius) * 0.8)", usage: "Itens de lista, table rows" },
  { name: "radius-lg", css: "--radius-lg", value: "var(--radius)", usage: "Botões, inputs, selects" },
  { name: "radius-xl", css: "--radius-xl", value: "calc(var(--radius) * 1.4)", usage: "Cards compactos, thumbnails" },
  { name: "radius-2xl", css: "--radius-2xl", value: "calc(var(--radius) * 1.8)", usage: "Cards principais, drawers" },
  { name: "radius-3xl", css: "--radius-3xl", value: "calc(var(--radius) * 2.2)", usage: "Modais, containers grandes" },
  { name: "radius-4xl", css: "--radius-4xl", value: "calc(var(--radius) * 2.6)", usage: "Containers extra grandes" },
] as const;

const FONT_FAMILIES = [
  { name: "sans (Geist)", css: "--font-sans", value: "var(--font-geist-sans)", sample: "AaBbCc — Fonte sem serifas (corpo)" },
  { name: "mono (Geist)", css: "--font-mono", value: "var(--font-geist-mono)", sample: "AaBbCc — Fonte monoespaçada (código)" },
  { name: "heading (Geist Sans)", css: "--font-heading", value: "var(--font-geist-sans)", sample: "AaBbCc — Títulos e cabeçalhos" },
] as const;

const TYPE_SCALE = [
  { name: "text-xs", size: "0.75rem", leading: "1", usage: "Legendas, rótulos pequenos" },
  { name: "text-sm", size: "0.875rem", leading: "1.25", usage: "Texto de corpo secundário" },
  { name: "text-base", size: "1rem", leading: "1.5", usage: "Texto de corpo padrão" },
  { name: "text-lg", size: "1.125rem", leading: "1.75", usage: "Subtítulos, lead" },
  { name: "text-xl", size: "1.25rem", leading: "1.75", usage: "Títulos de seção" },
  { name: "text-2xl", size: "1.5rem", leading: "2", usage: "Títulos de página" },
  { name: "text-3xl", size: "1.875rem", leading: "2.25", usage: "Títulos de destaque (hero)" },
] as const;

const FONT_WEIGHTS = [
  { name: "regular", weight: "400", usage: "Peso padrão do corpo" },
  { name: "medium", weight: "500", usage: "Ênfase leve, rótulos" },
  { name: "semibold", weight: "600", usage: "Títulos de card, subtítulos" },
  { name: "bold", weight: "700", usage: "Títulos de página, headings" },
] as const;

type Token = { name: string; css: string; value: string; usage: string };

function TokenRow({ token }: { token: Token }) {
  const isColor = token.css.startsWith("--color-");
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-border-subtle last:border-0 text-sm">
      <div className="w-20 shrink-0 font-mono text-xs text-subtle-foreground break-all">
        {token.name}
      </div>
      <div className="flex-1 flex items-center gap-3">
        {isColor ? (
          <div className="flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-lg border border-border shadow-sm"
              style={{ backgroundColor: `var(${token.css})` }}
            />
            <span className="font-mono text-xs text-foreground">{token.value}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-lg border border-border shadow-sm"
              style={{ borderRadius: `var(${token.css})` }}
            />
            <span className="font-mono text-xs text-foreground">{token.value}</span>
          </div>
        )}
        <span className="text-xs text-muted-foreground">{token.usage}</span>
      </div>
      <div className="w-20 shrink-0 font-mono text-xs text-subtle-foreground">
        {token.css}
      </div>
    </div>
  );
}

function TokenSection({
  title,
  icon,
  description,
  tokens,
}: {
  title: string;
  icon: React.ElementType;
  description: string;
  tokens: readonly Token[];
}) {
  const Icon = icon;
  return (
    <Card surface={1} className="border border-border">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <CardTitle className="flex items-center gap-1">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-0">
        {tokens.map((token) => (
          <TokenRow key={token.name} token={token} />
        ))}
      </CardContent>
    </Card>
  );
}

export default async function TokensPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-border pb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Design Tokens v1</h1>
          <p className="text-sm text-muted-foreground">
            Inspeção dos tokens de design antes da publicação em produção. Os previews usam o valor real das
            variáveis CSS (`var(--...)`), atualizando automaticamente entre light e dark mode.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground">
            Ambiente: admin / interno
          </span>
        </div>
      </div>

      <Separator />

      <TokenSection
        title="Cores da Marca"
        icon={Palette}
        description="Cores extraídas da identidade visual da logo. Geram classes utilitárias `bg-brand-*`, `text-brand-*`, `border-brand-*`."
        tokens={BRAND_COLORS}
      />

      <TokenSection
        title="Superfícies Semânticas"
        icon={Layers}
        description="Três níveis de profundidade acima do background. Usados no componente `Card` via prop `surface={1|2|3}`."
        tokens={SURFACE_COLORS}
      />

      <TokenSection
        title="Estados Semânticos"
        icon={Shield}
        description="Cores de sucesso, aviso e informação, incluindo variantes de texto e fundo sutil."
        tokens={SEMANTIC_COLORS}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <TokenSection
          title="Bordas Complementares"
          icon={Layout}
          description="Borda padrão, sutil e com ênfase para separadores e containers."
          tokens={BORDER_COLORS}
        />
        <TokenSection
          title="Hierarquia de Texto"
          icon={Type}
          description="Níveis de cor de texto: principal, secundário e terciário."
          tokens={TEXT_COLORS}
        />
      </div>

      <TokenSection
        title="Raio de Borda (Escala)"
        icon={Square}
        description="Convenção de uso: sm → chips/badges; lg → botões/inputs; 2xl → cards/drawers; 3xl → modais."
        tokens={RADIUS_TOKENS}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <TokenSection
          title="Famílias de Fonte"
          icon={Type}
          description="Famílias carregadas em `src/app/layout.tsx` via `next/font/google` (Geist Sans / Geist Mono)."
          tokens={FONT_FAMILIES as unknown as readonly Token[]}
        />
        <TokenSection
          title="Pesos de Fonte"
          icon={Circle}
          description="Escala de `font-weight` utilizada nos componentes de UI e tipografia."
          tokens={FONT_WEIGHTS as unknown as readonly Token[]}
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-subtle-foreground uppercase tracking-wider">
          Escala de Tamanhos e Linhas
        </h2>
        <div className="grid gap-2 md:grid-cols-3">
          {TYPE_SCALE.map((t) => (
            <div
              key={t.name}
              className="p-3 rounded-lg border border-border bg-surface-1 flex flex-col gap-1"
            >
              <span className="font-mono text-xs text-subtle-foreground">{t.name}</span>
              <span className="text-sm font-medium" style={{ fontSize: t.size, lineHeight: t.leading }}>
                The quick brown fox
              </span>
              <span className="text-xs text-muted-foreground">{t.usage}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-subtle-foreground uppercase tracking-wider">
          Pesos de Fonte (Renderizado)
        </h2>
        <div className="grid gap-2 md:grid-cols-4">
          {FONT_WEIGHTS.map((w) => (
            <div
              key={w.name}
              className="p-3 rounded-lg border border-border bg-surface-1 flex flex-col gap-1 items-start"
            >
              <span className="font-mono text-xs text-subtle-foreground">{w.name}</span>
              <span className="text-sm" style={{ fontWeight: Number(w.weight) }}>
                Peso {w.weight}
              </span>
              <span className="text-xs text-muted-foreground">{w.usage}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 pt-4 border-t border-border-subtle text-xs text-muted-foreground">
        <span>Tokens definidos em `src/app/globals.css` (`@theme inline` + `:root` / `.dark`).</span>
        <span>·</span>
        <span>Fontes configuradas em `src/app/layout.tsx` (`Geist`, `Geist_Mono`).</span>
        <span>·</span>
        <Link href={ROUTES.ADMIN.ROOT} className="hover:underline">
          Voltar ao painel
        </Link>
      </div>
    </div>
  );
}

