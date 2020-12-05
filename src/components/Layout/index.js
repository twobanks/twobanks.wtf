import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Title } from "./styled"
import GlobalStyles from "../../styles/global"

const Layout = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <GlobalStyles />
      <Title>
        <h1>{data.site.siteMetadata.title}</h1>
      </Title>
    </>
  )
}

export default Layout
