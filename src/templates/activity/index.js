import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/Layout"
import SEO from "../../components/seo"
import { Link } from "gatsby"

const ActivityTemplate = ({
	data: {
		stravaActivity: { activity },
	},
}) => (
		<Layout>
			<SEO title={activity.name} />
			<>
				<h1><strong>Activity Name</strong>: {activity.name}</h1>
				<ul>
					<li><strong>Activity Type</strong>: {activity.type}</li>
					<li><strong>Average Speed</strong>: {activity.average_speed}</li>
					<li><strong>Achievement Count</strong>: {activity.achievement_count}</li>
					<li><strong>Average Heartrate</strong>: {activity.average_heartrate}</li>
					<li><strong>Distance</strong>: {activity.distance}</li>
					<li><strong>Elapsed Time</strong>: {activity.elapsed_time}</li>
					<li><strong>Kudos</strong>: {activity.kudos_count}</li>
				</ul>
			</>
			<Link to="/">Voltar</Link>
		</Layout>
	)

export default ActivityTemplate

export const ActivityPageQuery = graphql`
	query($id: Float) {
		stravaActivity(activity: { id: { eq: $id } }) {
			activity {
				average_speed
				name
				achievement_count
				average_heartrate
				distance
				elapsed_time
				type
				kudos_count
			}
		}
	}
`