import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useLocalStorage, useWindowWidth } from '../../hooks'

const GOOGLE_SEARCH_URL = `https://customsearch.googleapis.com/customsearch/v1`
const GOOGLE_SEARCH_API_KEY = process.env.GATSBY_GOOGLE_SEARCH_API_KEY
const GOOGLE_SEARCH_ID = process.env.GATSBY_GOOGLE_SEARCH_ID

const PAGINATION_RADIUS = {
  mobile: 1,
  desktop: 2,
}

//

export const SearchContext = createContext({})

export const useDocSearch = () => useContext(SearchContext)

//

export const DocSearch = ({ children }) => {
  const { isCompact } = useWindowWidth()
  const [query, setQuery] = useState('')
  const [searchedQuery, setSearchedQuery] = useState('')
  const [results, setResults] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [paginationRadius, setPaginationRadius] = useState(PAGINATION_RADIUS.mobile)
  const [savedResults, setSavedResults] = useState([])

  useEffect(() => {
    setPaginationRadius(isCompact ? PAGINATION_RADIUS.mobile : PAGINATION_RADIUS.desktop)
  }, [isCompact])

  const handleChangeQuery = event => setQuery(event.target.value)

  const handleGoToFirstPage = () => doSearch(1)
  const handleGoToPreviousPage = () => doSearch(Math.max(0, currentPage - 1))
  const handleGoToPage = pageNumber => event => doSearch(pageNumber)
  const handleGoToNextPage = () => doSearch(Math.min(pageCount, currentPage + 1))
  const handleGoToLastPage = () => doSearch(pageCount)

  useEffect(() => {
    console.log('---')
    console.log('(search-context) saved results:', savedResults.map(r => r.cacheId).join(', '))
    console.log('---')
  }, [savedResults])

  const saveResult = newResult => {
    console.log('saving result', newResult.cacheId)
    const newResults = new Set([...savedResults, newResult])
    console.log(newResults)
    setSavedResults([...newResults])
  }

  const removeResult = resultToRemove => {
    console.log('removing result', resultToRemove.cacheId)
    const newResults = savedResults.filter(savedResult => savedResult.cacheId !== resultToRemove.cacheId)
    setSavedResults([...newResults])
  }

  const clearSavedResults = () => {
    console.log('clearing results')
    setSavedResults([])
  }

  const doSearch = (pageNumber = 1) => {
    const startIndex = (pageNumber - 1) * 10 + 1
    const fetchResults = async () => {
      setLoading(true)
      setError(null)
      setSearchedQuery(query.trim())
      try {
        const params = {
          key: GOOGLE_SEARCH_API_KEY,
          cx: GOOGLE_SEARCH_ID,
          q: query,
          start: startIndex,
        }
        const response = await axios.get(GOOGLE_SEARCH_URL, { params })
        if (response.status === 200) {
          if (response.data.items) {
            setCurrentPage(pageNumber)
            setResults(response.data.items)
            setTotalResults(response.data.searchInformation.totalResults)
            setPageCount(Math.ceil(response.data.searchInformation.totalResults / 10))
          } else {
            setResults([])
            setTotalResults(0)
            setCurrentPage(0)
            setPageCount(0)
          }
        } else {
          setError({ message: 'An error occurred!' })
        }
        setLoading(false)
      } catch (error) {
        setError({ message: 'An error occurred!' })
        console.log(error)
        setLoading(false)
      }
    }
    fetchResults()
  }

  // useEffect(() => {
  //   if (searchedQuery) {
  //     doSearch(currentPage)
  //   }
  // }, [currentPage])

  return (
    <SearchContext.Provider value={{
      searchedQuery, handleChangeQuery, doSearch,
      error, loading,
      results, totalResults,
      pageCount, currentPage, paginationRadius,
      handleGoToNextPage, handleGoToPreviousPage, handleGoToPage, handleGoToFirstPage, handleGoToLastPage,
      savedResults, saveResult, removeResult, clearSavedResults,
    }}>
      { children }
    </SearchContext.Provider>
  )
}

