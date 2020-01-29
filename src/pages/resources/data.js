import React from 'react'
import { SEO } from '../../components/seo'
import { PageContent } from '../../components/layout'
import { Title, Paragraph } from '../../components/typography'

const DataPage = () => (
    <PageContent width="95%" maxWidth="1080px" center gutters>
        <SEO
            title="Available Data"
            description=""
            keywords=""
        />

        <Title>Data</Title>
        
        <Paragraph>
            Coming soon...
        </Paragraph>

    </PageContent>
)

export default DataPage
