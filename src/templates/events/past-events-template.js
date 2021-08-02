import React from 'react'
import { AnimateOnMount } from '../../components/anim'
import { graphql, Link } from 'gatsby'
import { SEO } from '../../components/seo'
import { Title, Paragraph, Meta } from '../../components/typography'
import { ButtonLink } from '../../components/button'
import { Container as Grid, Row, Col } from 'react-grid-system'
import { Module } from '../../components/layout'

const EventsList = ({ title, events }) => {
    return (
        <Module title={ title }>
            <Grid fluid>
                {
                    events.length
                        ? events.map(event => {
                            const { title, path, date, display_date, fabricHosted } = event.node.frontmatter
                            return (
                                <Row key={ title }>
                                    <Col xs={ 12 } sm={ 3 }>
                                        <Meta>{ display_date ? display_date : date }</Meta>
                                    </Col>
                                    <Col xs={ 12 } sm={ 9 }>
                                        <h5 style={{ lineHeight: 1.5 }}>
                                            <Link to={ path }>{ title }</Link>
                                            { fabricHosted ? '*' : null }
                                        </h5>
                                    </Col>
                                </Row>
                            )
                        })
                    : <Paragraph center>There are no events to display at the moment. Please check back soon!</Paragraph>
            }
            { events.length ? <Meta right><strong>*</strong> FABRIC-hosted event</Meta> : null }
            </Grid>
        </Module>
    )
}

export default ({ data, pageContext }) => {
    const events = data.events.edges

    return (
        <AnimateOnMount>
            <SEO
                title="Past FABRIC Events"
                description="Read about upcoming events that are related to FABRIC and the FABRIC team, inclusing conferences, workshops, and meet-ups."
                keywords={ ["events", "conferences", "meet-ups", "workshops", "presentations", "hackathon"] }
            />
            <SEO title="Events" />
            
            <Title>Event Archive</Title>

            <Module>
                <Paragraph>
                    These are all past events in which the FABRIC team has been involved.
                </Paragraph>
                <EventsList events={ events } />
            </Module>

            <Paragraph center>
                <ButtonLink primary={ true } to="/events">View our upcoming events</ButtonLink>
            </Paragraph>

        </AnimateOnMount>
    )
}

export const allEventsQuery = graphql`
    query($todaysDate: Date!) {
        events:allMarkdownRemark(
            sort: {fields: frontmatter___date, order: DESC},
            filter: {
                fileAbsolutePath: {regex: "/events/"},
                frontmatter: {
                    date: {lt: $todaysDate}
                }
            }
        ) {
            edges {
                node {
                    frontmatter {
                        date(formatString: "MMM D, YYYY")
                        display_date
                        path
                        title
                        tags
                        fabricHosted
                    }
                }
            }
        }
    }
`