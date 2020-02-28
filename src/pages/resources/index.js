import React from 'react'
import { Link } from 'gatsby'
import { SEO } from '../../components/seo'
import { PageContent } from '../../components/layout'
import { Title } from '../../components/typography'

const ResourcesPage = () => (
    <PageContent width="95%" maxWidth="1200px" center gutters>
        <SEO
            title="Available Resources"
            description=""
            keywords=""
        />

        <Title>Resources</Title>
    
        <Link to="/resources/data">Data</Link>

        <br/><br/>

        <Link to="/resources/tools">Tools</Link>

        <br/><br/>

        <Link to="/resources/training">Training</Link>

    </PageContent>
)

export default ResourcesPage
