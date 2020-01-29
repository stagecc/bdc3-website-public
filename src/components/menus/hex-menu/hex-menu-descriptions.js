import styled from 'styled-components'
import { Heading } from '../../typography'

export const MenuItemDescription = styled(Heading)`
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 1rem 0 0;
    margin: 0;
    font-size: 220%;
    color: var(--color-crimson);
    font-weight: 600;
    ${
        props => props.active ? `
            transition: transform 250ms ease-out 100ms, opacity 250ms;
            opacity: 1;
            transform: scale(1);
        ` : `
            transition: transform 500ms, opacity 500ms;
            opacity: 0;
            transform: scale(0.90);
        `
    }
`
