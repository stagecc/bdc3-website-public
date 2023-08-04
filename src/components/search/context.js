import React, { createContext, useContext, useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import axios from 'axios'

//

export const DugSearchContext = createContext({ })
export const useSearch = () => useContext(DugSearchContext)

const PER_PAGE = 20
const CONCEPTS_SEARCH_URL = `https://search.biodatacatalyst.renci.org/search-api/search`

const executeConceptSearch = async ({ query, offset, size }, axiosOptions) => {
  const params = {
    index: 'concepts_index',
    query,
    offset,
    size
  }
  const response = await axios.post(CONCEPTS_SEARCH_URL, params, axiosOptions)
  if (response.status === 200 && response.data.status === 'success' && response.data.result) {
    return response.data.result
  }
  return null
}

const validateResult = result => {
  return result.description.trim() && result.name.trim()
}

const validationReducer = (buckets, hit) => {
  const valid = validateResult(hit)
  if (valid) {
    return { valid: [...buckets.valid, hit], invalid: buckets.invalid }
  } else {
    return { valid: buckets.valid, invalid: [...buckets.invalid, hit] }
  }
}

export const SearchProvider = ({ children }) => {
  const location = useLocation()
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])
  const [resultCount, setResultsCount] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (!location.search) {
      setQuery('')
      return
    }
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get('q')
    const p = +searchParams.get('p') || 1
    setQuery(q)
    setCurrentPage(p)
  }, [location.search])

  useEffect(() => {
    const fetchConcepts = async () => {
      setIsLoading(true)
      // const startTime = Date.now()
      try {
        const result = await executeConceptSearch({
          query: query,
          offset: (currentPage - 1) * PER_PAGE,
          size: PER_PAGE,
        })
        if (result?.hits) {
          const unsortedHits = result.hits.hits.map(r => r._source)
          // gather invalid concepts: do rendered and dump to console.
          let hits = unsortedHits.reduce(validationReducer, { valid: [], invalid: [] })
          if (hits.invalid.length) {
            console.warn(`Omitting the following ${hits.invalid.length} invalid results:`, hits.invalid)
          }
          setResultsCount(result.total_items)
          setResults(hits.valid)
        } else {
          setResultsCount(0)
          setResults([])
        }
      } catch (error) {
        console.error(error.message)
        setResultsCount(0)
        setCurrentPage(1)
      } finally {
        setIsLoading(false)
      }
    }
    if (query) {
      fetchConcepts()
    }
  }, [query, currentPage])

  useEffect(() => {
    setPageCount(Math.ceil(resultCount / PER_PAGE))
  }, [resultCount])

  // perform the actual search
  const doSearch = (queryString, page = 1) => {
    const trimmedQuery = queryString.trim()
    if (trimmedQuery === '') {
      return
    }
    setQuery(trimmedQuery)
    navigate(`/search/?q=${ trimmedQuery }${ page > 1 ? `&p=${ page }` : `` }`)
  }

  return (
    <DugSearchContext.Provider value={{
      PER_PAGE,
      query,
      doSearch,
      isLoading,
      results,
      resultCount, pageCount, currentPage,
    }}>
      { children }
    </DugSearchContext.Provider>
  )
}
