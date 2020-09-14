import React from 'react'
import Img from 'gatsby-image'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { SEO } from '../components/seo'
import styled from 'styled-components'
import { PageContent } from '../components/layout'
import { Title, Heading, Subheading, Paragraph } from '../components/typography'
import { Button } from '../components/buttons'
import { DownloadIcon } from '../components/icons'
import { BulletedList, ListItem } from '../components/list'
import { ExternalLink } from '../components/link'
import { Container as Grid, Row, Col, Visible } from 'react-grid-system'
import { usePartners, usePlatforms } from '../hooks'
import covidBackgroundImage from '../images/covid-background.png'

const Covid19Page = () => {
    return (
        <PageContent width="95%" maxWidth="1200px" center gutters>
            <SEO
                title="COVID-19"
                description=""
                keywords=""
            />
            
            <Grid fluid>
                <Row>
                    <Visible xl>
                        <Col xl={ 4 } pull={{ xl: 1 }}
                            style={{
                                backgroundImage: `url(${covidBackgroundImage})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPositionY: '4rem',
                            }}
                        />
                    </Visible>
                    <Col xs={ 12 } xl={ 8 } pull={{ xl: 0.5 }}>
                        <Title>About BioData Catalyst COVID-19 Data</Title>
                        
                        <Paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum fuga distinctio quas praesentium a, assumenda vitae! Distinctio molestias quidem mollitia provident esse doloribus, officiis nihil expedita perspiciatis hic qui itaque quia nisi odio maxime explicabo! Ut, atque, quae nobis non, illum eveniet explicabo placeat itaque iusto sit, aliquid architecto repudiandae.
                        </Paragraph>

                        <Heading>Discover COVID-19 Datasets</Heading>
                        
                        <Paragraph center>
                            <Button light as="a" target="_blank" rel="noopener noreferrer"
                                href="https://drive.google.com/file/d/1936teBZlvBKbQf1hmdx5JImAxJFbVoIx/view?usp=sharing"
                                style={{ margin: '1rem', display: 'inline-flex', alignItems: 'center' }}
                            >
                                Study Details &nbsp;&nbsp; <DownloadIcon fill="var(--color-crimson)" size={ 24 } />
                            </Button>
                        </Paragraph>

                        <Heading>Start Working</Heading>

                        <Grid fluid>
                            <Row gutterWidth={ 40 } style={{ margin: 0 }}>
                                <Col xs={ 12 } md={ 4 } style={{ display: 'flex', justifyContent: 'center', minHeight: '150px', padding: '1rem' }}>
                                    <Button fullWidth style={{ whiteSpace: 'normal', }}>Launch COVID-19 data</Button>
                                </Col>
                                <Col xs={ 12 } md={ 4 } style={{ display: 'flex', justifyContent: 'center', minHeight: '150px', padding: '1rem' }}>
                                    <Button fullWidth style={{ whiteSpace: 'normal', }}>Learn about data access on BioData Catalyst</Button>
                                </Col>
                                <Col xs={ 12 } md={ 4 } style={{ display: 'flex', justifyContent: 'center', minHeight: '150px', padding: '1rem' }}>
                                    <Button fullWidth style={{ whiteSpace: 'normal', }}>Discover funding opportunities</Button>
                                </Col>
                            </Row>
                        </Grid>


                        <Heading>Explore Related Resources</Heading>
                        
                        <BulletedList>
                            <ListItem primary="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores!" />
                            <ListItem primary="Animi odit voluptates, similique aliquam blanditiis dolore magnam nulla!" />
                            <ListItem primary="Iure quis inventore minus quo et nobis aspernatur explicabo." />
                        </BulletedList>

                    </Col>
                </Row>
            </Grid>
        </PageContent>
    )
}

export default Covid19Page
