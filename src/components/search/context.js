import React, { createContext, useContext, useState } from 'react'

export const DugSearchContext = createContext({ })
export const useDug = () => useContext(DugSearchContext)

export const DugProvider = ({ children }) => {
  const [query, setQuery] = useState('')

  return (
    <DugSearchContext value={{ query }} >
      { children }
    </DugSearchContext>
  )
}
