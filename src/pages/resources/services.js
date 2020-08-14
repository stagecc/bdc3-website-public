import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { SEO } from '../../components/seo'
import { PageContent } from '../../components/layout'
import { Title, Heading, Paragraph } from '../../components/typography'
import { Container as Grid, Row, Col, Visible } from 'react-grid-system'
import { Card, CardHeader, CardBody } from '../../components/card'
import { ExternalLink } from '../../components/link'
import { usePlatforms } from '../../hooks'

const ToolLinks = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 0 0 2rem 0;
`

const InternalToolLink = styled(Link)`
    margin: 0 0.5rem;
`

const ExternalToolLink = styled(ExternalLink)`
    margin: 0 0.5rem;
    white-space: nowrap;
`

const Separator = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    ${ props => props.horizontal && `margin: 1rem 0;` }
    &::after {
        content: "";
        position: absolute;
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        opacity: 0.25;
        ${
            props => props.horizontal && `
                top: 0%;
                height: 1px;
                width: 80%;
                border-image: linear-gradient(to right, transparent 0%, var(--color-crimson) 15% 85%, transparent 100%) 1 1;
            `
        }
        ${
            props => props.vertical && `
                top: 50%;
                height: 80%;
                width: 1px;
                border-image: linear-gradient(to top, transparent 0%, var(--color-crimson) 15% 85%, transparent 100%) 1 1;
            `
        }
        left: 50%;
        transform: translate(-50%, -50%);
    }
`

const ServicesPage = ({ data }) => {
    const platforms = usePlatforms()
    
    const services = [
        {
            cardTitle: 'Explore Available Data',
            cardItems: [
                platforms.find(platform => platform.frontmatter.title === 'Gen3'),
                platforms.find(platform => platform.frontmatter.title === 'PIC-SURE'),
            ]
        },
        {
            cardTitle: 'Analyze Data in Cloud-based Shared Workspaces',
            cardItems: [
                platforms.find(platform => platform.frontmatter.title === 'Seven Bridges'),
                platforms.find(platform => platform.frontmatter.title === 'Terra'),
            ]
        },
        {
            cardTitle: 'Use Community Tools on Controlled-access Datasets',
            cardItems: [
                platforms.find(platform => platform.frontmatter.title === 'Dockstore'),
                platforms.find(platform => platform.frontmatter.title === 'HeLx'),
            ]
        },
    ]

    return (
        <PageContent width="95%" maxWidth="1200px" center gutters>
            <SEO
                title="Platforms & Services"
                description=""
                keywords=""
            />

            <Title>Platforms and Services</Title>

            <section>
                <Heading>What Do You Want to Do Today?</Heading>

                {
                    services.map((service, i) => (
                        <Card key={ service.cardTitle }>
                            <CardHeader>{ service.cardTitle }</CardHeader>
                            <CardBody>
                                <Grid fluid>
                                    <Row gutterWidth={ 0 }>
                                        {
                                            service.cardItems.map((platform, i) => (
                                                <Fragment key={ i }>
                                                    <Col xs={ 12 } lg={ 5 } style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                        <h3 style={{ textAlign: 'center' }}>BioData Catalyst powered by { platform.frontmatter.title }</h3>
                                                        <Paragraph>
                                                            { platform.frontmatter.service }
                                                        </Paragraph>
                                                        <ToolLinks>
                                                            { platform.frontmatter.links.launch && <ExternalToolLink to={ platform.frontmatter.links.launch } aria-label={ `Launch ${ platform.frontmatter.title }` }>Launch</ExternalToolLink> }
                                                            { platform.frontmatter.links.launch && '|' }
                                                            { platform.frontmatter.links.documentation && <ExternalToolLink to={ platform.frontmatter.links.documentation }aria-label={ `View ${ platform.frontmatter.title } documentation` }>Documentation</ExternalToolLink> }
                                                            { platform.frontmatter.links.documentation && '|' }
                                                            <InternalToolLink to={ platform.frontmatter.path } aria-label={ `Learn more about ${ platform.frontmatter.title }` }>Learn</InternalToolLink>
                                                        </ToolLinks>
                                                    </Col>
                                                    {
                                                        i + 1 < service.cardItems.length && (
                                                            <Fragment>
                                                                <Visible lg xl>
                                                                    <Col md={ 2 }>
                                                                        <Separator vertical />
                                                                    </Col>
                                                                </Visible>
                                                                <Visible xs sm md>
                                                                    <Col xs={ 12 }>
                                                                        <Separator horizontal />
                                                                    </Col>
                                                                </Visible>                                                
                                                            </Fragment>
                                                        )
                                                    }
                                                </Fragment>
                                            ))
                                        }
                                    </Row>
                                </Grid>
                            </CardBody>
                        </Card>
                    ))
                }
            </section>

            <section>
                <Heading>Imputation Server</Heading>
                <Card>
                    <CardHeader>Access the Imputation Server</CardHeader>
                    <CardBody>
                        <h3 style={{ textAlign: 'center' }}> Imputation Server developed by the University of Michigan</h3>
                        <Paragraph>
                            Upload your own phased or unphased GWAS genotypes to the server and receive phased and imputed genomes in return.
                            The server offers imputation from various reference panels including the TOPMed reference panel. 
                        </Paragraph>
                        <ToolLinks>
                            <ExternalToolLink to="https://imputation.biodatacatalyst.nhlbi.nih.gov/" aria-label="Launch imputation server">Launch</ExternalToolLink>
                            |
                            <ExternalToolLink to="https://imputationserver.readthedocs.io/en/latest/" aria-label="View imputation server documentation">Documentation</ExternalToolLink>
                        </ToolLinks>
                    </CardBody>
                </Card>
            </section>
            
        </PageContent>
    )
}

export default ServicesPage
