import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CardContainer = styled.div`
    overflow: hidden;
    border-radius: 2rem;
    box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.25);
    margin-bottom: 2rem;
    height: 100%;
`

export const Card = ({ children }) => (
    <CardContainer>
        { children }
    </CardContainer>
)

Card.propTypes = {
    children: PropTypes.node.isRequired,
}
