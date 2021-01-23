import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import getThemeColor from '../utils/getThemeColor'

const About = () => {
      const [theme, setTheme] = useState(null)
      const [display, setDisplay] = useState(null)
      const isDarkMode = theme === "dark"
      const isListMode = display === "list"
      useEffect(() => {
            setTheme(window.__theme)
            setDisplay(window.__display)
            window.__onThemeChange = () => setTheme(window.__theme)
            window.__onDisplayChange = () => setDisplay(window.__display)
      }, [])
      return (
            <>
                  <Layout>
                        <SEO title="About" />
                        <span title="Mudar o tema"
                              onClick={() => {
                                    window.__setPreferredTheme(isDarkMode ? "light" : "dark")
                              }}
                              className={theme} > trocar tema</span>

                  </Layout>
            </>
      )
}

export default About


