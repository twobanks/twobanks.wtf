const twobanks = '/img/twobanks.webp';

type Career = {
  occupation: string;
  stacks?: string;
  company: string;
  link: string;
  city: string;
  uf: string;
  startDate: string;
  current: boolean;
  departureDate?: string;
  durationInMonths?: string;
}

type Social = {
  name: string;
  link?: string;
  nickname: string;
  type?: string;
}

type About = {
  bio?: string;
  image: string;
  career: Career[];
  social: Social[];
  academy: {
    institution: string;
    college: string;
    period: string;
  }[];
}

export const about: About = {
  image: twobanks,
  career: [
    {
      occupation: 'Desenvolvedor Front-End',
      stacks: 'TypeScript , Javascript (ES6), HTML/CSS, ReactJS',
      company: 'Bornlogic',
      link: 'https://www.bornlogic.com/',
      city: 'São Paulo',
      uf: 'SP',
      startDate: 'jul de 2022',
      current: true,
    },
    {
      occupation: 'Desenvolvedor Front-End',
      stacks: 'TypeScript , Javascript (ES6), HTML/CSS, ReactJS, Hooks, NextJS, Jest, React Testing Libary, Styled Components, Material UI, Git, Git Flow, Yarn, Clean Code',
      company: 'Harpoon',
      link: 'https://harpoon.digital/',
      city: 'Uberlândia',
      uf: 'MG',
      startDate: 'fev de 2021',
      current: false,
      departureDate: 'jun de 2022',
      durationInMonths: '1 ano 4 meses',
    },
    {
      occupation: 'Desenvolvedor Front-End',
      stacks: 'TypeScript , Javascript (ES6), HTML/CSS, ReactJS, Hooks, NextJS, GatsbyJS, Jest, React Testing Libary, Styled Components, Material UI, Git, Git Flow, Yarn, Clean Code',
      company: 'Bowe',
      link: 'https://bowe.com.br/',
      city: 'Uberlândia',
      uf: 'MG',
      startDate: 'nov de 2020',
      current: false,
      departureDate: 'fev de 2021',
      durationInMonths: '3 meses',
    },
    {
      occupation: 'Desenvolvedor Web',
      stacks: 'PHP, HTML5, Javascript/jQuery, CSS3, Boostrap, Flexbox, Grid Layout, Git, Git Flow',
      company: 'WebCorpore',
      link: 'https://webcorpore.com/',
      city: 'Uberlândia',
      uf: 'MG',
      startDate: 'jun de 2014',
      current: false,
      departureDate: 'out de 2020',
      durationInMonths: '6 anos 5 meses',
    },
  ],
  academy: [
    {
      institution: 'Instituto Federal do Triângulo Mineiro',
      college: 'Análise e Desenvolvimento de Sistemas, Tecnologia da Informação',
      period: '2012 - 2015',
    },
  ],
  social: [
    {
      name: 'github',
      link: 'https://github.com/twobanks',
      nickname: 'twobanks',
      type: 'work',
    },
    {
      name: 'linkedin',
      link: 'https://www.linkedin.com/in/twobanks/',
      nickname: 'twobanks',
      type: 'work',
    },
    {
      name: 'instagram',
      link: 'https://www.instagram.com/twobanks/',
      nickname: 'twobanks',
      type: 'social',
    },
    {
      name: 'twitter',
      link: 'https://twitter.com/twobanks_',
      nickname: 'twobanks_',
      type: 'social',
    },
    {
      name: 'facebook',
      link: 'https://www.facebook.com/twobanks/',
      nickname: 'twobanks',
      type: 'social',
    },
    {
      name: 'strava',
      link: 'https://www.strava.com/athletes/twobanks',
      nickname: 'twobanks',
      type: 'health',
    },
    {
      name: 'last.fm',
      link: 'https://www.last.fm/pt/user/banksthiago',
      nickname: 'banksthiago',
      type: 'music',
    },
    {
      name: 'spotify',
      link: 'https://open.spotify.com/user/twobanks',
      nickname: 'twobanks',
      type: 'music',
    },
    {
      name: 'psn',
      nickname: 'twobanks_',
      type: 'game',
    },
    {
      name: 'steam',
      link: 'https://steamcommunity.com/id/twobanks',
      nickname: 'twobanks',
      type: 'game',
    },
  ],
}
