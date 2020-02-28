# BioData Catalyst Website


## Overview

This is the public-facing website for the BioData Catalyst Coordinating Center. This site is built with [Gatsby](https://www.gatsbyjs.org), which is a free and open source framework based on [React](https://reactjs.org). Sites built with Gatsby are modern and _fast_.

## Requesting Changes


### Project Structure

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

### Source Data

Much of the static content lives directly in the pages themselves (React components in the `./pages` directory), Gatsby has the ability to source data from almost any location at build time. Therefore, the content that the member organizations and service platforms lives in Markdown, YAML, JSON, and JavaScript files in the `./data` directory for Gatsby to inject into the site at build time.

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

#### Partners

The BioData Catlyst partner data lives in an array in YAML in the file `./src/data/partners.yaml`. Each entry in the platforms array consists of its name and its logo. The beginning of this file looks like the following:

```yaml
-
  name: Renaissance Computing Institute
  image: ../images/logos/partners/renci.png
-
  name: RTI International
  image: ../images/logos/partners/rti-international.png
-
  name: Broad Institute
  image: ../images/logos/partners/broad-institute.png

//...

```

The partners are rendered on the About page in the order in which they are listed in the source file.

#### Platforms

Platform-specific data is sourced from Markdown files in the `./src/data/platforms` directory, which describe each of the platforms that integrate with BioData Catalyst.

As an example, below is the Markdown file for Gen3.

```md
---
title: Gen3
path: /platforms/gen3
logo: ../../images/logos/platforms/gen3.png
links: 
    homepage: https://gen3.org
    launch: https://gen3.datastage.io/
    documentation: https://gen3.org/get-started/
teaser: The Gen3 software stack is a collection of microservices that enable the standing-up of data commons, which allows different partner organizations to pool data and grants-approved researchers access to harmonized datasets in a scalable, reproducible, and secure manner.
service: The Gen3 platform lets users search and filter over harmonized TOPMed variables and their value ranges, and export the selected cohorts to analytical workspaces. Gen3 also allows users to search over study-specific genomic and phenotypic data files broken down by consent groups, and discover new studies to apply for access through dbGaP.
---
- Private, secure, workspaces (projects) for running analyses at scale
- Collaboration features with the ability to set granular permissions on project members
- Directly access BDC without needing to set up a Google or AWS billing account
- Access to hosted TOPMed studies all in one place and the ability to analyze data on the cloud at scale
- Tools and features for performing multiple-variant and single-variant association studies including:
    + Annotation Explorer for variant aggregations
    + Cloud-optimized Genesis R package workflows in Common Workflow Language
+ Cohort creation by searching phenotype data
    + Use PIC-SURE API for searching phenotype data 
    + Search by known dbGaP identifiers
    + Rstudio and Jupyterlab Notebooks built directly into the platform for easy interactive analysis and manipulation of phenotype data
- Ability to analyze hosted TOPMed Data in combination with your own data on AWS or Google Cloud
- Billing and administrative controls to help your research funding go further - avoid forgotten instances, abort infinite loops, get usage breakdowns by project.
```

The platform source files consist of two portions: frontmatter and the content. The frontmatter (between the pair of `---`s) contains metadata about the platform, while the portion below consists of content used to generate the platform-specific pages on the BioData Catalyst Website. 

Note that the frontmatter consists of the fields `title`, `path`, `logo`, `links`, `teaser`, and `service`, while the `links` field is an array defining links associated with each platform: `homepage`, `launch`, and `documentation`. These links should be external to the the BioData Catlyst website and managed by each of the respective platforms.

The content portion of the source file can contain Markdown and HTML syntax. The above file is used to generate [this page](https://bdc-mockup.netlify.com/platforms/gen3) at build time. In addition, the metadata is injected as necessary into various other locations around the site.

For exmaple, this metadata is used to generate the logo cloud on the [About page](https://bdc-mockup.netlify.com/about) and the services described on the [Services page](https://bdc-mockup.netlify.com/resources/services).

## Contributing

### Content Change Requests

There are a couple efficient ways to request changes on the BioData Catalyst website content.

You may create an [issue](https://github.com/mbwatson/bdc-mockup/issues) with one of the following labels: `content-general`, `content-partner` or `content-platform`. Be sure detail specifically what content needs to be changed.

If you are comfortable with the above description of how content data is managed for this webite, feel free to locate and edit the appropriate files ([partners]https://github.com/mbwatson/bdc-mockup/blob/master/src/data/partners.yaml) or [platforms]https://github.com/mbwatson/bdc-mockup/blob/master/src/data/platforms)) and submit a pull request.

## Resources

- [AWS](https://aws.amazon.com/)
    + [CodeBuild](https://aws.amazon.com/codebuild/)
    + [S3](https://aws.amazon.com/s3/)
- [React](https://reactjs.org/)
    + [Gatsby](https://www.gatsbyjs.org/)
- Data Sources
    + [Markdown](https://www.markdownguide.org/basic-syntax/)
    + [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
    + [YAML](https://en.wikipedia.org/wiki/YAML)
    + [Source Map](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map)