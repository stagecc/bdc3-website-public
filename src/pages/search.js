import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SEO } from '../components/seo'
import { PageContent } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import algoliasearch from 'algoliasearch/lite'
import { Highlight, Hits, InstantSearch, RefinementList, SearchBox } from 'react-instantsearch-dom'

const searchClient = algoliasearch(
    'latency', // sppilication ID
    '6be0576ff61c053d5f9a3225e2a90f76' // API key
)

const Wrapper = styled.div`
    // border: 1px solid #f99; * { border: 1px solid #f99; }
    display: flex;

`

const SearchFilters = styled.div`
    min-width: 12rem;
    margin-top: 4rem;
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
`

const SearchResults = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
`

const SearchFormContainer = styled(SearchBox)`
    margin-bottom: 2rem;
    & form {
        display: flex;
        & input {
            flex: 1;
            height: 2rem;
        }
        & button {
            float: right;
        }
    }
`

const Hit = props => {
    return (
        <article>
            <h2><Highlight attribute="name" hit={props.hit} /></h2>
            <p><Highlight attribute="description" hit={props.hit} /></p>
        </article>
    );
}

Hit.propTypes = {
    hit: PropTypes.object.isRequired,
}


const SearchPage = () => {
    return (
        <PageContent width="95%" maxWidth="1200px" center gutters>
            <SEO
                title="DocSearch"
                description=""
                keywords=""
            />

            <Title>DocSearch</Title>

            <Paragraph>
                This is a sample using an example from the Algolia docs to verify things work as expected. They do. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati dicta velit natus non saepe sint? Corporis provident, neque, eum corrupti laboriosam quisquam enim dolorum molestias ducimus quos sed. Numquam a, id consequatur laudantium unde!
            </Paragraph>

            <InstantSearch searchClient={searchClient} indexName="instant_search">
                <Wrapper>
                    <SearchFilters>
                        <RefinementList attribute="brand" />
                    </SearchFilters>
                    <SearchResults>
                        <SearchFormContainer />
                        <Hits hitComponent={ Hit } />
                    </SearchResults>
                </Wrapper>
            </InstantSearch>

        </PageContent>
    )
}

export default SearchPage
