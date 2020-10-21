import React, { useContext } from 'react'
import { GoogleSearch } from './search-context'

export const useGoogleSearch = () => useContext(GoogleSearch)