import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Paragraph } from './paragraph'

export const Meta = styled(Paragraph)`
    margin-bottom: 1rem;
    font-weight: 300;
    font-size: 90%;
    color: var(--color-grey);
`

Meta.propTypes = {
    children: PropTypes.node.isRequired,
}

