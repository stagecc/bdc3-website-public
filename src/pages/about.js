import React, { Fragment } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { SEO } from '../components/seo'
import { PageContent, Container, LineBreak } from '../components/layout'
import { Title, Heading, Paragraph } from '../components/typography'
import { BulletedList, ListItem } from '../components/list'
import { Card, CardHeader, CardBody } from '../components/card'
import { Accordion } from '../components/accordion'
import { Badge } from '../components/badge'
import AboutBioDataCatalystSvg from '../images/about-hero.svg'
import { ExternalLink } from '../components/link'

const ccQuery = graphql`{
    coordinatingCenter: allCoordinatingCenterJson {
        edges {
            node {
                id
                name
                title
                email
            }
        }
    }
    projectTeams: allProjectTeamsJson {
        edges {
            node {
                id
                name
                symbol
                members {
                    Institution
                    Principal_Investigator
                    Institution_Lead
                    Department
                }
            }
        }
    }
    dataStewards: allDataStewardsJson {
        edges {
            node {
                id
                name
                url
            }
        }
    }
}`

const AboutPage = () => {
    const data = useStaticQuery(ccQuery)
    const cc = data.coordinatingCenter.edges.map(({ node }) => ({ ...node }))
    const projectTeams = data.projectTeams.edges.map(({ node }) => ({ ...node }))
    const dataStewards = data.dataStewards.edges.map(({ node }) => ({ ...node }))

    return (
        <PageContent width="95%" maxWidth="1080px" center gutters>
            <SEO
                title="About BioData Catalyst"
                description=""
                keywords=""
            />
        
            <Title>About BioData Catalyst</Title>

            <Heading>What We are</Heading>

            <Paragraph>
                For research investigators who need to find, access, share, store, cross-link, and compute on large scale data sets, NHLBI BioData Catalyst serves as a cloud-based ecosystem providing tools, applications, and workflows to enable these capabilities in secure workspaces. 
            </Paragraph>

            <Paragraph>
                NHLBI BioData Catalyst increases access to NHLBI data sets and innovative data analysis capabilities and accelerates efficient biomedical research that drives discovery and scientific advancement, leading to novel diagnostic tools, therapeutic options, and prevention strategies for heart, lung, blood, and sleep disorders.
            </Paragraph>

            <Heading>Who We are</Heading>
            
            <Paragraph>
                Though the primary goal of the BioData Catalyst project is to build a data science platform, at its core, this is a people-centric endeavor. BioData Catalyst is also building a community of practice working in parallel to collaboratively solve technical challenges.
            </Paragraph>

            <Paragraph>
                The BioData Catalyst ecosystem is funded by a flexible mechanism called Other Transactions (OT). The OT mechanism gives NHLBI considerable flexibility in making and managing awards. This is particularly important for the BioData Catalyst to stay nimble as it approaches the complex tasks involved in the development of this ecosystem under the ever-changing conditions of data science and biomedical science.
            </Paragraph>

            <Paragraph>
                Currently, researchers and other professionals from the following institutions have received OTA funding from the NHLBI to work on the BioData Catalyst ecosystem:
            </Paragraph>

            <BulletedList>
                <ListItem primary="Renaissance Computing Institute (RENCI)" />
                <ListItem primary="RTI International" />
                <ListItem primary="The Broad Institute" />
                <ListItem primary="The University of California, Santa Cruz" />
                <ListItem primary="The University of Chicago" />
                <ListItem primary="Vanderbilt University Medical Center" />
                <ListItem primary="Harvard Medical School" />
                <ListItem primary="University of North Carolina at Chapel Hill" />
                <ListItem primary="Lawrence Berkeley National Laboratory" />
                <ListItem primary="Oregon State University" />
                <ListItem primary="University of New Mexico Health Sciences Center" />
                <ListItem primary="Seven Bridges Genomics Inc" />
                <ListItem primary="Elsevier" />
                <ListItem primary="Repositive" />
                <ListItem primary="US Department of Veterans Affairs" />

            </BulletedList>
            
            <Heading>Data Sets Included in BioData Catalyst</Heading>

            <BulletedList>
                <ListItem primary={ <ExternalLink to="http://www.copdgene.org/">Chronic Obstructive Pulmonary Disease (COPD) Gene</ExternalLink> } />
                <ListItem primary={ <ExternalLink to="https://www.nhlbiwgs.org/">Trans-Omics for Precision Medicine (TopMed)</ExternalLink> } />
            </BulletedList>

            <Heading>
                Partners Powering our Ecosystem

            </Heading>
            
            <BulletedList>
                <ListItem primary="Dockstore" />
                <ListItem primary="GEN 3 Data Commons" />
                <ListItem primary="HeLx" />
                <ListItem primary="PIC-SURE" />
                <ListItem primary="Seven Bridges" />
                <ListItem primary="Terra" />
            </BulletedList>

            <Heading>How You Can Contribute</Heading>

            <Paragraph>
                BioData Catalyst is a dynamic resource that will be continually developed and refined.
                The BioData Catalyst Consortium solicits feedback from members and NHLBI on the development of significant processes, emerging standards, and decisions in two main ways:
            </Paragraph>

            <ol style={{ lineHeight: 2 }}>
                <li>A Request for Comment (RFC) process. The RFC process endorses transparency and openness during the evolution of BioData Catalyst as a groundbreaking platform providing unparalleled data access and capabilities to researchers across the globe.</li>
                <li>Ongoing submission and upvoting of ideas via the <ExternalLink to="https://nhlbidatastage.ideascale.com/a/index">NHLBI BioDataCatalyst Ideascale</ExternalLink>.</li>
            </ol>
                           
            <LineBreak count={ 2 } />

        </PageContent>
    )
}

export default AboutPage
