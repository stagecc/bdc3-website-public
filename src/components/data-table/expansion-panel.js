import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 1rem;
  background-color: #eee;
`

export const ExpansionPanel = ({ columns, data }) => (
  <Wrapper>
    {
      columns.map(column => (
        <div>
          <strong>{ column.name }</strong>: { data[column.selector] }
        </div>
      ))
    }
  </Wrapper>
)
