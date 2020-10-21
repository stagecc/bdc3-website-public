import React from 'react'
import styled from 'styled-components'
import { Result } from './result'

const Wrapper = styled.section``

export const SearchResults = ({ results, totalResults }) => {
  return (
    <Wrapper>
      { totalResults }
      {
        results.map(result => (
          <Result { ...result } />
        ))
      }
    </Wrapper>
  )
}