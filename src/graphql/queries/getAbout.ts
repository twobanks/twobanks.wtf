const GET_ABOUT = /* GraphQL */ `
  query GET_ABOUT {
    about {
      data {
        attributes {
          about {
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
          experiences {
            role,
            name_company,
            url_company,
            city_company,
            period,
            tech {
              name
            }
          }
          academic {
            local,
            course,
            period
          }
        }
      }
    }
}
`
export default GET_ABOUT;
