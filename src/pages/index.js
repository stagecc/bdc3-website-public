import React from 'react'
import { SEO } from '../components/seo'
import { Heading, Paragraph } from '../components/typography'
import { Card, CardHeader, CardBody } from '../components/card'
import { PageContent, Container, BandedContainer, BackgroundImageContainer, LineBreak } from '../components/layout'
import { SearchInput } from '../components/form'
import { ButtonCta } from '../components/buttons'
import { Container as Grid, Row, Col, Visible } from 'react-grid-system'
import { Carousel, DataContainer } from '../components/modules'
import { BulletedList, ListItem } from '../components/list'

const IndexPage = () => (
    <PageContent>
        <SEO
            title="Home"
            description=""
            keywords=""
        />
        <Carousel />
        
        <LineBreak count={ 4 } />

        <Container center>
            <SearchInput />
        </Container>
    
        <LineBreak count={ 3 } />

        <BandedContainer width="100%">
            <Container width="90%" maxWidth="1080px" center>

                <Grid fluid>
                    <Row gutterWidth={ 40 }>
                        <Col xs={ 12 } lg={ 6 }>
                            <Card>
                                <CardHeader>What is BioData Catalyst?</CardHeader>
                                <CardBody>
                                    <Paragraph>
                                        NHLBI BioData Catalyst is a cloud-based platform providing tools, applications, and workflows in secure workspaces. By increasing access to NHLBI data sets and innovative data analysis capabilities, BioData Catalyst accelerates efficient biomedical research that drives discovery and scientific advancement, leading to novel diagnostic tools, therapeutic options, and prevention strategies for heart, lung, blood, and sleep disorders.
                                    </Paragraph>
                                    <Paragraph>
                                        Though the primary goal of the BioData Catalyst project is to build a data science platform, at its core, this is a people-centric endeavor. BioData Catalyst is also building a community of practice working in parallel to collaboratively solve technical challenges. 
                                    </Paragraph>
                                </CardBody>
                            </Card>
                        </Col>
                        <Visible xs sm md>
                            <Row>
                                <Col xs={ 12 }>
                                    <br/><br/><br/>
                                </Col>
                            </Row>
                        </Visible>
                        <Col xs={ 12 } lg={ 6 }>
                            <Card>
                                <CardHeader>
                                    What can BioData Catalyst do for you?
                                </CardHeader>
                                <CardBody>
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
                        </Col>
                    </Row>

                </Grid>
            </Container>
        </BandedContainer>
        
        <LineBreak count={ 5 } />

        <BackgroundImageContainer width="100%" image="https://picsum.photos/900/500">
            <Container width="90%" maxWidth="1080px" center>
                <Grid fluid>
                    <Row>
                        <Col xs={ 12 }>
                            <Card title="" bgColor="var(--color-crimson)" fgColor="#fff">
                                <CardHeader bgColor="var(--color-crimson)">Available Data</CardHeader>
                                <CardBody bgColor="var(--color-crimson)">
                                    <DataContainer />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={ 12 }>
                            <LineBreak count={ 3 } />
                            <Heading center light style={{ width: '90%', margin: '0 auto', fontSize: '180%', lineHeight: 1.5, padding: '1rem', backgroundColor: '#111133aa' }}>
                                Have an idea for BioData Catalyst?<br/>
                                We want to hear from you!
                            </Heading>
                            <LineBreak count={ 3 } />
                            <Paragraph center>
                                <ButtonCta to ="/contact">Submit your idea here</ButtonCta>
                            </Paragraph>
                            <LineBreak count={ 3 } />
                        </Col>
                    </Row>
                </Grid>
            </Container>
        </BackgroundImageContainer>
        
    </PageContent>
)

export default IndexPage
