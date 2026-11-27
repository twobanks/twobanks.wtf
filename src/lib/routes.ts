// Mapa centralizado de rotas da aplicação.
// Todas as rotas devem ser referenciadas por este mapa para evitar links 404
// e chamadas revalidatePath com caminhos incorretos.

export const ROUTES = {
  ROOT: "/",
  LOGIN: "/login",

  PUBLIC: {
    ROOT: "/",
    SOBRE: "/sobre",
    ATIVIDADES: "/atividades",
    FOTOS: "/fotos",
    VIAGENS: "/viagens",
    VIAGEM: (slug: string) => `/viagens/${slug}`,
    VIAGEM_DIA: (slug: string, dia: string) => `/viagens/${slug}/${dia}`,
  },

  ADMIN: {
    ROOT: "/admin",
    CARTEIRA: "/admin/carteira",
    CARTEIRA_CARTOES: "/admin/carteira/cartoes",
    CARTEIRA_CARTAO: (id: string | number) => `/admin/carteira/cartoes/${id}`,
    CARTEIRA_CATEGORIAS: "/admin/carteira/categorias",
    CARTEIRA_CONTAS: "/admin/carteira/contas",
    CARTEIRA_FATURAS: "/admin/carteira/faturas",
    CARTEIRA_INVESTIMENTOS: "/admin/carteira/investimentos",
    CARTEIRA_LISTAS: "/admin/carteira/listas",
    CARTEIRA_RECORRENTES: "/admin/carteira/recorrentes",
    BLOG: "/admin/blog",
    BLOG_POST: (id: string | number) => `/admin/blog/${id}`,
    BLOG_NOVO: "/admin/blog/novo",
    LIVROS: "/admin/livros",
    LIVRO: (id: string | number) => `/admin/livros/${id}`,
    LIVROS_NOVO: "/admin/livros/novo",
    TAREFAS: "/admin/tarefas",
    CONTRATOS: "/admin/contratos",
    TOKENS: "/admin/tokens",
  },
} as const;

export type RouteMap = typeof ROUTES;