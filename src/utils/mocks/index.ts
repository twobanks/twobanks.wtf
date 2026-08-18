
export const menuItems = [
  {
    name: 'Sobre',
    href: '/sobre',
  },
  {
    name: 'Blog',
    href: '/blog',
  },
  {
    name: 'Livros',
    href: '/livros',
  },
  {
    name: 'Atividade',
    subItems: [
      {
        title: 'Treinos Propostos',
        href: '/treinos',
      },
      {
        title: 'Treinos Executados',
        href: '/atividades',
      },
    ]
  },
  {
    name: 'Admin',
    hasLogout: true, 
    subItems: [
      {
        title: 'Blog',
        href: '/admin/blog',
      },
      {
        title: 'Livros',
        href: '/admin/livros',
      },
      {
        title: 'Carteira',
        href: '/admin/carteira',
      },
      {
        title: 'Lista de Compras',
        href: '/admin/listas',
      },
    ]
  }
]

export const SORT_OPTIONS = [
  { value: "date_desc", label: "Mais recentes" },
  { value: "date_asc", label: "Mais antigos" },
  { value: "distance_desc", label: "Maior distância" },
  { value: "distance_asc", label: "Menor distância" },
  { value: "duration_desc", label: "Maior duração" },
  { value: "duration_asc", label: "Menor duração" },
  { value: "hr_desc", label: "Maior FC média" },
  { value: "hr_asc", label: "Menor FC média" },
  { value: "elevation_desc", label: "Maior ganho de elevação" },
  { value: "elevation_asc", label: "Menor ganho de elevação" },
] as const

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100, 200] as const
export const DEFAULT_PAGE_SIZE = 10

