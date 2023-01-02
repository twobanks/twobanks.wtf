import { STACKS } from "../utils/enums/stack";

type NameAndUrl = {
  url: string;
  name: string;
}

export type HeaderPropsStrapiProps = {
  logo:  {
    data:  {
      attributes: {
        alternativeText: string;
        url: string;
      }
    }
  },
  menu: NameAndUrl[]
}

export type HomeProps = {
  data: {
    attributes: {
      infos: {
        logo: {
          data: {
            attributes: {
              alternativeText: string;
              url: string;
            }
          }
        }
        menu: NameAndUrl[];
      }
    }
  }
}

export type SectionAbout = {
  description: string;
  image: {
    data: {
      attributes: {
        alternativeText: string;
        url: string;
      }
    }
  }
}

export type SectionAcademic = {
  local: string;
  course: string;
  period: string;
}

export type SectionExperience = {
  role: string;
  name_company: string;
  url_company: string;
  city_company: string;
  period: string;
  tech: {
    name: STACKS;
  }[]
}

export type AboutProps = {
  data: {
    attributes: {
      about: SectionAbout;
      academic: SectionAcademic;
      experiences: SectionExperience[];
    }
  }
}

export type Work = {
  works: {
    name: string;
    name_company: string;
    url_company: string;
    url_name: string;
    type: string;
    tech: {
      name: STACKS;
    }[]
  }[]
}

export type WorkProps = {
  data: {
    attributes: Work;
  }
}
