import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { CloseIcon, HamburgerIcon } from '../icons'
import { Brand } from '../layout'

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
    margin: 4rem 0 2rem 0;
    flex: 1;
`

const MenuLink = styled(Link)`
    padding: 1rem 2rem;
    width: 100%;
    color: #eef;
    letter-spacing: 2px;
    font-size: 125%;
    font-weight: bold;
    text-decoration: none;
    transform: translateX(0);
    transition: color 250ms, background-color 250ms;
    text-transform: uppercase;
    &.active {
        background-color: #ffffff33;
        color: #eee;
    }
    &:hover {
        color: #eee;
        background-color: #ffffff22;
    }
`

export const MobileMenu = ({ items }) => {
    const [visible, setVisible] = useState(false)
    
    const handleToggleMenu = () => setVisible(!visible)
    const handleCloseMenu = () => setVisible(false)

    useEffect(() => {
        const escapeHatch = e => {
            if (e.keyCode === 27) {
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
                        items.map(item => {
                            return item.submenu
                            ? item.submenu.map(subitem => <MenuLink to={ subitem.path } key={ subitem.text } activeClassName="active" onClick={ handleCloseMenu }>{ subitem.text }</MenuLink>)
                            : <MenuLink to={ item.path } key={ item.text } activeClassName="active" onClick={ handleCloseMenu }>{ item.text }</MenuLink>
                        })
                    }
                </MobileNav>
            </MobileNavDrawer>
            <Overlay shaded={ visible } onClick={ handleCloseMenu } />
        </Wrapper>
    )
}
