# Padrões de Composição UI (`patterns/`)

Esta pasta contém padrões reutilizáveis **sem nenhuma lógica de negócio**, focados em layout, apresentação e composição de componentes primitivos.

Todos os componentes consomem **exclusivamente tokens semânticos** definidos em `src/app/globals.css` (via Issue #318).

## Componentes

### `PageHeader`

Cabeçalho de página padronizado com suporte a breadcrumb, titulo, descrição e action slot.

**Props:**
- `title` (string) — título principal
- `description?` (string) — subtítulo descritivo
- `action?` (ReactNode) — slot para button, dropdown, ou outras ações
- `breadcrumb?` (ReactNode) — breadcrumb navigation
- `className?` (string) — classes adicionais

**Uso:**
```tsx
import { PageHeader } from "@/components/patterns";
import { Button } from "@/components/ui/button";

<PageHeader
  title="Transações"
  description="Gerencie suas transações financeiras"
  breadcrumb={<BreadcrumbNav />}
  action={<Button>Adicionar</Button>}
/>
```

**Tokens aplicados:**
- `border-b border-border` — separador inferior
- `bg-background` — fundo
- `text-foreground` — título
- `text-subtle-foreground` — descrição e breadcrumb

---

### `StatCard`

Card de estatística com suporte a ícone, valor, label e indicador de tendência.

**Props:**
- `label` (string) — rótulo da estatística (ex: "Receitas")
- `value` (string | number) — valor principal
- `icon?` (LucideIcon) — ícone (ex: `TrendingUpIcon`)
- `trend?` — objeto com `value` (número), `direction` ("up"|"down"|"neutral"), `inverted?` (boolean para inverter cores)
- `surface?` (1|2|3) — nível de profundidade (default: `bg-card`)
- `className?` (string) — classes adicionais

**Uso:**
```tsx
import { StatCard } from "@/components/patterns";
import { TrendingUp } from "lucide-react";

<StatCard
  label="Receitas do Mês"
  value="R$ 12.500,00"
  icon={TrendingUp}
  trend={{
    value: 15.3,
    direction: "up",
  }}
  surface={1}
/>
```

**Tokens aplicados:**
- `bg-surface-1/2/3` — background baseado em profundidade
- `text-foreground` — valor
- `text-muted-foreground` — label
- `text-success` — tendência "up"
- `text-destructive` — tendência "down"

---

### `EmptyState`

Composição para estados vazios com ícone, título, descrição e action slot.

**Props:**
- `title` (string) — título do empty state
- `description?` (string) — descrição adicional
- `icon?` (LucideIcon) — ícone (ex: `InboxIcon`)
- `action?` (ReactNode) — botão ou link para ação primária
- `className?` (string) — classes adicionais

**Uso:**
```tsx
import { EmptyState } from "@/components/patterns";
import { Plus, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

<EmptyState
  icon={Inbox}
  title="Nenhuma transação"
  description="Comece adicionando sua primeira transação."
  action={<Button>Adicionar Transação</Button>}
/>
```

**Tokens aplicados:**
- `bg-surface-1` — background
- `text-foreground` — título
- `text-subtle-foreground` — descrição
- `border-border-subtle` — borda sutil

---

## Integração com Tokens Semânticos

Todos os padrões usam **tokens semânticos** em vez de classes Tailwind raw:

| Necessidade | Token Semântico | Alternativa Raw |
|---|---|---|
| Fundo claro elevado | `bg-surface-1` | `bg-zinc-100` (errado) |
| Fundo médio | `bg-surface-2` | `bg-zinc-200` (errado) |
| Fundo escuro | `bg-surface-3` | `bg-zinc-300` (errado) |
| Texto principal | `text-foreground` | `text-black/white` (errado) |
| Texto secundário | `text-subtle-foreground` | `text-gray-500` (errado) |
| Borda padrão | `border-border` | `border-zinc-300` (errado) |
| Borda sutil | `border-border-subtle` | `border-zinc-200` (errado) |
| Sucesso | `bg-success-subtle` / `text-success` | `bg-green-100` / `text-green-600` (errado) |
| Aviso | `bg-warning-subtle` / `text-warning` | `bg-yellow-100` / `text-yellow-600` (errado) |
| Info | `bg-info-subtle` / `text-info` | `bg-blue-100` / `text-blue-600` (errado) |

---

## Refatoração de Componentes Existentes

### SummaryCards → StatCard

**Antes (específico de admin/wallet com cores raw):**
```tsx
<Card>
  <CardTitle className="text-emerald-600 dark:text-emerald-400">
    R$ 12.500,00
  </CardTitle>
</Card>
```

**Depois (usando padrão reutilizável):**
```tsx
<StatCard
  label="Receitas"
  value="R$ 12.500,00"
  trend={{ value: 15.3, direction: "up" }}
/>
```

A implementação atual de `SummaryCards.tsx` pode ser refatorada para usar `StatCard` internamente, mantendo sua interface pública intacta.

---

## Escopo Futuro (Issue seguinte)

A refatoração de componentes que ainda usam `zinc-*`/`gray-*` raw será tratada em uma issue dedicada:
- `Drawers/*` — `gray-900/800` → `bg-surface-3` / `bg-surface-2`
- `Tables/*` — `emerald-500/10` → `bg-success-subtle` / `text-success`
- `Charts/MonthlyCashFlowChart.tsx` — `gray-*` → tokens semânticos
- `AtividadesView.tsx` — `zinc-*` → tokens semânticos
- `ActivityChart.tsx` — `zinc-900` → `bg-surface-3`

---

## Checklist de Uso

✅ Sempre preferir padrões em `patterns/` sobre composições inline
✅ Nunca adicionar lógica de domínio (admin/wallet) aos patterns
✅ Sempre usar tokens semânticos, nunca `zinc-*`, `gray-*`, `emerald-*` raw
✅ Manter `PageHeader`, `StatCard`, `EmptyState` agnósticos e reutilizáveis
✅ Documentar novos padrões aqui com exemplos de uso
