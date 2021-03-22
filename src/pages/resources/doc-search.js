import React from 'react'
import { SEO } from '../../components/seo'
import { PageContent } from '../../components/layout'
import { Title } from '../../components/typography'
import { DocSearch, SavedDocs, SearchForm, SearchResults } from '../../components/doc-search'

const DocSearchPage = () => {
  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO
        title="Search BioData Catalyst"
        description=""
        keywords=""
      />

      <Title style={{ flex: 1 }}>BioData Catalyst Documentation Search</Title>
      
      <DocSearch>
      
        <br/><br/>
        
        <SearchForm />

        <br/><br/><br/>

        <SearchResults />

        <br/><br/><br/>
        
      </DocSearch>
      

    </PageContent>
  )
}

export default DocSearchPage
