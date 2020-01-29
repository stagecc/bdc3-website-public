import React from 'react'
import { PageContent } from '../components/layout'
import { SEO } from '../components/seo'

const NotFoundPage = () => (
    <PageContent width="95%" maxWidth="1080px" center gutters>
        <SEO title="404: Not found" />
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </PageContent>
)

export default NotFoundPage
