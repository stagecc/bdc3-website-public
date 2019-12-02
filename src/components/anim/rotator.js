import styled from 'styled-components'
import PropTypes from 'prop-types' 

export const Rotator = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 500ms;
    transform-origin: center center;
    transform: ${ props => props.rotated ? 'rotate(180deg)' : 'rotate(0)' };
`

Rotator.propTypes = {
    rotated: PropTypes.bool.isRequired,
}