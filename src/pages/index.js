import React from 'react'
import { SEO } from '../components/seo'
import { Paragraph } from '../components/typography'
import { Card, CardHeader, CardBody } from '../components/card'
import { PageContent, Container } from '../components/layout'
import { DataCarousel } from '../components/data-carousel'
import { HexMenu } from '../components/menus'
import { BulletedList, ListItem } from '../components/list'
import { Hidden } from 'react-grid-system'
import SickleCellImage from '../images/sickle-cell.jpg'
import EkgPrintoutImage from '../images/ekg-printout.jpg'

const IndexPage = () => {
    return (
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
                    <CardBody image={{ placement: 'right', path: SickleCellImage }}>
                        <Paragraph>
                            NHLBI BioData Catalyst is a cloud-based platform providing tools, applications, and workflows in secure workspaces.
                            By increasing access to NHLBI datasets and innovative data analysis capabilities,
                            BioData Catalyst accelerates efficient biomedical research that drives discovery and scientific advancement,
                            leading to novel diagnostic tools, therapeutics, and prevention strategies for heart, lung, blood, and sleep disorders.
                        </Paragraph>
                        <Paragraph>
                            Though the primary goal of the BioData Catalyst project is to build a data science ecosystem, at its core, this is a people-centric endeavor.
                            BioData Catalyst is also building a community of practice working collaboratively to solve technical and scientific challenges. 
                        </Paragraph>
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader size="large">
                        What can BioData Catalyst do for you?
                    </CardHeader>
                    <CardBody image={{ placement: 'left', path: EkgPrintoutImage }}>
                        <Paragraph>
                            BioData Catalyst allows researchers to find, access, share, store, cross-link, and compute on large scale datasets.
                            In this ecosystem, researchers are able to:
                        </Paragraph>
                        <BulletedList>
                            <ListItem primary="Utilize the many “out of the box” tools available on BioData Catalyst to ease the burden of designing and testing individual tools" />
                            <ListItem primary="Establish and use secure workspaces for collaborative analysis of NHLBI datasets and HLBS research by taking advantage of an ecosystem that brings the computation to the data, not the data to the computation" />
                            <ListItem primary="Design and test tools that search and analyze the unique characteristics of NHLBI datasets, and that also group data based on certain shared characteristics so that researchers can test hypotheses" />
                            <ListItem primary="Leverage a powerful and scalable infrastructure to share workflows, tools, datasets, and results for re-use by others" />
                            <ListItem primary="Construct and enhance annotated metadata for NHLBI datasets that comply with FAIR data principles" />
                        </BulletedList>
                    </CardBody>
                </Card>

            </Container>

        </PageContent>
    )
}

export default IndexPage
