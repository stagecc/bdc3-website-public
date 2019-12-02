import styled from 'styled-components'

export const Input = styled.input`
    background-color: #ccc;
    height: 3rem;
    border-radius: 1.5rem;
    border: 0;
    padding: 1rem;
    line-height: 1.5rem;
    color: #777;
    &::placeholder {
        text-transform: uppercase;
    }
    font-weight: bold;
`