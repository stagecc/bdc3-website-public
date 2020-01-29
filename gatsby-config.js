module.exports = {
  siteMetadata: {
    title: `BioData Catalyst`,
    description: `BioData Catalyst serves as a cloud-based platform of tools, applictions, and workflows to help NHLBI research investigators securely find, access, share, store, cross-link, and compute on large scale data sets,`,
    author: `BioData Catalyst`,
    keywords: ["data", "cloud", "computing", "research", "platform", "NIH", "NHLBI", "discovery", "science", "diagnostic tools", "therapeutic options", "prevention strategies", "heart", "lung", "blood","sleep", "disorders"],
    siteUrl: 'https://biodatacatalyst.nhlbi.nih.gov/',
    twitterUsername: '',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: [
            'Montserrat:300,400,600',
          ]
        }
      }
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `biodata-catalyst`,
        short_name: `bdc`,
        start_url: `/`,
        background_color: `#c1272d`,
        theme_color: `#c1272d`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
