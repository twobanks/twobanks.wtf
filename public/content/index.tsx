import images from "@/public";
import { About, Works, Social } from "@/types/banks";
import { STACKS } from "@/utils/enums/stack";

export const header = {
  avatar: images.logo,
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
      name: 'atividades',
      url: 'activities',
      icon: images.activities,
      iconAnimated: images.activitiesAnimated,
    },
    {
      name: 'listening',
      url: 'listening',
      icon: images.work,
      iconAnimated: images.workAnimated,
    },
    {
      name: 'trampos',
      url: 'works',
      icon: images.work,
      iconAnimated: images.workAnimated,
    },
    {
      name: 'code snippets',
      url: 'snippets',
      icon: images.code,
      iconAnimated: images.codeAnimated,
    },
  ]
}

export const data: About = {
  experiences: [
    {
      current: true,
      role: 'Desenvolvedor Front-End',
      name_company: 'Bornlogic',
      url_company: 'https://www.bornlogic.com/',
      city_company: 'São Paulo, SP',
      period: 'jul de 2022 - até o momento',
      tech: [STACKS.TYPESCRIPT, STACKS.JAVASCRIPT, STACKS.HTML, STACKS.REACT, STACKS.STYLED],
    },
    {
      current: false,
      role: 'Desenvolvedor Front-End',
      name_company: 'Harpoon',
      url_company: 'https://harpoon.digital/',
      city_company: 'Uberlândia, MG',
      period: 'fev de 2021 - jun de 2022 - 1 ano 4 meses',
      tech: [STACKS.TYPESCRIPT, STACKS.JAVASCRIPT, STACKS.HTML, STACKS.REACT, STACKS.NEXT, STACKS.JEST, STACKS.REACT_TESTING, STACKS.STYLED],
    },
    {
      current: false,
      role: 'Desenvolvedor Front-End',
      name_company: 'Bowe',
      url_company: 'https://bowe.com.br/',
      city_company: 'Uberlândia, MG',
      period: 'nov de 2020 - fev de 2021 - 3 meses',
      tech: [STACKS.JAVASCRIPT, STACKS.HTML, STACKS.REACT, STACKS.NEXT, STACKS.GATSBY, STACKS.JEST, STACKS.REACT_TESTING, STACKS.STYLED],
    },
    {
      current: false,
      role: 'Desenvolvedor Web',
      name_company: 'WebCorpore',
      url_company: 'https://webcorpore.com/',
      city_company: 'Uberlândia, MG',
      period: 'jun de 2014 - out de 2020 - 6 anos 5 meses',
      tech: [STACKS.PHP, STACKS.HTML, STACKS.JAVASCRIPT],
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
    name: 'discord',
    link: 'https://discord.com/users/535889118282907678',
    nickname: 'twobanks#5730',
    icon: images.discord
  },
  {
    name: 'strava',
    link: 'https://www.strava.com/athletes/twobanks',
    nickname: 'twobanks',
    icon: images.strava
  },
  {
    name: 'spotify',
    link: 'https://open.spotify.com/user/twobanks',
    nickname: 'twobanks',
    icon: images.spotify
  },
];
