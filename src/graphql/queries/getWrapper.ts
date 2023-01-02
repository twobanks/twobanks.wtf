const GET_HOME = /* GraphQL */ `
  query QUERY_HOME {
    home {
      data {
        attributes {
          infos {
            logo {
              data {
                attributes {
                  alternativeText,
                  url
                }
              }
            }
            menu {
              url,
              name
            }
          }
        }
      }
    }
  }
`
export default GET_HOME;
