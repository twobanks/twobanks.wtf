import { STACKS } from "@/utils/enums/stack";

export type Menu = {
  name: string;
  url: string;
  icon: string;
  iconAnimated: string;
}

export type Header = {
  avatar: string;
  menu: Menu[];
}

export type Challenges = {
  name: string;
  local: string;
  distance: string;
  date: string;
  url: string;
  image: string;
}

export type Works = {
  name: string;
  type: string;
  link: string;
  tech: STACKS[];
  company: {
    link: string;
    name: string;
  }
}

type Experiences = {
  current: boolean,
  role: string;
  name_company: string;
  url_company: string;
  city_company: string;
  period: string;
  tech: STACKS[],
  description: Array<string>;
}

type Academic = {
  local: string;
  course: string;
  period: string;
  url: string;
}


export type About = {
  experiences: Experiences[],
  academic: Academic;
}

export type Social = {
  name: string;
  link: string;
  nickname?: string;
  icon: string;
}

export type DataPost = {
  author: {
    name: string;
    image: string;
  };
  content: string;
  date: string;
  ogImage: { url: string; };
  title: string;
  description?: string;
};

export type Post = {
  data: DataPost;
  slug: string;
}

export type StaticProps = {
  params: {
    slug: string;
  }
}

export type Pages = 'sobre' | 'trampos' | 'activities' | 'snippets' | 'home' | 'ouvindo';