const GET_HOME = /* GraphQL */ `
  query GET_HOME {
    home {
      data {
        attributes {
          header {
            logo {
              data {
                attributes {
                  name,
                  url
                }
              }
            }
            menu {
              url,
              name
            }
          }
          footer {
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
