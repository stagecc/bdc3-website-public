import styled from 'styled-components'

export const Header = styled.header(({ squish }) => `
    background-color: #fff;
    color: #333;
    padding: 0;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    transition: min-height 250ms;
    min-height: ${ squish ? '4rem' : '6rem' };
`)
