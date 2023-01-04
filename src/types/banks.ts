import { STACKS } from "../utils/enums/stack";

export type Menu = {
  name: string;
  url: string;
  icon?: string;
  iconAnimated?: string;
}

export type Header = {
  avatar: string;
  menu: Menu[];
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
  tech: string[],
}

type Academic = {
  local: string;
  course: string;
  period: string;
}


export type About = {
  experiences: Experiences[],
  academic: Academic;
}

export type Social = {
  name: string;
  link?: string;
  nickname?: string;
  icon?: string;
}

export type Post = {
  author: {
    name: string;
    picture: string;
  };
  content: string;
  coverImage: string;
  date: string;
  ogImage: { url: string; };
  slug: string;
  title: string;
}
