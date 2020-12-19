import React from 'react'
import styled from 'styled-components'

//

const Wrapper = styled.div(({ color }) => `
  font-size: 90%;
  background-color: #fff;
  display: flex;
  border-radius: 3px;
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.2));
  border-width: 0 0 0 1rem;
  border-style: solid;
  border-color: ${ color };
  overflow: hidden;
`)

const Details = styled.div`
  flex: 1;
  text-align: left;
  & .grouping {
    padding: 0.25rem 1rem 0.25rem 0.5rem;
    font-size: 66%;
    background-color: #eee;
    color: #666;
  }
  & .label {
    padding: 0.5rem 0.5rem 0.1rem 0.5rem;
    font-weight: bold;
  }
  & .value {
    padding: 0.1rem 0.5rem 0.5rem 0.5rem;
  }
`

export const ChartTooltip = ({ datum, grouping }) => {
  const { label, value, color } = datum
  return (
    <Wrapper color={ color }>
      <Details>
        <div className="grouping">{ grouping }</div>
        <div className="label">{ label }</div>
        <div className="value">{ value } { value === 1 ? 'study' : 'studies' }</div>
      </Details>
    </Wrapper>
  )
}