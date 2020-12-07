import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/Layout"
import SEO from "../../components/seo"
import ListActivities from '../../components/ListActivities'
import Pagination from "../../components/Pagination"
import { ActivitiesWrapper } from "../../components/ActivitiesWrapper/styled"

const ActivitiesList = props => {
    const activitiesList = props.data.allStravaActivity.edges

    const { currentPage, numPages } = props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : `/page/${currentPage - 1}`
    const nextPage = `/page/${currentPage + 1}`
    return (
        <Layout>
            <SEO title="Lista de Atividades - Teste" />
            <ActivitiesWrapper>
                {activitiesList.map(
                    ({
                        node: {
                            activity: { id, name, average_speed, distance, kudos_count, start_date, moving_time, total_elevation_gain },
                        },
                    }) => (
                            <ListActivities
                                key={id}
                                id={id}
                                name={name}
                                average_speed={average_speed}
                                distance={distance}
                                kudos_count={kudos_count}
                                start_date={start_date}
                                moving_time={moving_time}
                                total_elevation_gain={total_elevation_gain}
                            />
                        )
                )}
            </ActivitiesWrapper>
            <Pagination isFirst={isFirst} isLast={isLast} currentPage={currentPage} numPages={numPages} prevPage={prevPage} nextPage={nextPage} />
        </Layout>
    )
}
export const query = graphql`
      query ($skip: Int!, $limit: Int!) {
            allStravaActivity(
				sort: {fields: activity___start_date, order: DESC}
				limit: $limit
				skip: $skip
				) {
				edges {
					node {
						activity {
                            id
                            name
							average_speed
							distance
							kudos_count
							start_date
                            moving_time
                            total_elevation_gain
						}
					}
				}
			}
		}
`
export default ActivitiesList
