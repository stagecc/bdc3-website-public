module.exports = {
    siteMetadata: {
        title: `BioData Catalyst`,
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
    plugins: [{
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
        `gatsby-transformer-remark`,
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
            resolve: "gatsby-plugin-anchor-links",
            options: {
                offset: -150,
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
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-120639061-2", // The property ID; the tracking code won't be generated without it
                head: true, // Defines where to place the tracking script - `true` in the head and `false` in the body
                anonymize: true, // Setting this parameter is optional
                respectDNT: true, // Setting this parameter is also optional
                // exclude: ["/preview/**", "/do-not-track/me/too/"], // Avoids sending pageview hits from custom paths
                // pageTransitionDelay: 0, // Delays sending pageview hits on route update (in milliseconds)
                // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID", // Enables Google Optimize using your container Id
                // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID", // Enables Google Optimize Experiment ID
                // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID", // Set Variation ID. 0 for original 1,2,3....
                // Any additional optional fields
                // Documented
                //  here: https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#create
                // and here: https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/
                // sampleRate: 5, // Specifies what percentage of users should be tracked. This defaults to 100 (no users are sampled out) but large sites may need to use a lower sample rate to stay within Google Analytics processing limits.
                siteSpeedSampleRate: 10, // This setting determines how often site speed beacons will be sent. By default, 1% of users will be automatically be tracked.
                cookieDomain: "biodatacatalyst.nhlbi.nih.gov", // Specifies the domain used to store the analytics cookie. Setting this to 'none' sets the cookie without specifying a domain.
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
};