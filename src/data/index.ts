import { About, Social, Works, Menu } from "../types/banks";
import { STACKS } from "../utils/enums/stack";
import images from '../images';

const twobanks = '/img/twobanks.webp';
const avatar = '/img/avatar.webp';

export const header = {
  avatar: avatar,
  menu: [
    {
      name: 'home',
      url: '',
      icon: images.home,
      iconAnimated: images.homeAnimated,
    },
    {
      name: 'sobre',
      url: 'about',
      icon: images.avatar,
      iconAnimated: images.avatarAnimated,
    },
    {
      name: 'vivência',
      url: 'activities',
      icon: images.activities,
      iconAnimated: images.activitiesAnimated,
    },
    {
      name: 'trampos',
      url: 'works',
      icon: images.code,
      iconAnimated: images.codeAnimated,
    },
    {
      name: 'ideia',
      url: 'idea',
      icon: images.article,
      iconAnimated: images.articleAnimated,
    },
  ]
}

export const data: About = {
  about: {
    description: 'Eaêêê! Meu nome é **Thiago**, moro em Uberaba/MG e trabalho como Desenvolvedor Front-End, desde 2014. Atualmente, atuo como Desenvolvedor Front-End, na [Bornlogic](https://www.bornlogic.com/), onde, diariamente, desenvolvo utilizando as seguintes tecnologias: TypeScript, ReactJS, Styled Components ... No meu tempo livre, aproveito momentos com a minha esposa Tefa ❤ e meu cachorro Brown 🐶, pratico Trail Running e Mountain Bike, ouço bastante música (principalmente RAP), viajo 🛸, procuro aprender sobre povos antigos e expandir meus conhecimentos sobre ReactJS e CSS, entre outras coisas que dispertem minha curiosidade e prazer em aprender, torço para o time do Cruzeiro, assisto NBA e jogo GTA.',
    image: twobanks,
  },
  experiences: [
    {
      current: true,
      role: 'Desenvolvedor Front-End',
      name_company: 'Bornlogic',
      url_company: 'https://www.bornlogic.com/',
      city_company: 'São Paulo, SP',
      period: 'jul de 2022 - até o momento',
      tech: ['TypeScript','JavaScript(ES6)', 'HTML5/CSS3', 'ReactJS', 'styled-components'],
    },
    {
      current: false,
      role: 'Desenvolvedor Front-End',
      name_company: 'Harpoon',
      url_company: 'https://harpoon.digital/',
      city_company: 'Uberlândia, MG',
      period: 'fev de 2021 - jun de 2022 - 1 ano 4 meses',
      tech: ['TypeScript','JavaScript(ES6)', 'HTML5/CSS3', 'ReactJS', 'NextJS', 'Jest', 'React Testing Library', 'styled-components'],
    },
    {
      current: false,
      role: 'Desenvolvedor Front-End',
      name_company: 'Bowe',
      url_company: 'https://bowe.com.br/',
      city_company: 'Uberlândia, MG',
      period: 'nov de 2020 - fev de 2021 - 3 meses',
      tech: ['TypeScript','JavaScript(ES6)', 'HTML5/CSS3', 'ReactJS', 'NextJS', 'GatsbyJS', 'Jest', 'React Testing Library', 'styled-components'],
    },
    {
      current: false,
      role: 'Desenvolvedor Web',
      name_company: 'WebCorpore',
      url_company: 'https://webcorpore.com/',
      city_company: 'Uberlândia, MG',
      period: 'jun de 2014 - out de 2020 - 6 anos 5 meses',
      tech: ['PHP', 'HTML5/CSS3', 'JavaScript(ES6)'],
    },
  ],
  academic: {
    local: 'Instituto Federal do Triângulo Mineiro',
    course: 'Análise e Desenvolvimento de Sistemas, Tecnologia da Informação',
    period: '2012 - 2015',
  }
}

export const works: Works[] = [
  {
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
    name: 'EQI Investimentos',
    type: 'Landing Page',
    link: 'https://eqi.com.br/',
    tech: [STACKS.JAVASCRIPT, STACKS.GATSBY, STACKS.STYLED],
    company: {
      link: 'https://bowe.com.br/',
      name: 'bowe',
    }
  }
];

export const social: Social[] = [
  {
    name: 'github',
    link: 'https://github.com/twobanks',
    nickname: 'twobanks',
    icon: images.github,
  },
  {
    name: 'linkedin',
    link: 'https://www.linkedin.com/in/twobanks/',
    nickname: 'twobanks',
    icon: images.linkedin
  },
  {
    name: 'instagram',
    link: 'https://www.instagram.com/twobanks/',
    nickname: 'twobanks',
    icon: images.instagram
  },
  {
    name: 'twitter',
    link: 'https://twitter.com/twobanks_',
    nickname: 'twobanks_',
    icon: images.twitter
  },
  {
    name: 'facebook',
    link: 'https://www.facebook.com/twobanks/',
    nickname: 'twobanks',
    icon: images.facebook
  },
  {
    name: 'strava',
    link: 'https://www.strava.com/athletes/twobanks',
    nickname: 'twobanks',
    icon: images.strava
  },
  {
    name: 'last.fm',
    link: 'https://www.last.fm/pt/user/banksthiago',
    nickname: 'banksthiago',
  },
  {
    name: 'spotify',
    link: 'https://open.spotify.com/user/twobanks',
    nickname: 'twobanks',
    icon: images.spotify
  },
  {
    name: 'psn',
    nickname: 'twobanks_',
  },
  {
    name: 'steam',
    link: 'https://steamcommunity.com/id/twobanks',
    nickname: 'twobanks',
  },
];
