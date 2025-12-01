import { STACKS } from "../enums";
import { About, Social } from "../types/banks";
import { GithubLogoIcon, LinkedinLogoIcon, InstagramLogoIcon, XLogoIcon, DiscordLogoIcon, SpotifyLogoIcon, PersonSimpleRunIcon } from '@phosphor-icons/react';

export const social: Social[] = [
  {
    name: 'github',
    link: 'https://github.com/twobanks',
    nickname: 'twobanks',
    icon: GithubLogoIcon,
  },
  {
    name: 'linkedin',
    link: 'https://www.linkedin.com/in/twobanks/',
    nickname: 'twobanks',
    icon: LinkedinLogoIcon,
  },
  {
    name: 'instagram',
    link: 'https://www.instagram.com/twobanks/',
    nickname: 'twobanks',
    icon: InstagramLogoIcon,
  },
  {
    name: 'twitter',
    link: 'https://twitter.com/twobanks_',
    nickname: 'twobanks_',
    icon: XLogoIcon,
  },
   {
    name: 'discord',
    link: 'https://discord.com/users/535889118282907678',
    nickname: 'twobanks#5730',
    icon: DiscordLogoIcon,
  },
  {
    name: 'strava',
    link: 'https://www.strava.com/athletes/twobanks',
    nickname: 'twobanks',
    icon: PersonSimpleRunIcon,
  },
  {
    name: 'spotify',
    link: 'https://open.spotify.com/user/twobanks',
    nickname: 'twobanks',
    icon: SpotifyLogoIcon,
  },
];

export const data: About = {
  about: `
Meu nome é <strong title='o pai!'>Thiago</strong>, vulgo: <span>twobanks, rasta, zui</span>. Nasci em <strong>Brasília de Minas</strong> <span>(norte de minas)</span>, porém, cresci e vivo em <strong title='capital do Triângulo Mineiro'>Uberaba, Minas Gerais</strong>. Atualmente estou trabalhando como <strong title='Desenvolvedor Front-End'>Desenvolvedor Front-End</strong> na [Fóton](https://www.foton.la/), alocado no [Banco do Nordeste (BNB)](https://www.bnb.gov.br/).

Com mais de **9 anos de experiência** na área de desenvolvimento, tenho sólida formação em <strong title='JavaScript'>JavaScript</strong>, <strong title='TypeScript'>TypeScript</strong>, <strong title='ReactJS'>ReactJS</strong>, <strong title='NextJS'>NextJS</strong>, **CSS** (<strong title='Styled Components'>Styled Components</strong>, <strong title='Emotion'>Emotion</strong>, <strong title='Tailwind CSS'>Tailwind CSS</strong>).

Acredito em escrever código limpo, legível e de fácil manutenção. Gosto de trabalhar em projetos desafiadores, aprender e aprimorar continuamente minhas habilidades.

No meu tempo livre, pratico <strong title='mountain bike'>mountain bike</strong> e, nas horas vagas, estou na trilha, treinando para **ultramaratonas** 🏃. Estou sempre ouvindo música <span>(preferencialmente rap)</span>🎧, torço pelo time do <strong title='MAIOR DE MINAS ✋✌'>Cruzeiro</strong>🦊, assisto a **NBA** 🏀 e, atualmente, jogo <strong title='Battlefield V'>Battlefield 6</strong>.
`,
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