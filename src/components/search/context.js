import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import axios from 'axios'

//

export const DugSearchContext = createContext({ })
export const useSearch = () => useContext(DugSearchContext)

const PER_PAGE = 25
const CONCEPTS_SEARCH_URL = `https://search.biodatacatalyst.renci.org/search-api/search`

const requestConcepts = async ({ query, page }) => {
  const params = {
    index: 'concepts_index',
    query: query,
    offset: (page - 1) * PER_PAGE,
    size: PER_PAGE,
  }
  const response = await axios.post(CONCEPTS_SEARCH_URL, params)
  if (response.status === 200 && response.data.status === 'success' && response.data.result) {
    return response.data.result
  }
  return null
}

export const SearchProvider = ({ children }) => {
  // the entire search flow is kicked off and determined by the location object,
  // specifically the `q`` search parameter.
  const location = useLocation()
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedResult, setSelectedResult] = useState(null)

  const relatedConcepts = useMemo(() => {
    // this is a naive ranking. improvement needed.
    // we'll record how many times each of results'
    // `identifiers` appears across all results.
    const concepts = results.reduce((acc, result) => {
      result.identifiers.forEach(({ label }) => {
        if (label in acc) {
          acc[label] += 1
        } else {
          acc[label] = 1
        }
      })
      return { ...acc }
    }, {})
    return Object.keys(concepts)
      // now we'll sort by frequency...
      .sort((c, d) => concepts[c] < concepts[d] ? -1 : 1)
      // ...only returning the first, most frequent few.
      .slice(0, 5)
  }, [results])

  const doSearch = (queryString, page = 1) => {
    const trimmedQuery = queryString.trim()
    if (trimmedQuery === '') {
      return
    }
    setQuery(trimmedQuery)
    navigate(`/search/?q=${ trimmedQuery }`)
  }

  const fetchConcepts = useCallback(async (query, page = 1) => {
    setIsLoading(true)
    setCurrentPage(page)
    // const startTime = Date.now()
    try {
      const result = await requestConcepts({ query, page })
      if (result?.hits) {
        const hits = result.hits.hits.map(r => r._source)
        setPageCount(Math.ceil(result.total_items / PER_PAGE))
        if (page === 1) {
          setResults(hits)
        } else {
          setResults([...results, ...hits])
        }
      } else {
        setPageCount(0)
      }
    } catch (error) {
      console.error(error.message)
      setPageCount(0)
      setCurrentPage(1)
    } finally {
      setIsLoading(false)
    }
  }, [results])

  useEffect(() => {
    // bail out if no search term
    if (!location.search) {
      setQuery('')
      return
    }
    // the user wants to start at the _top_ of their results, and
    // they may be re-searching with a link far down the page,
    // so let's ensure they're brought to the top of the page.
    // i can't seem to get a complete scroll to the top;
    // i think it's the suddent change in document height.
    // waiting a moment seems to do the trick.
    const scrollerTimeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)

    const searchParams = new URLSearchParams(location.search)
    const q = searchParams.get('q')
    setQuery(q)
    // cleanup
    return () => clearTimeout(scrollerTimeout)
  }, [location.search])

  useEffect(() => {
    if (query === '') {
      return
    }
    setResults([])
    fetchConcepts(query)
  }, [query])

  return (
    <DugSearchContext.Provider value={{
      PER_PAGE, query,
      doSearch, fetchConcepts, isLoading,
      results, pageCount, currentPage,
      selectedResult, setSelectedResult,
      relatedConcepts,
    }}>
      { children }
    </DugSearchContext.Provider>
  )
}
