import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Container as Grid, Row, Col, Visible } from 'react-grid-system'
import { Header, Brand, Main, Footer, Container, StickyWrapper, LineBreak } from '../components/layout'
import { Heading, Paragraph } from '../components/typography'
import { Menu, MobileMenu } from '../components/menus'
import { menuItems } from '../data/menu'
import { List, ListItem } from '../components/list'
import { useWindowWidth } from '../hooks'
import hexBackgroundLeftSvg from '../images/hex-background-left.svg'
import hexBackgroundRightSvg from '../images/hex-background-right.svg'
import { Button } from '../components/buttons'
import { ExternalLink } from '../components/link'

import '../styles/normalize.css'
import '../styles/customize.css'

const LayoutWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    &::after {
        content: "";
        left: 0;
        top: 0;
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: -2;
        ${
            props => props.compact
            ? `
                background-image: url(${ hexBackgroundLeftSvg });
                background-position: -4rem 0;
                background-size: 400px;
                background-repeat: repeat-y;
                background-attachment: fixed;
            `
            : `
                background-image: url(${ hexBackgroundLeftSvg }), url(${ hexBackgroundRightSvg });
                background-position: -4rem 0, calc(100% + 4rem) 0;
                background-size: 400px, 400px;
                background-repeat: repeat-y, repeat-y;
                background-attachment: fixed;
            `
        }
    }
`

export const DefaultLayout = ({ children }) => {
    const { isCompact } = useWindowWidth()

    // useEffect(() => {
    //     setStuckHeader(scrollPosition > toolbarElement.current.getBoundingClientRect().height)
    // }, [scrollPosition])

    return typeof isCompact === 'boolean' && (
        <LayoutWrapper compact={ isCompact }>
            <StickyWrapper stuck={ true }>
                <Header>
                    <Brand width="380px" style={{ padding: '0 1rem', transition: 'transform 250ms', transform: `translateX(${ isCompact ? '-34%' : '0' })` }} />
                    <Visible xs sm md>
                        <MobileMenu items={ menuItems } />
                    </Visible>
                    <Visible lg xl>
                        <Menu items={ menuItems } />
                    </Visible>
                </Header>
            </StickyWrapper>
            <Main>
                { children }
            </Main>
            <Footer>
                <Container width="95%" maxWidth="1080px" center>
                    <Grid fluid>
                        <Row>
                            <Col xs={ 12 } md={ 5 } push={{ md: 7 }}>
                                <List dense center={ isCompact } right={ !isCompact }>
                                    <ListItem primary={ <Link to="/faqs">FAQs</Link> } />
                                    <ListItem primary={ <ExternalLink to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/">Documentation</ExternalLink> } />
                                    <ListItem primary={ <Link to="/legal">Legal</Link> } />
                                    <ListItem primary={ <Link to="/resources/learn">Support</Link> } />
                                    <ListItem primary={ <Link to="/contact">Contact</Link> } />
                                </List>
                            </Col>
                            <Col xs={ 12 } md={ 7 } pull={{ md: 5 }}>
                                <Paragraph center={ isCompact } left={ !isCompact }>
                                    BioData Catalyst is a product of the National Heart, Lung, and Blood Institute of the National Institutes of Health.
                                    <LineBreak count={ 2 } />
                                    For general inquiries, email [NHLBI email redirects to <a href="mailto:bdc3@renci.org">bdc3@renci.org</a>].
                                    <LineBreak count={ 2 } />
                                    &copy; { new Date().getFullYear() }
                                </Paragraph>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={ 12 } style={{ textAlign: 'center' }}>
                                <Heading center light noMargin>Consortium Members</Heading> <br/>
                                <Button light><strong>Login</strong></Button>
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
