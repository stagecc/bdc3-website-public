import styled from 'styled-components'

export const Footer = styled.footer`
    background-color: var(--color-crimson);
    color: #fff;
    padding: 4rem 2rem;
    margin-top: 3rem;
    filter: drop-shadow(0 0 0.25rem rgba(0, 0, 0, 0.5));
    & a {
        color: #fff;
        text-decoration: none;
        text-decoration: underline;
    }
    position: relative;
    &::before {
        z-index: -1;
        content: "";
        clip-path: polygon(0% 5vw, 100% 0%, 100% 100%, 0% 100%);
        position: absolute;
        bottom: calc(100% - 1px);
        left: 0;
        width: 100%;
        height: calc(5vw + 2px);
        background-color: var(--color-crimson);
    }
`
