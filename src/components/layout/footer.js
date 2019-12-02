import styled from 'styled-components'

export const Footer = styled.footer`
    background-color: #fff;
    color: #333;
    padding: 2rem;
    filter: drop-shadow(0 0 0.25rem rgba(0, 0, 0, 0.5));
    & a {
        color: var(--color-crimson);
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`
