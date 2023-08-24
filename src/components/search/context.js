import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import axios from 'axios'
import { useCart } from '../cart'
import { useFilter} from '../filter'

//

export const DugSearchContext = createContext({ })
export const useSearch = () => useContext(DugSearchContext)

//

const PER_PAGE = 30
const SEARCH_BASE_URL = `https://search.biodatacatalyst.renci.org/search-api`

//

const requestConcepts = async ({ query, page }) => {
  const params = {
    index: 'concepts_index',
    query: query,
    offset: (page - 1) * PER_PAGE,
    size: PER_PAGE,
  }
  const response = await axios.post(`${ SEARCH_BASE_URL }/search`, params)
  if (response.status === 200 && response.data.status === 'success' && response.data.result) {
    return {
      hits: response.data.result.hits.hits,
      total_items: response.data.result.total_items,
      concept_types: response.data.result.concept_types,
    }
  }
  return null
}

const requestStudies = async ({ conceptId, query }) => {
  const params = {
    concept: conceptId,
    index: 'variables_index',
    query: query,
    size: 1000
  }
  const { data } = await axios.post(`${ SEARCH_BASE_URL }/search_var`, params)
  if (data?.result?.total_items === 0) {
    return []
  }
  // we can expect data.result to be an object shaped like:
  //   { dbgap: [studies], anvil: [studies], ... }
  // we'll transform this into an array, injecting the source into each study.
  const flattenedStudies = Object.keys(data.result).reduce((acc, source) => {
    return [
      ...acc,
      ...data.result[source].map(study => ({ ...study, source }))
    ]
  }, []).sort((s, t) => s.c_name.toLowerCase() < t.c_name.toLowerCase() ? -1 : 1)
  return flattenedStudies
}

//

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
  const cart = useCart(['concepts', 'studies', 'variables'])
  const typeFilters = useFilter([])

  // apply filters to results.
  // these are what we'll show to the user.
  const filteredResults = useMemo(() => {
    // if no filters are active...
    const activeFilters = typeFilters.active()
    if (activeFilters.length === 0) {
      // ...show all results.
      return [...results]
    }
    // otherwise, update our list, with the filtering applied.
    return [...results]
      .filter(result => activeFilters.includes(result.type))
  }, [typeFilters, results])

  // concepts relevant to what the user may be searching for.
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
    // now we'll sort by frequency,
    // returning only the first, most frequent few.
    return Object.keys(concepts)
      .sort((c, d) => concepts[c] < concepts[d] ? -1 : 1)
      .slice(0, 5)
  }, [results])

  // this function changes the params in the URL,
  // thus kicking everything off.
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
    try {
      const data = await requestConcepts({ query, page })
      if (data?.hits) {
        const hits = data.hits.map(r => ({
          ...r._source,
          explanation: r._explanation
        }))
        setPageCount(Math.ceil(data.total_items / PER_PAGE))
        const conceptTypes = [...Object.keys(data.concept_types)]
        typeFilters.update(conceptTypes)
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
  }, [results, typeFilters])

  const fetchStudies = useCallback(async (conceptId, query) => {
    setIsLoading(true)
    try {
      const studies = await requestStudies({ conceptId, query })
      if (!studies) {
        return {}
      }
      return studies
    } catch(error) {
      console.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [])


  // we do this whenever the URL parameters change.
  // for us, there's only `q`, the query.
  useEffect(() => {
    // bail out if there are no params.
    if (!location.search) {
      setQuery('')
      return
    }
    // so we have our search `query`, and we're going to search.
    // the user wants to start at the _top_ of their results, and
    // they may be re-searching with a link far down the page,
    // so let's ensure they're brought to the top of the page,
    // and get that started before we even send the request.
    // i can't seem to get a complete scroll to the top;
    //   i think it's the suddent change in document height.
    //   waiting a moment seems to do the trick.
    const scrollerTimeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)

    // we'll pull the `q` param out of the URL, and stick that into state.
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
    // note the loop caused by adding `fetchConcepts` to this dependency array:
    // there's a performance-enhancing refactor to be identitified.
    // 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <DugSearchContext.Provider value={{
      query, doSearch, isLoading,
      fetchConcepts, fetchStudies, typeFilters,
      results, filteredResults,
      pageCount, currentPage,
      selectedResult, setSelectedResult,
      relatedConcepts,
      cart,
    }}>
      { children }
    </DugSearchContext.Provider>
  )
}
