import React from 'react'
import styled from 'styled-components'
import { WarningIcon } from '../icons'

const colors = {
    note: 'var(--color-note)',
    error: 'var(--color-error)',
    warning: 'var(--color-warning)',
    danger: 'var(--color-danger)',
}

const Wrapper = styled.div(({ color }) => `
    display: flex;
    margin: 1rem 0 2rem 0;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-style: solid;
    padding: 1rem;
    border-radius: 4px;
    color: ${ color };
    border-color: ${ color };
    background-color: #ffffff99;
`)

const Message = styled.span(({ color }) => `
    font-weight: bold;
    color: ${ color };
    margin: 0 0 0 1rem;
`)

export const Alert = ({ type, message }) => {
    return (
        <Wrapper color={ colors[type] }>
            { type === 'warning' && <WarningIcon fill={ colors[type] } size="24" /> }
            { type === 'error' && <WarningIcon fill={ colors[type] } size="24" /> }
            { type === 'danger' && <WarningIcon fill={ colors[type] } size="24" /> }
            <Message color={ colors[type] }>
                { message }
            </Message>
        </Wrapper>
    )
}
