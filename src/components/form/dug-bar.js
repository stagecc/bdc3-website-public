import React from 'react'
import styled from 'styled-components'
import { DugForm } from './'

const Wrapper = styled.div`
  position: relative;
  padding: 0;
  margin: 0;
  background-color: var(--color-blueberry);
  display: flex;
  border: solid var(--color-blueberry);
  border-width: 0 0 0.75rem 0;
  &&& input {
    border: 0;
    border-radius: 0;
    background-color: #000000aa;
    color: #eee;
    font-size: 85%;
    transition: background-color 250ms, font-size 300ms;
    padding: 0.5rem;
    text-align: center;
  }
  & button {
    background-color: var(--color-blueberry-dark);
    min-width: 4.5rem;
  }
  &:focus-within {
    &&& input {
      background-color: #000000cc;
    }
  }
`

export const DugBar = () => {
  return (
    <Wrapper>
      <DugForm compact focusOnMount style={{ width: '100%' }} />
    </Wrapper>
  )
}
