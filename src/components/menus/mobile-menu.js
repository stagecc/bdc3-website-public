import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { CloseIcon, HamburgerIcon } from '../icons'
import { Brand } from '../layout'
import { ChevronDownIcon } from '../icons'

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: #000000;
    transition: filter 250ms;
    filter: opacity(${ props => props.shaded ? '0.75' : '0' });
    pointer-events: ${ props => props.shaded ? 'auto' : 'none' };
`

const Wrapper = styled.div`
`

const Toggler = styled.button`
    cursor: pointer;
    background-color: transparent;
    border: 0;
    z-index: 3;
    margin-right: 1rem;
`

const MobileNavDrawer = styled.div`
    // & * { border: 2px solid #f99; }
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 20rem;
    max-width: 90%;
    background: linear-gradient(to bottom, crimson, var(--color-crimson));
    clip-path: polygon(0 0, calc(100% - 4rem) 0, 100% 80%, calc(100% - 4rem) 100%, 0 100%);
    transition: transform 500ms;
    transform: ${ props => props.active ? 'translateX(0)' : 'translateX(-100vw)'};
    padding: 2rem 0 0 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const MobileNav = styled.nav`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 3rem 0 2rem 0;
    flex: 1;
`

const MenuLink = styled(Link)`
    padding: 0.5rem 1rem;
    width: 100%;
    color: #eef;
    letter-spacing: 2px;
    font-weight: bold;
    text-decoration: none;
    transform: translateX(0);
    text-transform: uppercase;
    transition: color 250ms, background-color 250ms;
    &.active {
        background-color: #ffffff33;
        color: #eee;
    }
    &:hover, &:focus {
        color: #eee;
        background-color: #ffffff22;
    }
`

const SubmenuHeader = styled.a.attrs({ href: '' })`
    padding: 0.5rem 1rem;
    width: 100%;
    color: #eef;
    letter-spacing: 2px;
    font-size: 110%;
    text-transform: uppercase;
    font-weight: bold;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    &:hover {
        color: #eee;
        background-color: #ffffff22;
        & svg {
            opacity: ${ props => props.active ? '1.0' : '0.75' };;
        }
    }
    & svg {
        transition: opacity 250ms, transform 500ms;
        opacity: ${ props => props.active ? '1.0' : '0.35' };
    }
`

const Submenu = styled.nav`
    display: ${ props => props.open ? 'block' : 'none' };
    max-height: ${ props => props.open ? '100%' : '0' };
    transition: max-height 500ms;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    ${ MenuLink } {
        padding: 0.5rem 1rem 0.5rem 2rem;
        &::before {
            content: "- ";
        }
    }
`

export const MobileMenu = ({ items }) => {
    const [visible, setVisible] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)

    const handleToggleMenu = () => setVisible(!visible)
    const handleCloseMenu = () => setVisible(false)
    const handleToggleSubmenu = newIndex => event => {
        event.preventDefault()
        setActiveIndex(newIndex === activeIndex ? -1 : newIndex)
    }
    const handleSubmenuKeyDown = newIndex => event => {
        if ([13,32].includes(event.keyCode)) { // space or enter
            event.preventDefault()
            setActiveIndex(newIndex === activeIndex ? -1 : newIndex)
        }
    }

    useEffect(() => {
        const escapeHatch = e => {
            if (e.keyCode === 27) { // escaoe
                handleCloseMenu()
            }
        }
        if (visible) {
            document.addEventListener('keydown', escapeHatch)
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => document.removeEventListener('keydown', escapeHatch)
    }, [visible])

    return (
        <Wrapper>
            <Toggler onClick={ handleToggleMenu }>
                { visible ? <CloseIcon size="36" fill="var(--color-crimson)" /> : <HamburgerIcon size="36" fill="var(--color-crimson)"  /> }
            </Toggler>
            <MobileNavDrawer active={ visible }>
                <div style={{ marginLeft: '1.5rem' }}>
                    <Brand white width="66%" />
                </div>
                <MobileNav>
                    {
                        items.map((item, currentIndex) => {
                            return item.submenu
                            ? (
                                <Fragment key={ currentIndex }>
                                    <SubmenuHeader
                                        onClick={ handleToggleSubmenu(currentIndex) }
                                        onKeyDown={ handleSubmenuKeyDown(currentIndex) }
                                        active={ activeIndex === currentIndex }
                                        aria-expanded={ activeIndex === currentIndex }
                                        aria-controls={ `submenu-${ currentIndex }` }
                                    >
                                        <span>{ item.text }</span>
                                        &nbsp;&nbsp;
                                        <ChevronDownIcon size={ 20 } fill="#fff" />
                                    </SubmenuHeader>
                                    <Submenu open={ activeIndex === currentIndex } id={ `submenu-${ currentIndex }` } role="menu">
                                        {
                                            item.submenu.map(subitem => <MenuLink to={ subitem.path } key={ subitem.text } activeClassName="active" onClick={ handleCloseMenu } role="menuitem">{ subitem.text }</MenuLink>)
                                        }
                                    </Submenu>
                                </Fragment>
                            )
                            : <MenuLink to={ item.path } key={ item.text } activeClassName="active" onClick={ handleCloseMenu }>{ item.text }</MenuLink>
                        })
                    }
                </MobileNav>
            </MobileNavDrawer>
            <Overlay shaded={ visible } onClick={ handleCloseMenu } />
        </Wrapper>
    )
}
