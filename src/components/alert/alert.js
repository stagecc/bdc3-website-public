import React from 'react'
import styled from 'styled-components'
import { WarningIcon } from '../icons'

const colors = {
    error: 'orange',
    warning: 'darkorange',
    danger: 'red',
}

const Wrapper = styled.div(({ color }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-style: solid;
    padding: 1rem;
    border-radius: 5px;
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
            <WarningIcon fill={ colors[type] } size="24" />
            <Message color={ colors[type] }>
                { message }
            </Message>
        </Wrapper>
    )
}
