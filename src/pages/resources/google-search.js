import React, { useState } from 'react'
import { SEO } from '../../components/seo'
import { PageContent } from '../../components/layout'
import { Title } from '../../components/typography'
import { GoogleSearch, SearchForm, SearchResults } from '../../components/google-search'
import { Dots as LoadingDots } from '../../components/loading'
import { Alert } from '../../components/alert'

const GoogleSearchPage = () => {
    return (
        <PageContent width="95%" maxWidth="1200px" center gutters>
            <SEO
                title="Search BioData Catalyst"
                description=""
                keywords=""
            />

            <Title>Search BioData Catalyst</Title>

            <GoogleSearch>
                <SearchForm />
                <SearchResults />
            </GoogleSearch>
            

        </PageContent>
    )
}

export default GoogleSearchPage
