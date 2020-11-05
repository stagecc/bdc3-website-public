import styled from 'styled-components'

export const InputGroup = styled.div(({ theme }) => `
  display: flex;
  & > * {
    border-radius: 0;
  }
  & > *:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  & > *:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`)
