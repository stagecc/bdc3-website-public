import PropTypes from 'prop-types'
import styled from 'styled-components'

export const CardBody = styled.div`
    padding: 1rem 2rem;
    background-color: ${ props => props.bgColor ? props.bgColor : '#fff' };
    color: ${ props => props.fgColor ? props.fgColor : 'inherit' };
    height: 100%;
`

CardBody.propTypes = {
    fgColor: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
}

CardBody.defaultProps = {
    fgColor: '#333',
    bgColor: '#fff',
}

