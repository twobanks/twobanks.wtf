import { v4 as uuid} from 'uuid';
import { STACKS } from "../../utils/enums/stack"

export type WorkItems = {
  id: string;
  name: string;
  type: string;
  link: string;
  language: STACKS[];
  company: {
    link: string;
    name: string;
  }
}

export const works: WorkItems[] = [
  {
    id: uuid(),
    name: 'Gerentes Digitais',
    type: 'Plataforma',
    link: 'https://bornlogic.gerentesdigitais.com/',
    language: [STACKS.TYPESCRIPT, STACKS.REACT, STACKS.STYLED],
    company: {
      link: 'https://www.bornlogic.com/',
      name: 'bornlogic',
    }
  },
  {
    id: uuid(),
    name: 'Harpoon',
    type: 'Plataform',
    link: 'https://app.harpoon.digital/',
    language: [STACKS.TYPESCRIPT, STACKS.NEXT, STACKS.STYLED],
    company: {
      link: 'https://bowe.com.br/',
      name: 'bowe',
    }
  },
  {
    id: uuid(),
    name: 'Harpoon',
    type: 'Landing Page',
    link: 'https://harpoon.digital/',
    language: [STACKS.TYPESCRIPT, STACKS.NEXT, STACKS.STYLED],
    company: {
      link: 'https://bowe.com.br/',
      name: 'bowe',
    }
  },
  {
    id: uuid(),
    name: 'Bowe',
    type: 'Landing page',
    link: 'https://bowe.com.br/',
    language: [STACKS.JAVASCRIPT, STACKS.GATSBY, STACKS.STYLED],
    company: {
      link: 'https://bowe.com.br/',
      name: 'bowe',
    }
  },
  {
    id: uuid(),
    name: 'EQI Investimentos',
    type: 'Landing Page',
    link: 'https://eqi.com.br/',
    language: [STACKS.JAVASCRIPT, STACKS.GATSBY, STACKS.STYLED],
    company: {
      link: 'https://bowe.com.br/',
      name: 'bowe',
    }
  }
]
