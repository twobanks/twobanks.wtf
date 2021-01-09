import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Avatar, Container, Summit } from './styled'

const Athlete = ({ total }) => {
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
            </Container>
      )
};
export default Athlete;
