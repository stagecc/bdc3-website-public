import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { ExpandDownIcon } from '../icons'
import { Rotator } from '../anim'

const AccordionWrapper = styled.div`
    // border: 1px solid #f99;
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
`

const AccordionTitle = styled.span`
    display: flex;
    justify-content: space-between;
    font-size: 120%;
    padding: 1rem;
    cursor: pointer;
    background-color: #eee;
    color: ${ props => props.active ? 'var(--color-crimson)' : '#333' };
    transition: background-color 250ms, color 500ms;
    &:hover {
        background-color: #ddd;
    }
`

const AccordionBody = styled.div`
    overflow: hidden;
    transition: ${ props => props.active
        ? `max-height 250ms, opacity 500ms 100ms`
        : `max-height 500ms 100ms, opacity 250ms`
    };
    max-height: ${ props => props.height }px;
    opacity: ${ props => props.active ? 1 : 0 };
`

const AccordionContents = styled.div`
    margin: 2rem;
`

export const Accordion = ({ title, content, children }) => {
    const [active, setActive] = useState(false)
    const [height, setHeight] = useState(0)
    const contentElement = useRef(null)

    const handleToggle = () => {
        setActive(!active)
    }

    useEffect(() => {
        setHeight(active ? contentElement.current.scrollHeight : 0)
    }, [active])

    return (
        <AccordionWrapper>
            <AccordionTitle onClick={ handleToggle } active={ active }>
                <span>{ title }</span>
                <Rotator rotated={ active }>
                    <ExpandDownIcon size="16" color={ active ? 'var(--color-crimson' : '#333' } />
                </Rotator>
            </AccordionTitle>
            <AccordionBody ref={ contentElement } active={ active } height={ height }>
                <AccordionContents>
                    { children }
                </AccordionContents>
            </AccordionBody>
        </AccordionWrapper>
    )
}
