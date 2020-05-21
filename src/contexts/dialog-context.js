import React, { Fragment, useCallback, useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Heading, Paragraph } from '../components/typography'
import { Button, IconButton } from '../components/buttons'
import { CloseIcon } from '../components/icons'
import { animated, useSpring } from 'react-spring'

const Overlay = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #00000099;
    z-index: 999;
`

const Wrapper = styled(animated.div)`
    width: 95%;
    max-width: 800px;
    position: fixed;
    z-index: 9999;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
    background-color: #eee;
    color: var(--color-eggplant);
    padding: 0;
    filter: drop-shadow(0 0 0.25rem rgba(0, 0, 0, 0.5));
`

const Header = styled.div`
    padding: 1rem;
    display: flex;
    align-items: flex-start;
`

const Title = styled(Heading)`
    flex: 1;
    padding: 0;
    margin: 0;
`

const Body = styled.div`
    padding: 0 1rem;
    text-align: left;
`

const Actions = styled.div`
    padding: 1rem;
    text-align: right;
    & button {
        margin: 0 0.25rem;
    }
`

const Dialog = ({ onContinue }) => {
    console.log('in dialog', onContinue)
    const dialog = useContext(DialogContext)
    const dialogRef = useRef()
    const [focusableElements, setFocusableElements] = useState([])

    const animation = useSpring({
        from: {
            transform: 'translate(-50%, -100%)',
            opacity: 0,
        },
        to: {
            opacity: 1,
            transform: 'translate(-50%, -50%)',
        },
    })

    useEffect(() => {
        if (dialogRef.current) {
            setFocusableElements(dialogRef.current.querySelectorAll('button'))
        }
    }, [dialogRef.current])

    const handleKeyDown = useCallback(event => {
        if (event.keyCode === 27) { // esc
            dialog.close()
        }
        if (event.keyCode === 9 && !event.shiftKey && document.activeElement === focusableElements[focusableElements.length - 1]) { // tab
            focusableElements[0].focus()
            event.preventDefault()
        }
        if (event.keyCode === 9 && event.shiftKey && document.activeElement === focusableElements[0]) { // shift + tab
            focusableElements[focusableElements.length - 1].focus()
            event.preventDefault()
        }
    }, [focusableElements])
    
    useEffect(() => {
        if (dialog.isOpen) {
            document.addEventListener('keydown', handleKeyDown)
        }
        return document.removeEventListener('keydown', handleKeyDown)
    }, [dialog.isOpen])

    return (
        <Fragment>
            <Overlay onClick={ dialog.close } />
            <Wrapper onKeyDown={ handleKeyDown } ref={ dialogRef } style={ animation }>
                <Header>
                    <Title>{ dialog.title }</Title>
                    <IconButton onClick={ dialog.close } >
                        <CloseIcon size={ 24  } fill="var(--color-crimson)" />
                    </IconButton>
                </Header>
                <Body>
                { dialog.contents }
                </Body>
                <Actions>
                    <Button autoFocus onClick={ dialog.close } light>Cancel</Button>
                    <Button onClick={ onContinue }>Continue</Button>
                </Actions>
            </Wrapper>
        </Fragment>
    )
}

export const DialogContext = React.createContext({ })

export const DialogProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [contents, setContents] = useState()
    const [continueHandler, setContinueHandler] = useState(() => () => { console.log('adasdsd') })

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)
    const onContinue = () => {
        continueHandler()
        close()
    }

    return (
        <DialogContext.Provider value={{ isOpen, open, close, title, setTitle, contents, setContents, continueHandler, setContinueHandler }}>
            { children }
            { isOpen && <Dialog onContinue={ onContinue } /> }
        </DialogContext.Provider>
    )
}

