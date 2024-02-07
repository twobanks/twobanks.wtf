import images from "@/public";
import { About, Works, Social, Challenges } from "@/types/banks";
import { STACKS } from "@/utils/enums/stack";
import { ACTIVITY } from "@/utils/enums/strava";

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
      url: 'sobre',
      icon: images.avatar,
      iconAnimated: images.avatarAnimated,
    },
    {
      name: 'atividades',
      url: 'atividades',
      icon: images.activities,
      iconAnimated: images.activitiesAnimated,
    },
    {
      name: 'ouvindo',
      url: 'ouvindo',
      icon: images.play,
      iconAnimated: images.playAnimated,
    },
    {
      name: 'trampos',
      url: 'trampos',
      icon: images.work,
      iconAnimated: images.workAnimated,
    },
    /* {
      name: 'code snippets',
      url: 'snippets',
      icon: images.code,
      iconAnimated: images.codeAnimated,
    }, */
  ]
}

export const data: About = {
  experiences: [
    {
      current: true,
      role: 'Desenvolvedor Front-End Pleno',
      name_company: 'Fóton',
      url_company: 'https://www.foton.la/',
      city_company: 'Brasilia, DF',
      period: 'fev de 2024 - atualmente',
      tech: [STACKS.REACT, STACKS.TYPESCRIPT, STACKS.JAVASCRIPT, STACKS.HTML, STACKS.STYLED],
      description: [
        'Alocado em projetos internos no Banco do Nordeste',
      ]
    },
    {
      current: false,
      role: 'Desenvolvedor Front-End Pleno',
      name_company: 'Bornlogic',
      url_company: 'https://www.bornlogic.com/',
      city_company: 'São Paulo, SP',
      period: 'jul de 2022 - out de 2023 - 1 ano 4 meses',
      tech: [STACKS.TYPESCRIPT, STACKS.JAVASCRIPT, STACKS.HTML, STACKS.REACT, STACKS.STYLED],
      description: [
        'Responsável por melhorias no produto Gerentes Digitais',
        'Desenvolvimento de um módulo de calendário/agenda.',
        'Desenvolvimento dos módulos de Orçamentos e Retail Media.',
        'Idealização e desenvolvimento de um módulo de Localização, possibilitando o usuário acessar informações de todas as unidades contidas em um determinado estado/cidade.',
      ]
    },
    {
      current: false,
      role: 'Desenvolvedor Front-End',
      name_company: 'Harpoon',
      url_company: 'https://harpoon.digital/',
      city_company: 'Uberlândia, MG',
      period: 'fev de 2021 - jun de 2022 - 1 ano 5 meses',
      tech: [STACKS.TYPESCRIPT, STACKS.JAVASCRIPT, STACKS.HTML, STACKS.REACT, STACKS.NEXT, STACKS.JEST, STACKS.REACT_TESTING, STACKS.STYLED],
      description: [
        'Participação ativa no desenvolvimento do produto, desde sua criação.',
        'Desenvolvimento de um módulo onde continha um Landing Page Builder e Email Builder.',
        'Resposável por desenvolver melhorias de UX e UI.',
      ]
    },
    {
      current: false,
      role: 'Desenvolvedor Front-End',
      name_company: 'Bowe',
      url_company: 'https://bowe.com.br/',
      city_company: 'Uberlândia, MG',
      period: 'nov de 2020 - fev de 2021 - 4 meses',
      tech: [STACKS.JAVASCRIPT, STACKS.HTML, STACKS.REACT, STACKS.NEXT, STACKS.GATSBY, STACKS.JEST, STACKS.REACT_TESTING, STACKS.STYLED],
      description: [
        'Desenvolvimento do site da empresa, utilizando GatsbyJS',
        'Melhorias pontuais no aplicativo mobile da Snackin, utilizando React Native',
        'Desenvolvimento do site da EQI Investimentos, utilizando GatsbyJS',
      ]
    },
    {
      current: false,
      role: 'Desenvolvedor Web',
      name_company: 'WebCorpore',
      url_company: 'https://webcorpore.com/',
      city_company: 'Uberlândia, MG',
      period: 'jun de 2014 - out de 2020 - 6 anos 5 meses',
      tech: [STACKS.PHP, STACKS.HTML, STACKS.JAVASCRIPT],
      description: ['Responsável pelo desenvolvimento de sites institucionais']
    },
  ],
  academic: {
    local: 'Instituto Federal do Triângulo Mineiro',
    course: 'Análise e Desenvolvimento de Sistemas',
    period: '2012 - 2015',
    url: 'https://iftm.edu.br/cursos/patrocinio/tecnologo/analise-e-desenvolvimento-de-sistemas/'
  }
}

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

export const challenges:Challenges[] = [
  {
    name: 'Bocaina ParkTrail',
    date: '04 de maio',
    distance: '45km',
    local: 'Araxá/MG',
    url: 'https://www.instagram.com/bocainapark/',
    type: ACTIVITY.TRAIL,
  },
  {
    name: 'Odisseia Ultra Trail Run',
    date: '01 e 02 de junho',
    distance: '21km - 21km',
    local: 'Urubici/SC',
    url: 'https://www.instagram.com/odisseiaultratrailrun/',
    type: ACTIVITY.TRAIL,
  },
  {
    name: 'La Missión',
    date: '17 de agosto',
    distance: '55km',
    local: 'Passa Quatro/MG',
    url: 'https://www.instagram.com/lamisionbrasil/',
    type: ACTIVITY.TRAIL,
  },
]

export const completedChallenges: Challenges[] = [
  {
    name: 'UTMB',
    local: 'Paraty/RJ',
    distance: '32,2',
    time: '4:00:35',
    elevation: '1.184',
    id: '9906609877',
    type: ACTIVITY.TRAIL,
    year: 2023,
  },
  {
    name: 'Serra do Cruzeiro',
    local: 'Patrocínio/MG',
    distance: '14,4',
    time: '1:53:41',
    elevation: '629',
    id: '9418213451',
    type: ACTIVITY.TRAIL,
    year: 2023,
  },
  {
    name: 'Bocaina Park Trail',
    local: 'Araxá/MG',
    distance: '15,3',
    time: '2:13:55',
    elevation: '873',
    id: '9107333179',
    type: ACTIVITY.TRAIL,
    year: 2023,
  },
  {
    name: 'wos',
    local: 'Amanhece/MG',
    distance: '28,3',
    time: '3:56:15',
    elevation: '950',
    id: '8073119330',
    type: ACTIVITY.TRAIL,
    year: 2022,
  },
  {
    name: 'Bora pro Choque',
    local: 'Uberaba/MG',
    distance: '8,3',
    time: '55:23',
    elevation: '248',
    id: '7932776512',
    type: ACTIVITY.TRAIL,
    year: 2022,
  },
  {
    name: 'Serra do Cruzeiro',
    local: 'Patrocínio/MG',
    distance: '14,4',
    time: '1:45:26',
    elevation: '629',
    id: '7827920260',
    type: ACTIVITY.TRAIL,
    year: 2022,
  },

  {
    name: 'Copa Triângulo MTB',
    local: 'Uberaba/MG',
    distance: '64,3',
    time: '2:42:17',
    elevation: '945',
    id: '7485354782',
    type: ACTIVITY.RIDE,
    year: 2022,
  },
  {
    name: 'Boqueirão Trail Run',
    local: 'Tapira/MG',
    distance: '21,6',
    time: '2:26:51',
    elevation: '711',
    id: '7291146423',
    type: ACTIVITY.TRAIL,
    year: 2022,
  },

  {
    name: 'Treino Premiado XCO',
    local: 'Uberaba/MG',
    distance: '3,8',
    time: '24:48',
    elevation: '307',
    id: '6996273187',
    type: ACTIVITY.TRAIL,
    year: 2022,
  },
  {
    name: '1º Desafio Dan In Hotel de MTB',
    local: 'Uberaba/MG',
    distance: '39,2',
    time: '1:36:04',
    elevation: '401',
    id: '2855454923',
    type: ACTIVITY.RIDE,
    year: 2019,
  },
]