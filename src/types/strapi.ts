type NameAndUrl = {
  url: string;
  name: string;
}

export type HeaderPropsStrapiProps = {
  logo:  {
    data:  {
      attributes: NameAndUrl
    }
  },
  menu: NameAndUrl[]
}

export type HomeProps = {
  data: {
    attributes: {
      header: HeaderPropsStrapiProps,
      footer: {
        menu: NameAndUrl[]
      },
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

type Title = {
  title: string;
}

export type SectionAcademic = {
  title: Title;
  academic: {
    local: string;
    course: string;
    period: string;
  }[]
}

export type SectionExperience = {
  title: Title;
  experiences: {
    role: string;
    name_company: string;
    url_company: string;
    city_company: string;
    period: string;
    stack: string;
  }[]
}

export type AboutProps = {
  data: {
    attributes: {
      sectionAbout: SectionAbout;
      sectionAcademic: SectionAcademic;
      sectionExperience: SectionExperience;
    }
  }
}
