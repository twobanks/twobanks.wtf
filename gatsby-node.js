const path = require('path')

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions
	return graphql(`
		{
			allStravaActivity(sort: {fields: activity___start_date, order: DESC}) {
				edges {
					node {
						activity {
							id
						}
					}
				}
			}
		}
	`).then(result => {
		const activities = result.data.allStravaActivity.edges
		activities.forEach(({ node, next, previous }) => {
			createPage({
				path: `/activities/${node.activity.id}`,
				component: path.resolve("./src/templates/activity/index.js"),
				context: {
					id: parseInt(node.activity.id),
					previousActivities: next,
					nextActivities: previous
				},
			})
		})

		const activitiesPerPage = 5
		const numPages = Math.ceil(activities.length / activitiesPerPage)

		Array.from({ length: numPages }).forEach((_, index) => {
			createPage({
				path: index === 0 ? `/` : `/page/${index + 1}`,
				component: path.resolve(`./src/templates/activity/activity-list.js`),
				context: {
					limit: activitiesPerPage,
					skip: index * activitiesPerPage,
					numPages,
					currentPage: index + 1
				}
			})
		})

	})
}