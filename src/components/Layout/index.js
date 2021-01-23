import React from "react"
import PropTypes from "prop-types"
import GlobalStyles from "../../styles/global"

import { LayoutWrapper } from './styled'

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <LayoutWrapper>
        <main>{children}</main>
      </LayoutWrapper>
    </>
  )
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
