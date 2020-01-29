import PropTypes from 'prop-types'
import styled from 'styled-components'

export const CardFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${ props => props.fgColor ? props.fgColor : 'inherit' };
    background-color: ${ props => props.bgColor ? props.bgColor : 'inherit' };
    padding: 1rem;
    height: 4rem;
`

CardFooter.propTypes = {
    fgColor: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

CardFooter.defaultProps = {
    fgColor: '#fff',
    bgColor: 'var(--color-crimson)',
}

