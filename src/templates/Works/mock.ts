import { STACKS } from "../../utils/enums/stack"

const harpoon = '/img/works/harpoon.webp'
const harpoonApp = '/img/works/harpoon-app.webp'
const bowe = '/img/works/bowe.webp'
const eqi = '/img/works/eqi.webp'


export const works = [
  {
    name: 'Harpoon',
    link: 'https://app.harpoon.digital/',
    language: [STACKS.TYPESCRIPT, STACKS.NEXT, STACKS.STYLED],
    image: harpoonApp,
  },
  {
    name: 'Landing Page Harpoon',
    link: 'https://harpoon.digital/',
    language: [STACKS.TYPESCRIPT, STACKS.NEXT, STACKS.STYLED],
    image: harpoon,
  },
  {
    name: 'Landing Page Bowe',
    link: 'https://bowe.com.br/',
    language: [STACKS.JAVASCRIPT, STACKS.GATSBY, STACKS.STYLED],
    image: bowe,
  },
  {
    name: 'Landing Page EQI Investimentos',
    link: 'https://eqi.com.br/',
    language: [STACKS.JAVASCRIPT, STACKS.GATSBY, STACKS.STYLED],
    image: eqi,
  }
]
