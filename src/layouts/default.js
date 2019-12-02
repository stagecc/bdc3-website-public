import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import { useStaticQuery, graphql } from 'gatsby'
import { Container as Grid, Row, Col } from 'react-grid-system'
import { Toolbar, Header, Brand, Main, Footer, Container, StickyWrapper } from '../components/layout'
import { ExternalButtonLink } from '../components/buttons'
import { Paragraph } from '../components/typography'
import { Menu, MobileMenu } from '../components/menu'
import { menuItems } from '../data/menu'
import { List, ListItem } from '../components/list'
import { useScrollPosition, useWindowWidth } from '../hooks'
import githubLogo from '../images/icons/github-logo.png'
import twitterLogo from '../images/icons/twitter-logo.png'

import '../styles/normalize.css'
import '../styles/customize.css'

const nhlbiHhsLogoQuery = graphql`
    query {
        logo: allFile(filter: {relativePath: {eq: "nhlbi-hhs-logo.png"}}) {
            edges {
                node {
                    childImageSharp {
                        fluid(maxWidth: 353, maxHeight: 100) {
                            base64
                            tracedSVG
                            aspectRatio
                            src
                            srcSet
                            srcWebp
                            srcSetWebp
                            sizes
                            originalImg
                            originalName
                            presentationWidth
                            presentationHeight
                        }
                    }
                }
            }
        }
    }
`

const LayoutWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`

const SocialLinks = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const SocialIcon = styled.img`
    margin: 0 0.5rem;
    padding: 0;
    transition: filter 250ms;
    filter: opacity(0.5);
    &:hover {
        filter: opacity(1.0);
    }
`

export const DefaultLayout = ({ children }) => {
    const data = useStaticQuery(nhlbiHhsLogoQuery)
    const nhlbiHhsLogo = data.logo.edges[0].node.childImageSharp.fluid
    const { isCompact } = useWindowWidth()
    const toolbarElement = useRef(null)
    const scrollPosition = useScrollPosition()
    const [stuckHeader, setStuckHeader] = useState(false)

    useEffect(() => {
        setStuckHeader(scrollPosition > toolbarElement.current.getBoundingClientRect().height)
    }, [scrollPosition])

    return (
        <LayoutWrapper>
            <Toolbar ref={ toolbarElement }>
                <SocialLinks>
                    <a href="tbd" target="_blank" rel="noopener noreferrer"><SocialIcon src={ githubLogo } alt="GitHub Octocat Logo" /></a> &nbsp;&nbsp;
                </SocialLinks>

                <ExternalButtonLink href="https://nhlbidatastage.org/Security/login">Members Area</ExternalButtonLink>
            </Toolbar>
            <StickyWrapper stuck={ stuckHeader }>
                <Header>
                    <Brand height="100%" />
                    { isCompact ? <MobileMenu items={ menuItems } /> : <Menu items={ menuItems } /> }
                </Header>
            </StickyWrapper>
            <Main>
                { children }
            </Main>
            <Footer>
                <Container width="95%" maxWidth="1080px" center>
                    <Grid fluid>
                        <Row>
                            <Col xs={ 12 } lg={ 6 }>
                                <Paragraph center={ isCompact } left={ !isCompact }>
                                    Supported by the National Heart, Lung, and Blood Institute of the National Institutes of Health.
                                    <br/><br/>
                                    For general inquiries, contact <a href="mailto:bdc3@renci.org">bdc3@renci.org</a>.
                                </Paragraph>
                            </Col>
                            <Col xs={ 12 } lg={ 6 }>
                                <List right>
                                    <ListItem primary={ <Link to="/faq">FAQs</Link> } />
                                    <ListItem primary={ <Link to="/docs">Documents</Link> } />
                                    <ListItem primary={ <Link to="/support">Support</Link> } />
                                    <ListItem primary={ <Link to="/legal">Legal</Link> } />
                                </List>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={ 12 }>
                                <a href="https://www.nhlbi.nih.gov/" aria-label="Visit the NIH NHLBI website" target="_blank" rel="noreferrer noopener">
                                    <Img fluid={ nhlbiHhsLogo } style={{ maxWidth: '353px', height: 'auto', margin: '2rem auto' }}/>
                                </a>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={ 12 }>
                                <Paragraph center>
                                    &copy; { new Date().getFullYear() }
                                </Paragraph>
                            </Col>
                        </Row>
                    </Grid>
                </Container>
            </Footer>
        </LayoutWrapper>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
}
