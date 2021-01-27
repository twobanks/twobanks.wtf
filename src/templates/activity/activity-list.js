import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/Layout"
import SEO from "../../components/seo"
import ListActivities from '../../components/ListActivities'
import Pagination from "../../components/Pagination"
import Athlete from '../../components/Athlete'

const ActivitiesList = props => {
    const activitiesList = props.data.allStravaActivity.edges
    const totalCount = props.data.allStravaActivity.totalCount
    const { currentPage, numPages } = props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? "/" : `/page/${currentPage - 1}`
    const nextPage = `/page/${currentPage + 1}`
    return (
        <Layout>
            <SEO title="Home" />
            <Athlete total={totalCount} />
            {activitiesList.map(
                ({
                    node: {
                        activity: { id, name, average_speed, distance, kudos_count, start_date_formatted, moving_time, suffer_score, total_elevation_gain, type },
                    },
                }) => (
                    <ListActivities
                        key={id}
                        id={id}
                        name={name}
                        average_speed={average_speed}
                        distance={distance}
                        kudos_count={kudos_count}
                        start_date_formatted={start_date_formatted}
                        moving_time={moving_time}
                        suffer_score={suffer_score}
                        total_elevation_gain={total_elevation_gain}
                        type={type}
                    />
                )
            )}
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
                totalCount
				edges {
					node {
						activity {
                            id
                            name
							average_speed
							distance
							kudos_count
                            start_date
							start_date_formatted: start_date(locale: "pt-br", formatString: "dddd, DD MMMM YYYY")
                            moving_time
                            suffer_score
                            total_elevation_gain
                            type
						}
					}
				}
			}
		}
`
export default ActivitiesList
