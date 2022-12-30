const GET_ABOUT = /* GraphQL */ `
  query GET_ABOUT {
    about {
      data {
        attributes {
          sectionAbout {
            description,
            image {
              data {
                attributes {
                  alternativeText,
                  url
                }
              }
            }
          }
          sectionAcademic {
            title,
            academic {
              local,
              course,
              period
            }
          }
          sectionExperience {
            title,
            experiences {
              role,
              name_company,
              url_company,
              city_company,
              period,
              stack
            }
          }
        }
      }
    }
  }
`
export default GET_ABOUT;
