import React from 'react'
import { SEO } from '../components/seo'
import { Paragraph } from '../components/typography'
import { Card, CardHeader, CardBody } from '../components/card'
import { PageContent, Container } from '../components/layout'
import { DataCarousel } from '../components/data-carousel'
import { HexMenu } from '../components/menus'
import { Hero } from '../components/hero'
import { BulletedList, ListItem } from '../components/list'
import { Hidden } from 'react-grid-system'

const IndexPage = () => (
    <PageContent>
        <SEO
            title="Home"
            description=""
            keywords=""
        />

        <DataCarousel />

        <Container width="90%" maxWidth="1200px" center style={{ marginTop: '0' }}>
            
            <Hidden xs sm md>
                <HexMenu />
            </Hidden>

            <Card>
                <CardHeader size="large">
                    What is BioData Catalyst?
                </CardHeader>
                <CardBody image={{ placement: 'right', path: 'https://i.picsum.photos/id/844/367/267.jpg' }}>
                    <Paragraph>
                        NHLBI BioData Catalyst is a cloud-based platform providing tools, applications, and workflows in secure workspaces. By increasing access to NHLBI data sets and innovative data analysis capabilities, BioData Catalyst accelerates efficient biomedical research that drives discovery and scientific advancement, leading to novel diagnostic tools, therapeutic options, and prevention strategies for heart, lung, blood, and sleep disorders.
                    </Paragraph>
                    <Paragraph>
                        Though the primary goal of the BioData Catalyst project is to build a data science platform, at its core, this is a people-centric endeavor. BioData Catalyst is also building a community of practice working in parallel to collaboratively solve technical challenges. 
                    </Paragraph>
                </CardBody>
            </Card>

            <Card>
                <CardHeader size="large">
                    What can BioData Catalyst do for you?
                </CardHeader>
                    <CardBody image={{ placement: 'left', path: 'https://i.picsum.photos/id/953/2376/2634.jpg' }}>
                    <Paragraph>
                        BioData Catalyst allows NHLBI research investigators to find, access, share, store, cross-link, and compute on large scale data sets. On the platform, researchers will be able to: 
                    </Paragraph>
                    <BulletedList>
                        <ListItem primary="Construct and enhance annotated metadata for NHLBI datasets that comply with FAIR data principles" />
                        <ListItem primary="Design and test tools that search and analyze the unique characteristics of NHLBI datasets, and that also group data based on certain shared characteristics so that researchers can test hypotheses" />
                        <ListItem primary="Use BioData Catalyst’s capabilities to integrate NHLBI imaging data with TOPMed data" />
                        <ListItem primary="Establish and support secure workspaces for collaborative analysis specialized for NHLBI datasets and HLBS research, using a platform that brings the computation to the data, not the data to the computation" />
                    </BulletedList>
                </CardBody>
            </Card>

        </Container>

    </PageContent>
)

export default IndexPage
