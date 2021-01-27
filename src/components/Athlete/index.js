import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from 'gatsby'
import { Avatar, Container, Summit, Menu } from './styled'
import { Lightbulb as Light } from "@styled-icons/open-iconic/Lightbulb"

const Athlete = ({ total }) => {
      const [theme, setTheme] = useState(null)
      const isDarkMode = theme === "dark"
      useEffect(() => {
            setTheme(window.__theme)
            window.__onThemeChange = () => setTheme(window.__theme)
      }, [])
      const data = useStaticQuery(graphql`
            query {
                  stravaAthlete(athlete: {id: {eq: 28981595}}) {
                        athlete {
                              id
                              follower_count
                              friend_count
                              username
                              profile
                              summit
                        }
                  }
            }
      `)
      const athleteData = data.stravaAthlete.athlete;
      return (
            <Container>
                  <Avatar src={athleteData.profile} alt="twobanks" />
                  <div>
                        <div className="title">
                              <h1>{athleteData.username}</h1>
                              {athleteData.summit && <Summit />}
                        </div>
                        <ul>
                              <li>
                                    <strong>Seguindo</strong>
                                    <span>{athleteData.friend_count}</span>
                              </li>
                              <li>
                                    <strong>Seguidores</strong>
                                    <span>{athleteData.follower_count}</span>
                              </li>
                              <li>
                                    <strong>Atividades</strong>
                                    <span>{total}</span>
                              </li>
                        </ul>
                  </div>
                  <Menu
                        title="Mudar o tema"
                        onClick={() => {
                              window.__setPreferredTheme(isDarkMode ? "light" : "dark")
                        }}
                        className={theme}
                  >
                        <Light />
                  </Menu>
            </Container>
      )
};
export default Athlete;
