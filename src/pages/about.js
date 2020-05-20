import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { SEO } from '../components/seo'
import styled from 'styled-components'
import { PageContent } from '../components/layout'
import { Title, Heading, Subheading, Paragraph } from '../components/typography'
import { List, ListItem } from '../components/list'
import { ExternalLink } from '../components/link'
import { Container as Grid, Row, Col, Visible } from 'react-grid-system'
import { usePartners, usePlatforms } from '../hooks'

const LogoCloud = styled.div`
    text-align: center;
    margin: 2rem 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

const PlatformImage = styled(Img)`
    margin: 2rem;
`

const AboutPage = ({ data }) => {
    const partners = usePartners()
        .sort((p,q) => p.name > q.name)
    const platforms = usePlatforms()
        .map(({ frontmatter: { title, path, logo } }) => ({ title, path, logo }))
    
    return (
        <PageContent width="95%" maxWidth="1200px" center gutters>
            <SEO
                title="About BioData Catalyst"
                description=""
                keywords=""
            />

            <Grid fluid>
                <Row>
                    <Visible lg xl>
                        <Col lg={ 3 }>
                            <List style={{ position: 'sticky', top: '16rem', paddingRight: '2rem' }} right>
                                <ListItem primary={ <AnchorLink to="/about#what-we-offer">What we Offer</AnchorLink> } />
                                <ListItem primary={ <AnchorLink to="/about#who-we-are">Who we Are</AnchorLink> } />
                                <ListItem primary={ <AnchorLink to="/about#contributing">Contribute</AnchorLink> } />
                                <ListItem primary={ <AnchorLink to="/about#data-protection">Data Protection</AnchorLink> } />
                                <ListItem primary={ <AnchorLink to="/about#citation">Citation</AnchorLink> } />
                            </List>
                        </Col>
                    </Visible>
                    <Col xs={ 12 } lg={ 9 }>
                        <Title>About BioData Catalyst</Title>
            
                        <section id="what-we-offer">
                            <Heading>What We Offer</Heading>
            
                            <Paragraph>
                                For research investigators who need to find, access, share, store, and compute on large scale datasets,
                                NHLBI BioData Catalyst serves as a cloud-based ecosystem providing tools, applications, and workflows to enable these capabilities in secure workspaces. 
                            </Paragraph>
            
                            <Paragraph>
                                NHLBI BioData Catalyst increases access to NHLBI datasets and innovative data analysis capabilities and accelerates efficient biomedical research
                                that drives discovery and scientific advancement, leading to novel diagnostic tools, therapeutic options, and prevention strategies for heart, lung, blood, and sleep disorders.
                            </Paragraph>
                        </section>
            
                        <br/>
            
                        <section id="who-we-are">
                            <Heading>Who We Are</Heading>
                            
                            <Paragraph>
                                Though the primary goal of the BioData Catalyst project is to build a data science platform, at its core, this is a people-centric endeavor.
                                BioData Catalyst is also building a community of practice working to collaboratively solve technical and scientific challenges.
                            </Paragraph>
            
                            <Paragraph>
                                The BioData Catalyst ecosystem is funded by the National Heart, Lung, and Blood Institute (NHLBI).
                                It is designed to be nimble and responsive to the ever-changing conditions of the data and biomedical science community.  
                            </Paragraph>

                            <Subheading>Partners Powering Our Ecosystem</Subheading>

                            <Paragraph>
                                Researchers and other professionals from the following institutions have received funding from NHLBI to work on the BioData Catalyst ecosystem:
                            </Paragraph>

                            <List dense>
                                { partners.map(partner => <ListItem key={ partner.name } primary={ partner.name } />) }
                            </List>

                            <Subheading>Platforms Powering Our Ecosystem</Subheading>

                            <LogoCloud>
                                {
                                    platforms.map(platform => (
                                        <Link key={ platform.title } to={ platform.path } syle={{ width: '100%' }}>
                                            <PlatformImage fixed={ platform.logo.childImageSharp.fixed } alt={ `View details about ${ platform.title.replace('-', ' ') }` } />
                                        </Link>
                                    ))
                                }
                            </LogoCloud>
                        </section>

                        <br/>
            
                        <section id="contributing">
                            <Heading>Contribute to the Ecosystem Development</Heading>
                
                            <Paragraph>
                                BioData Catalyst is a dynamic resource that will be continually developed and refined.
                                The BioData Catalyst Consortium solicits feedback on the development of significant processes, emerging standards, and decisions in two main ways:
                            </Paragraph>
                
                            <ol style={{ lineHeight: 2 }}>
                                <li>Ongoing submission and upvoting of ideas via the <ExternalLink to="https://biodatacatalyst.ideascale.com/">NHLBI BioDataCatalyst Ideascale</ExternalLink>.</li>
                                <li>Periodic Requests for Comment (RFC) solicitations.</li>
                            </ol>
                        </section>

                        <br/>

                        <section id="data-protection">
                            <Heading>Data Protection</Heading>
                            
                            <Paragraph>
                                The NHLBI BioData Catalyst ecosystem responsibly stewards access to hosted datasets,
                                requires researchers bringing their own data to respect and protect the interests of research participants,
                                and takes measures to secure the BioData Catalyst ecosystem. <Link to="/data-protection">Read more about how we do this</Link>.
                            </Paragraph>
                        </section>

                        <br/>

                        <section id="citation">
                            <Heading>How to Cite Us</Heading>
                            
                            <Paragraph>
                                If you wish to cite the BioData Catalyst ecosystem in your research, please use the following citation:
                            </Paragraph>

                            <code style={{ display: 'block', margin: 'auto', width: '90%' }}>
                                BioData Catalyst Consortium. (2020). The NHLBI BioData Catalyst. Zenodo. http://doi.org/10.5281/zenodo.3822858
                            </code>
                        </section>

                    </Col>
                </Row>
            </Grid>
        
        </PageContent>
    )
}

export default AboutPage
