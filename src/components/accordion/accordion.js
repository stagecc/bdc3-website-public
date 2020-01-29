import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import { ExpandDownIcon as ExpandIcon } from '../icons'

const ExpandIcon = ({ size, color, active, ...rest }) => (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
        height={ `${ size }px` } width={ `${ size }px` }
        viewBox="0 0 24 24"
        { ...rest }
        fill={ color } 
        style={{
            transition: 'transform 500ms', transformOrigin: 'center center',
            transform: active ? 'rotate(180deg)' : 'rotate(0deg)'
        }}
    >
        <path d="M 0,10 L 24,10 L 24,14 L 0,14" />
        <path d="M 10,0 L 10,24 L 14,24 L 14,0"
            style={{
                transition: 'transform 500ms 500ms', transformOrigin: 'center center',
                transform: active ? 'scale(0.0)' : 'scale(1.0)'
            }}
        />
  </svg>
)

ExpandIcon.propTypes = {
    color: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
}

ExpandIcon.defaultProps = {
    color: '#fff',
    size: 24,
}

const AccordionWrapper = styled.div`
    // border: 1px solid #f99;
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
`

const AccordionTitle = styled.span`
    margin-right: 2rem;
    flex: 1;
`

const AccordionHeader = styled.div`
    // & * { border: 1px solid #f99; }
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 120%;
    padding: 1rem 2rem;
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
            <AccordionHeader onClick={ handleToggle } active={ active }>
                <AccordionTitle>{ title }</AccordionTitle>
                <ExpandIcon size={ 12 } active={ active } color={ active ? 'var(--color-crimson)' : '#333' } />
            </AccordionHeader>
            <AccordionBody ref={ contentElement } active={ active } height={ height }>
                <AccordionContents>
                    { children }
                </AccordionContents>
            </AccordionBody>
        </AccordionWrapper>
    )
}
