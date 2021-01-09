require("dotenv").config()

const {
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
  STRAVA_TOKEN,
} = process.env

module.exports = {
  siteMetadata: {
    title: `twobanks.wtf (?!)`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@twobanks`,
    siteUrl: `https://twobanks.wtf`,
  },
  plugins: [
    `gatsby-plugin-eslint`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-strava",
      options: {
        stravaClientId: STRAVA_CLIENT_ID,
        stravaClientSecret: STRAVA_CLIENT_SECRET,
        stravaToken: STRAVA_TOKEN,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
