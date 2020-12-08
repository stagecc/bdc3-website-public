import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const GOOGLE_SEARCH_URL = `https://customsearch.googleapis.com/customsearch/v1`
const GOOGLE_SEARCH_API_KEY = process.env.GATSBY_GOOGLE_SEARCH_API_KEY
const GOOGLE_SEARCH_ID = process.env.GATSBY_GOOGLE_SEARCH_ID

//

export const SearchContext = createContext({})

export const useDocSearch = () => useContext(SearchContext)

//

export const DocSearch = ({ children }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const handleChangeQuery = event => setQuery(event.target.value)

  const handleGoToFirstPage = () => setCurrentPage(1)
  const handleGoToPreviousPage = () => setCurrentPage(Math.max(0, currentPage - 1))
  const handleGoToPage = pageNumber => event => setCurrentPage(pageNumber)
  const handleGoToNextPage = () => setCurrentPage(Math.min(pageCount, currentPage + 1))
  const handleGoToLastPage = () => setCurrentPage(pageCount)

  const doSearch = (pageNumber = 1) => {
    const startIndex = (pageNumber - 1) * 10 + 1
    const fetchResults = async () => {
      setLoading(true)
      try {
        const params = {
          key: GOOGLE_SEARCH_API_KEY,
          cx: GOOGLE_SEARCH_ID,
          q: query,
          start: startIndex,
        }
        const response = await axios.get(GOOGLE_SEARCH_URL, { params })
        if (response.status === 200 && response.data.items) {
          console.log(response.data)
          setResults(response.data.items)
          setTotalResults(response.data.searchInformation.totalResults)
          setPageCount(Math.ceil(response.data.searchInformation.totalResults / 10))
        } else {
          setError(error)
        }
        setLoading(false)
      } catch (error) {
        setError({ message: 'An error occurred!' })
        setLoading(false)
      }
    }
    fetchResults()
  }

  useEffect(() => {
    doSearch(currentPage)
  }, [currentPage])

  return (
    <SearchContext.Provider value={{
      handleChangeQuery, doSearch,
      results, totalResults,
      pageCount, currentPage,
      handleGoToNextPage, handleGoToPreviousPage, handleGoToPage, handleGoToFirstPage, handleGoToLastPage,
      error, loading,
    }}>
      { children }
    </SearchContext.Provider>
  )
}

