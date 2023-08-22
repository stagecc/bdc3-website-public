module.exports = {
  siteMetadata: {
    title: `BioData Catalyst`,
    shortTitle: `BDC`,
    description: `BioData Catalyst serves as a cloud-based platform of tools, applications, and workflows to help NHLBI research investigators securely find, access, share, store, cross-link, and compute on large scale data sets,`,
    author: `BioData Catalyst`,
    keywords: [
      "data",
      "cloud",
      "computing",
      "research",
      "platform",
      "NIH",
      "NHLBI",
      "discovery",
      "science",
      "diagnostic tools",
      "therapeutic options",
      "prevention strategies",
      "heart",
      "lung",
      "blood",
      "sleep",
      "disorders",
    ],
    siteUrl: "https://biodatacatalyst.nhlbi.nih.gov/",
    twitterUsername: "",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Montserrat:300,400,600"],
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/partners`,
        name: "partners",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/platforms`,
        name: "platforms",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/fellows`,
        name: "fellows",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/studies`,
        name: "studies",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/latest-updates`,
        name: "latest-updates",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/events`,
        name: "events",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/publications`,
        name: "publications",
      },
    },
    { resolve: `gatsby-transformer-remark`,
    options: {
        plugins: [
            {
                resolve: `gatsby-remark-images`,
                options: {
                    // It's important to specify the maxWidth (in pixels) of
                    // the content container as this plugin uses this as the
                    // base for generating different widths of each image.
                    maxWidth: 800,
                },
            },
        ]
      }
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
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /service-ecosystem/,
        },
      },
    },
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
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-2M4JYYSBD3"],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
