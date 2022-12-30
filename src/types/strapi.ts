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


