import { STACKS } from "../enums";

export type Social = {
  name: string;
  link: string;
  nickname?: string;
  icon: React.ElementType;
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
  about: string;
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