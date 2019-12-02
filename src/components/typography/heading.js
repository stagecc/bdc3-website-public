import styled from 'styled-components'
import PropTypes from 'prop-types'

// 

export const Heading = styled.h2`
    color: #668;
    color: ${ props => props.light ? '#eef' : '#668' };
    text-align: left;
    ${ props => props.center && 'text-align: center;' }
    ${ props => props.right && 'text-align: right;' }
`

Heading.propTypes = {
    children: PropTypes.node.isRequired,
}
