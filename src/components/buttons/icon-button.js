import styled from 'styled-components'

export const IconButton = styled.button`
    background-color: transparent;
    border: 0;
    padding: 0.5rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: filter 250ms;
    &:hover, &:focus {
        filter: brightness(1.2);
    }
`
