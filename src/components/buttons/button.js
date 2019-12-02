import styled from 'styled-components'

export const Button = styled.button`
    background-color: ${ props => props.light ? '#fff' : 'var(--color-crimson)' };
    border-radius: 1rem;
    border: ${ props => props.light ? '2px solid var(--color-crimson)' : '0' };
    color: ${ props => props.light ? 'var(--color-crimson)' : '#fff' };
    padding: 0.5rem 1rem;
    text-transform: uppercase;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    // possibly extend to allow fullWidth prop?
    // display: flex;
    // justify-content: center;
    // align-items: center;
`
