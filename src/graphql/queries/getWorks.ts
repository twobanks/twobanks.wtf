const GET_WORKS = /* GraphQL */ `
  query GET_WORKS  {
    work {
      data {
        attributes {
          works {
            name,
            name_company,
            url_company,
            url_name,
            type,
            stack {
              name
            }
          }
        }
      }
    }
  }
`
export default GET_WORKS;
