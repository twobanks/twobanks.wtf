import { STACKS } from "../enums";
import { Works } from "../types/banks";

export const works: Works[] = [
  {
    name: 'Fisio Empreendedor',
    type: 'Landing Page',
    link: 'https://www.fisioempreendedor.com.br/',
    tech: [STACKS.NEXT, STACKS.NEXT_UI, STACKS.TYPESCRIPT, STACKS.TAILWIND],
    company: {
      link: 'https://www.fisioempreendedor.com.br/',
      name: 'Carol Lima',
    }
  },
  {
    name: 'reborn',
    type: 'Plataforma',
    link: 'https://www.bornlogic.com/',
    tech: [STACKS.REACT, STACKS.TYPESCRIPT, STACKS.REACT_TESTING, STACKS.JEST, STACKS.STYLED],
    company: {
      link: 'https://www.bornlogic.com/',
      name: 'bornlogic',
    }
  },
  {
    name: 'Gerentes Digitais',
    type: 'Plataforma',
    link: 'https://bornlogic.gerentesdigitais.com/',
    tech: [STACKS.REACT, STACKS.JAVASCRIPT, STACKS.STYLED],
    company: {
      link: 'https://www.bornlogic.com/',
      name: 'bornlogic',
    }
  },
  {
    name: 'Harpoon',
    type: 'Plataforma',
    link: 'https://app.harpoon.digital/',
    tech: [STACKS.NEXT, STACKS.TYPESCRIPT, STACKS.REACT_TESTING, STACKS.JEST, STACKS.STYLED],
    company: {
      link: 'https://bowe.com.br/',
      name: 'bowe',
    }
  },
  {
    name: 'Harpoon',
    type: 'Landing Page',
    link: 'https://harpoon.digital/',
    tech: [STACKS.NEXT, STACKS.TYPESCRIPT, STACKS.STYLED],
    company: {
      link: 'https://bowe.com.br/',
      name: 'bowe',
    }
  },
  {
    name: 'Bowe',
    type: 'Landing Page',
    link: 'https://bowe.com.br/',
    tech: [STACKS.GATSBY, STACKS.JAVASCRIPT, STACKS.STYLED],
    company: {
      link: 'https://bowe.com.br/',
      name: 'bowe',
    }
  },
  {
    name: 'EQI Investimentos',
    type: 'Landing Page',
    link: 'https://eqi.com.br/',
    tech: [STACKS.GATSBY, STACKS.JAVASCRIPT, STACKS.STYLED],
    company: {
      link: 'https://bowe.com.br/',
      name: 'bowe',
    }
  }
];