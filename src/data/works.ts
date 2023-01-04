import { v4 as uuid} from 'uuid';
import { STACKS } from "../utils/enums/stack"

export type WorkItems = {
  id: string;
  name: string;
  type: string;
  link: string;
  tech: STACKS[];
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
    tech: [STACKS.TYPESCRIPT, STACKS.JAVASCRIPT, STACKS.REACT, STACKS.STYLED],
    company: {
      link: 'https://www.bornlogic.com/',
      name: 'bornlogic',
    }
  },
  {
    id: uuid(),
    name: 'Harpoon',
    type: 'Plataforma',
    link: 'https://app.harpoon.digital/',
    tech: [STACKS.TYPESCRIPT, STACKS.NEXT, STACKS.REACT_TESTING, STACKS.JEST, STACKS.STYLED],
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
    tech: [STACKS.TYPESCRIPT, STACKS.NEXT, STACKS.REACT_TESTING, STACKS.JEST ,STACKS.STYLED],
    company: {
      link: 'https://bowe.com.br/',
      name: 'bowe',
    }
  },
  {
    id: uuid(),
    name: 'Bowe',
    type: 'Landing Page',
    link: 'https://bowe.com.br/',
    tech: [STACKS.JAVASCRIPT, STACKS.GATSBY, STACKS.STYLED],
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
    tech: [STACKS.JAVASCRIPT, STACKS.GATSBY, STACKS.STYLED],
    company: {
      link: 'https://bowe.com.br/',
      name: 'bowe',
    }
  }
]
