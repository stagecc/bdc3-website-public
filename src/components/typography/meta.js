import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Paragraph } from './paragraph'

export const Meta = styled(Paragraph)`
    margin-bottom: 1rem;
    ${props => props.noMargin && "margin-top: 0; margin-bottom: 0;"}
    font-weight: 300;
    font-size: 90%;
    color: var(--color-grey);
`

Meta.propTypes = {
    children: PropTypes.node.isRequired,
}

