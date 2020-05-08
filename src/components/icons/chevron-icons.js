import React from 'react'
import PropTypes from 'prop-types'

const ChevronIcon = ({ size, fill, children, ...rest }) => (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" height={ `${ size }px` } width={ `${ size }px` } fill={ fill } viewBox="0 0 24 24" { ...rest }>
        { children }
    </svg>
)

export const ChevronUpIcon = props => (
    <ChevronIcon { ...props }>
        <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </ChevronIcon>
)

export const ChevronDownIcon = props => (
    <ChevronIcon { ...props }>
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </ChevronIcon>
)

export const ChevronLeftIcon = props => (
    <ChevronIcon { ...props }>
        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
    </ChevronIcon>
)

export const ChevronRightIcon = props => (
    <ChevronIcon { ...props }>
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
    </ChevronIcon>
)

const requiredProps = {
    fill: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
}

const defaultProps = {
    fill: '#fff',
    size: 24,
}

ChevronIcon.propTypes = requiredProps
ChevronIcon.defaultProps = defaultProps
