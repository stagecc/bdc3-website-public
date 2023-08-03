import React from "react";
import { useSearch } from './context'

export const Results = () => {
  const { results } = useSearch()

  return (
    <div>results
    <pre>{JSON.stringify(results)}</pre></div>
  )
}