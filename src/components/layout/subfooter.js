import styled from 'styled-components'

export const Subfooter = styled.footer`
    background-color: #222;
    color: #999;
    padding: 2rem;
    filter: drop-shadow(0 0 0.25rem rgba(0, 0, 0, 0.5));
    display: flex;
    flex-direction: ${ props => props.compact ? 'column' : 'row' };
    justify-content: space-around;
    align-items: center;
    & a {
        color: #fff;
        text-decoration: none;
        text-decoration: underline;
        padding: 1rem;
    }
`
