import styled from 'styled-components'
import PropTypes from 'prop-types'

// 

export const Subsubheading = styled.h4`
    color: var(--color-eggplant);
    line-height: 1.5;
    color: ${ props => props.light ? '#dde' : '#779' };
    text-align: center;
    @media screen and (min-width: 767px) {
        text-align: left;
        ${ props => props.center && 'text-align: center;' }
        ${ props => props.right && 'text-align: right;' }
    }
`

Subsubheading.propTypes = {
    children: PropTypes.node.isRequired,
}
