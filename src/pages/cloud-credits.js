import React from 'react'
import { SEO } from '../components/seo'
import { PageContent } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { ExternalLink } from '../components/link'
import { CloudCreditsForm } from '../components/form'

const CloudCreditsPage = () => (
    <PageContent width="95%" maxWidth="1200px" center gutters>
        <SEO
            title="Cloud Credits"
            description=""
            keywords=""
        />

        <Title>Cloud Credits</Title>

        <Paragraph>
            Use the form below to request additional cloud credits on the BioData Catalyst ecosystem.
            For information on completing this form,
            please see <ExternalLink to="https://bdcatalyst.freshdesk.com/support/solutions/articles/60000610275-how-much-does-it-cost-to-use-biodata-catalyst-do-you-offer-cloud-credits-">the FAQ on cloud credits</ExternalLink>.
        </Paragraph>

        <br/>

        <CloudCreditsForm />
        
    </PageContent>
)

export default CloudCreditsPage
