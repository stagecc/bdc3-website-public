import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { InfoIcon, WarningIcon } from '../icons'

const colors = {
    info: 'var(--color-note)',
    error: 'var(--color-error)',
    warning: 'var(--color-warning)',
    danger: 'var(--color-danger)',
}

const Wrapper = styled.div(({ color }) => `
    display: flex;
    margin: 1rem 0 2rem 0;
    justify-content: center;
    align-items: flex-start;
    border-width: 1px;
    border-style: solid;
    padding: 1rem;
    border-radius: 4px;
    color: ${ color };
    border-color: ${ color };
    background-color: #ffffff99;
`)

const Message = styled.span(({ color, center }) => `
    font-weight: bold;
    color: ${ color };
    text-align: left;
    ${ center ? `text-align: center;` : undefined }
    margin: 0 0 0 1rem;
`)

export const Alert = ({ type, message, center, ...props }) => {
    return (
        <Wrapper color={ colors[type] } { ...props }>
            { type === 'warning' && <WarningIcon fill={ colors[type] } size={ 24 } /> }
            { type === 'error' && <WarningIcon fill={ colors[type] } size={ 24 } /> }
            { type === 'danger' && <WarningIcon fill={ colors[type] } size={ 24 } /> }
            { type === 'info' && <InfoIcon fill={ colors[type] } size={ 36 } /> }
            <Message center={ center } color={ colors[type] }>
                { message }
            </Message>
        </Wrapper>
    )
}

Alert.propTypes = {
    type: PropTypes.oneOf(['info', 'warning', 'error', 'danger']),
    message: PropTypes.string.isRequired,
    center: PropTypes.bool.isRequired,
}

Alert.defaultProps = {
    type: 'info',
    message: PropTypes.string.isRequired,
    center: false,
}
