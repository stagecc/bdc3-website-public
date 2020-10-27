import React, { createContext, useState } from 'react'
import axios from 'axios'

const GOOGLE_SEARCH_API_KEY = process.env.GATSBY_GOOGLE_SEARCH_API_KEY
const GOOGLE_SEARCH_URL = `https://customsearch.googleapis.com/customsearch/v1`

export const SearchContext = createContext({})

export const GoogleSearch = ({ children }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const handleChangeQuery = event => setQuery(event.target.value)

  const doSearch = (pageNumber = 1) => {
    const startIndex = (pageNumber - 1) * 10 + 1
    const fetchResults = async () => {
      setLoading(true)
      try {
        const params = {
          key: GOOGLE_SEARCH_API_KEY,
          cx: 'f67468621577c356b',
          q: query,
          start: startIndex,
        }
        const response = await axios.get(GOOGLE_SEARCH_URL, { params })
        if (response.status === 200 && response.data.items) {
          setResults(response.data.items)
          setTotalResults(response.data.searchInformation.totalResults)
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

  return (
    <SearchContext.Provider value={{ handleChangeQuery, doSearch, results, totalResults, pageCount, currentPage, error, loading }}>
      { children }
    </SearchContext.Provider>
  )
}
