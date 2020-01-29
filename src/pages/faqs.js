import React from 'react'
import { SEO } from '../components/seo'
import { Link } from 'gatsby'
import { PageContent, LineBreak } from '../components/layout'
import { Title, Heading, Paragraph } from '../components/typography'
import { ExternalLink } from '../components/link'
import { List, ListItem } from '../components/list'

const FaqPage = () => {

    return (
        <PageContent width="95%" maxWidth="1080px" center gutters>
            <SEO
                title="Frequently Asked Questions"
                description=""
                keywords=""
            />
        
            <Title>Frequently Asked Questions</Title>

            <Paragraph>
                This page includes collections of answers to our most Frequently Asked Questions. 
            </Paragraph>

            <Heading>Question Groups</Heading>
            
            <List>
                <ListItem primary={ <ExternalLink to="https://freshdesk.com">Accessing Data in the NHLBI BioData Catalyst Ecosystem</ExternalLink> } />
                <ListItem primary={ <ExternalLink to="https://freshdesk.com">Applying to be an NHLBI BioData Catalyst Fellow</ExternalLink> } />
                <ListItem primary={ <ExternalLink to="https://freshdesk.com">Bucket X</ExternalLink> } />
                <ListItem primary={ <ExternalLink to="https://freshdesk.com">Bucket Y</ExternalLink> } />
            </List>

            <Heading>Still have questions?</Heading>

            <Paragraph>
                If unanswered questions remain, view our <ExternalLink to="https://bdcatalyst.freshdesk.com/">Knowledge Base</ExternalLink> or submit a <Link to="/contact">help request</Link> to receive assistance.
            </Paragraph>

            <LineBreak count={ 2 } />
        </PageContent>
    )
}

export default FaqPage
