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

export type FooterStrapiProps = {
  menu: NameAndUrl[]
}

export type HomeProps = {
  attributes: {
    header: HeaderPropsStrapiProps,
    footer: FooterStrapiProps,
  }
}
