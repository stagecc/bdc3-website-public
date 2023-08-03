import React, { createContext, useContext, useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'

//

export const DugSearchContext = createContext({ })
export const useSearch = () => useContext(DugSearchContext)

export const SearchProvider = ({ children }) => {
  const location = useLocation()
  const [query, setQuery] = useState('')
  const [results, ] = useState([])

  useEffect(() => {
    if (!window.location.search) {
      setQuery('')
      return
    }
    const searchParams = new URLSearchParams(location.search);
    setQuery(searchParams.get('q'))
  }, [location.search])

  // perform the actual search
  const doSearch = queryString => {
    const trimmedQuery = queryString.trim()
    if (trimmedQuery === '') {
      return
    }
    setQuery(trimmedQuery)
    navigate(`/search/?q=${ trimmedQuery }`)
  }

  return (
    <DugSearchContext.Provider value={{ query, results, doSearch }} >
      { children }
    </DugSearchContext.Provider>
  )
}
