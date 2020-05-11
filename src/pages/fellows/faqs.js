import React from 'react'
import { SEO } from '../../components/seo'
import { Link } from 'gatsby'
import { PageContent } from '../../components/layout'
import { Title, Heading, Paragraph, ErrorMessage } from '../../components/typography'
import { Card, CardHeader, CardBody } from '../../components/card'
// import { Accordion } from '../components/accordion'
import { ExternalLink } from '../../components/link'
import { Dots as LoadingDots } from '../../components/loading'
import { useFreshdesk } from '../../hooks'
import { Accordion, Panel } from '@mwatson/react-accessible-accordion'

const panelStyles = {
    body: {
        borderBottom: '1px solid #ddd',
        lineHeight: 1.5,
    }
}

const FaqPage = () => {
    const { isLoading, folders, error } = useFreshdesk('FELLOWS')

    return (
        <PageContent width="95%" maxWidth="1200px" center gutters>
            <SEO
                title="Frequently Asked Questions"
                description=""
                keywords=""
            />
        
            <Title>Fellows Program FAQs</Title>

            <Paragraph>
                This page includes collections of answers to our most Frequently Asked Questions about the BioData Catalyst Fellows Program.
                View the <Link to="/faqs">BioData Catalyst General FAQs here</Link>.
            </Paragraph>
            
            {
                // If an error occurs fetching articles, show error and route users to Freshdesk.
                error && (
                    <div>
                        <ErrorMessage center>{ error }</ErrorMessage>
                        <Paragraph center>
                            View our FAQs directly at <ExternalLink to="https://bdcatalyst.freshdesk.com">bdcatalyst.freshdesk.com</ExternalLink>.
                        </Paragraph>
                    </div>
                )
            }
            
            {
                // Show loading animation while waiting for articles.
                isLoading && <LoadingDots color="var(--color-crimson)" text="Loading..." textPlacement="top" />
            }

            {
                // If loading articles is complete, render them.
                !isLoading && folders.map(folder => {
                    return (
                        <Card key={ folder.id }>
                            <CardHeader>{ folder.name }</CardHeader>
                            <CardBody>
                                <Paragraph noMargin>{ folder.description }</Paragraph>
                            </CardBody>
                            {
                                folder.articles ? (
                                    <CardBody style={{ padding: '1rem 0' }}>
                                        <Accordion>
                                            {
                                                folder.articles.map(article => (
                                                    <Panel key={ article.title } title={ article.title } id={ article.title } styles={ panelStyles }>
                                                        <div dangerouslySetInnerHTML={{ __html: article.description }} />
                                                    </Panel>
                                                ))
                                            }
                                        </Accordion>
                                    </CardBody>
                                ) : <CardBody>Loading...</CardBody>
                            }
                        </Card>
                    )
                })
            }
            
            <Heading>Still have questions?</Heading>

            <Paragraph>
                If unanswered questions remain, view our complete <ExternalLink to="https://bdcatalyst.freshdesk.com/">Knowledge Base</ExternalLink> or submit a <Link to="/contact">help request</Link> to receive assistance.
                Questions regarding the Fellows Program may be directed to the NHLBI BioData Catalyst Help Desk and by selecting the Fellows Program type from the contact form.
            </Paragraph>

        </PageContent>
    )
}

export default FaqPage
