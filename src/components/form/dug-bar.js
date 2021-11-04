import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { DugForm } from './'
import { Button } from '../buttons'
import { ChevronDownIcon, CloseIcon } from '../icons'

const Wrapper = styled.div`
  position: relative;
  padding: 0;
  margin: 0;
  background-color: var(--color-blueberry);
  display: flex;
  &&& input {
    border: 0;
    border-radius: 0;
    background-color: #000000aa;
    color: #eee;
    font-size: 85%;
    min-height: 1rem;
    transition: min-height 250ms, background-color 250ms, font-size 300ms;
    padding: 0.25rem 1rem;
    text-align: center;
  }
  & button {
    background-color: var(--color-blueberry-dark);
    min-width: 4.5rem;
  }
  &:focus-within {
    &&& input {
      flex: 1;
      padding: 1rem;
      font-size: 150%;
      min-height: 5rem;
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
