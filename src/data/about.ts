const twobanks = '/img/twobanks.webp';

type About = {
  description: string;
  image: string;
};

type Experiences = {
  current: boolean,
  role: string;
  name_company: string;
  url_company: string;
  city_company: string;
  period: string;
  tech: string[],
}

type Academic = {
  local: string;
  course: string;
  period: string;
}

export type AboutData = {
  about: About,
  experiences: Experiences[],
  academic: Academic;
}

export const data: AboutData = {
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

export default data;
