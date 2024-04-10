# BioData Catalyst Website

## Overview

This is the public-facing website for the BioData Catalyst Coordinating Center. This site is built with [Gatsby](https://www.gatsbyjs.org), which is a free and open source framework based on [React](https://reactjs.org). Sites built with Gatsby are modern and _fast_.

## Project Structure

The portion of the project one mostly interacts with lives within the `src` directory. Its structure is shown below, and the directories described in this document are expanded to their state at the time of its writing.

```bash
$ tree -L 2

.
├── buildspec.yml
├── gatsby-browser.js
├── gatsby-config.js
├── gatsby-node.js
├── gatsby-ssr.js
├── LICENSE
├── node_modules
│   ├── ...
├── package.json
├── package-lock.json
├── public
│   ├── icons
│   ├── index.html
│   ├── manifest.webmanifest
│   ├── page-data
│   └── static
├── README.md
└── src
    ├── components
    ├── data
    ├── hooks
    ├── images
    ├── layouts
    ├── pages
    ├── styles
    └── templates
```

## Source Data

Much of the static content lives directly in the pages themselves (React components in the `./pages` directory). Because Gatsby is capable of [sourcing data](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map) from almost any location _at build time_, the content relating to partner organizations and service platforms lives in Markdown, YAML, JSON, and JavaScript files in the `./data` directory for injection into the site during the build process.

```bash
$ tree ./src/data
src/data/
├── index.js
├── menu.js
├── partners.yaml
└── platforms
    ├── dockstore.md
    ├── gen3.md
    ├── helx.md
    ├── pic-sure.md
    ├── seven-bridges.md
    └── terra.md
```

### Partners

The BioData Catlyst partner data lives in an array in YAML in the file `./src/data/partners.yaml`. Each entry in the platforms array consists of its name and its logo. The beginning of this file looks like the following:

```yaml
-
  name: Renaissance Computing Institute
  ota: OT3 AB123456
  image: ../images/logos/partners/renci.png
-
  name: RTI International
  ota: OT3 CD789012
  image: ../images/logos/partners/rti-international.png
-
  name: Broad Institute
  ota: OT3 EF345678
  image: ../images/logos/partners/broad-institute.png

//...

```

The partners are rendered in a list on the About page in alphabetical order.

### Platforms

Platform-specific data is sourced from Markdown files in the `./src/data/platforms` directory, which describe each of the platforms that integrate with BioData Catalyst.

As an example, below is the Markdown file for Gen3.

```md
---
title: Gen3
path: /platforms/gen3
logo: ../../images/logos/platforms/gen3.png
links:
  homepage: https://gen3.org
  launch: https://gen3.biodatacatalyst.nhlbi.nih.gov
  documentation: https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/explore_data/gen3-discovering-data
teaser: The Gen3 software stack is a collection of microservices that enable the standing-up of data commons, which allows different partner organizations to pool data and grants approved researchers access to harmonized datasets in a scalable, reproducible, and secure manner.
service: Gen3 is a software platform that allows partner organizations and grant approved researchers to search and access harmonized datasets. Users can search over project and study-specific genomic and phenotypic data and export selected cohorts to analytical workspaces in a scalable, reproducible, and secure manner.
---

- Use one of the microservices or community tools to submit data objects and metadata to a Gen3 Commons. Or develop your own tools specific to your user community.
- Gen3 will automatically index your data and provide globally unique identifiers (GUIDs). GUIDs can also be resolved at dataguids.org to find out where a data object lives within your data ecosystem.
- Engage Gen3’s broad user community. Ask a question, answer a question, request a new feature, or see if anyone else has approached a technical or scientific problem like yours in their Gen3 data commons.
- Gen3’s UI includes a data exploration tool you can customize for your data. You can choose the queries or faceted searches your user community wants; decide whether the data is able to leave the cloud or not; or develop your own apps over Gen3 APIs.
- Gen3 can be deployed with various levels of security and compliance. Deploy your data commons or ecosystem with the controls needed for your data and your user
- You can leave your data open to the Internet or control access at deeper levels within your own data use ontology, from the core data to the data objects
```

The platform source files consist of two portions: the _frontmatter_ and the _content_ portion. The _frontmatter_ lives between the pair of `---`s and contains metadata about the platform, while the content portion resides below it and consists of the content used to generate the platform-specific pages on the BioData Catalyst Website.

Note that the frontmatter consists of the fields `title`, `path`, `logo`, `links`, `teaser`, and `service`, and the `links` field is an array defining links associated with each platform: `homepage`, `launch`, and `documentation`. These links should be external to the the BioData Catlyst website and managed by each of the respective platforms.

The content portion of the source file can contain Markdown and HTML syntax. The above file is used to generate [this page](https://biodatacatalyst.nhlbi.nih.gov/platforms/gen3) at build time. In addition, the metadata is injected as necessary into various other locations around the site.

For example, this metadata is used to generate the logo cloud on the [About page](https://bdc-mockup.netlify.com/about) and the services described on the [Services page](https://bdc-mockup.netlify.com/resources/services).

### Dynamic Data

Although much of the power of Gatsby lies in its ability to source data (from internal and external sources) at build time, it retains the capability of handling dynamic data (that is, data obtained at run time) like one would expect from a traditional React application.

For example, this site pulls in FAQs for [this page](https://biodatacatalyst.nhlbi.nih.gov/faqs/) from our [Freshdesk knowledge base](https://bdcatalyst.freshdesk.com/support/home) ensuring data consistency.

## Contributing

Portions of the content on this website will change frequently and often without the knowledge of overseeing bodies, so it is imperative that associated teams, partners, and platforms take part in keeping it up-to-date.

Please follow the following procedures for requesting changes to the site. Once a change has been made, it will be deployed to [staging.biodatacatalyst.nhlbi.nih.gov](staging.biodatacatalyst.nhlbi.nih.gov) for review. Once at relevant parties are in agreement, the change will be pulled into the master branch and deployed to the production site on a reasonable time schedule.

### Content Change Requests

There are a couple efficient ways to request changes on the BioData Catalyst website content.

1. Create an [issue](https://github.com/stagecc/bdc3-website-public/issues) with the label `content`. Be sure detail specifically what content needs to be changed.

2. If you are comfortable with the above description of how content data is managed for this website, feel free to locate and edit the appropriate files ([partners](https://github.com/stagecc/bdc3-website-public/blob/master/src/data/partners.yaml) or [platforms](https://github.com/stagecc/bdc3-website-public/blob/master/src/data/platforms)) and submit a pull request.

### Feature Requests

Additional features require a bit more thgouht and time to implement than content changes, but they still should follow the same procedue: please create an [issue](https://github.com/stagecc/bdc3-website-public/issues) with the label `feature`.

## Development

If you would like to contribute to the development of this site, feel free to propose changes with pull requests. As the `master` branch will always represent the deployed production version of the site, please branch feature branches off this branch. The `staging` branch will used to demo new features and will not be a reliable source branch, as it will likely experience forced pushes and rebases while those features converge to their final states.

For local development you will need `node` and the `gatsby-cli`. Once you've cloned this repo, execute `gatsby develop` from the project root to spin up the development server which can be accessed on port 8000 by default. With the development server's built-in hot module reloading, you'll be able to see changes as they are made to the source code.

Before submitting a pull request, please ensure your changes will build successfully. To test this execute

- `gatsby clean` (clears cached files),
- `gatsby build` (builds site), and
- `gatsby serve` (serves build files on port 9000)

(or in one line: `gatsby clean && gatsby build && gatsby serve`).

## Deployment

This site is deployed in an [AWS S3 bucket](https://aws.amazon.com/s3/). Using [AWS CodeBuild](https://aws.amazon.com/codebuild/), the deployment process is automated. Changes to the `staging`, `pre-prod`, and `master` branches in thsi repo trigger build and deployment to `https://staging.biodatacatalyst.nhlbi.nih.gov/`, `https://pre-prod.biodatacatalyst.nhlbi.nih.gov/`, and `https://biodatacatalyst.nhlbi.nih.gov/`, respectively. The statuses of current and previous builds are visible from within the [AWS Console](console.aws.amazon.com/), as are other configuration options, such as branch-specific deployments.

This automated build and deployment are managed via the `buildspec.yml` file in the project root; do not delete this file.

## Resources

- [AWS](https://aws.amazon.com/)
  - [CodeBuild](https://aws.amazon.com/codebuild/)
  - [S3](https://aws.amazon.com/s3/)
- [React](https://reactjs.org/)
  - [Gatsby](https://www.gatsbyjs.org/)
- Data Sources
  - [Markdown](https://www.markdownguide.org/basic-syntax/)
  - [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
  - [YAML](https://en.wikipedia.org/wiki/YAML)
- Remote Services
  - [Freshdesk API](https://developers.freshdesk.com/api/)
- AWS
  - [CodeBuild](https://aws.amazon.com/codebuild/)
    - [Build Specification Reference](https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html)
  - [Console](console.aws.amazon.com/)
  - [S3](https://aws.amazon.com/s3/)
