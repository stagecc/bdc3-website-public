import React, { Fragment, useState } from 'react'
import { Match } from '@reach/router'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { ExpandDownIcon } from '../icons'

export const MenuContainer = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    background-color: transparent;
    height: 100%;
`

export const MenuLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    color: #444;
    text-decoration: none;
    padding: 1.5rem 1rem;
    margin: 0;
    background-color: transparent;
    letter-spacing: 2px;
    position: relative;
    height: 100%;
    font-weight: 400;
    transition: color 500ms, background-color 150ms;
    &:hover {
        background-color: #ccc;
    }
    &.active {
        color: #fff;
        background-color: var(--color-crimson);
    }
`

export const MenuItem = styled.span`
    // border: 1px solid #f99;
    background-color: inherit;
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const SubmenuHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    padding: 0.5rem 1.25rem;
    margin: 0;
    background-color: ${ props => props.active ? 'var(--color-crimson)' : 'transparent' };
    color: ${ props => props.active ? '#fff' : '#333' };
    letter-spacing: 2px;
    position: relative;
    font-weight: 400;
    cursor: pointer;
    transition: color 500ms, background-color 250ms;
    height: 100%;
    & svg {
        transition: transform 50ms;
        transform: ${ props => props.open ? 'translateY(0.15rem)' : 'translateY(0)' };
        fill: ${ props => props.active ? '#fff' : '#333' };
    }
    &:hover svg {
        transition: transform 250ms;
    }
`

const Submenu = styled.nav.attrs({ className: 'submenu' })`
    color: #eee;
    position: absolute;
    top: 100%;
    width: 100%;
    left: 50%;
    font-size: 80%;
    min-width: 100%;
    border: 0;
    background-color: #fff;
    // border-bottom-left-radius: 0.25rem;
    // border-bottom-right-radius: 0.25rem;
    overflow: hidden;
    z-index: -1;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
    transition: transform 150ms, opacity 250ms;
    transform-origin: 50% 0%;
    transform: ${ props => props.open ? 'scaleY(1) translateY(0)' : 'scaleY(0) translateY(-2rem)' } translateX(-50%);
    opacity: ${ props => props.open ? 1.0 : 0.1 };
`

export const Menu = ({ items, showBrand }) => {
    const [openSubmenu, setOpenSubmenu] = useState(-1)

    const handleOpenSubmenu = index => event => setOpenSubmenu(index)
    const handleCloseAllSubmenus = () => setOpenSubmenu(-1)

    return (
        <MenuContainer>
            {
                items.map((item, currentIndex) => {
                    return (
                        <MenuItem
                            key={ item.path }
                            onMouseOver={ item.submenu && handleOpenSubmenu(currentIndex) } onMouseOut={ item.submenu && handleCloseAllSubmenus }
                            onFocus={ item.submenu && handleOpenSubmenu(currentIndex) } onBlur={ item.submenu && handleCloseAllSubmenus }
                        >
                            {
                                item.submenu
                                    ? <Fragment>
                                        <Match path={ item.path }>
                                            {
                                                props => {
                                                    // "active" means we're looking at a page whose route contains the submenu's root route
                                                    const thisSubmenuIsActive = props.location.pathname.includes(item.path)
                                                    // Reach Router can style _links_ that are partially active out of the box.
                                                    // However, here, we want to style the submenu header (not a Link component)
                                                    // according to whether there is a partial location match.
                                                    // This substring check is how the value of the "active" prop is determined below. 
                                                    // console.log(props.location.pathname, 'contains', item.path, ':', props.location.pathname.includes(item.path))
                                                    return (
                                                        <SubmenuHeader active={ thisSubmenuIsActive } open={ openSubmenu === currentIndex }>
                                                            { item.text } &nbsp;
                                                            <ExpandDownIcon size="16" />
                                                        </SubmenuHeader>
                                                    )
                                                }
                                            }
                                        </Match>
                                        <Submenu open={ openSubmenu === currentIndex } onClick={ handleCloseAllSubmenus }>
                                            { item.submenu.map(subitem => <MenuLink key={ subitem.path } to={ subitem.path } activeClassName="active" partiallyActive={ true }>{ subitem.text }</MenuLink>) }
                                        </Submenu>
                                    </Fragment>
                                    : <MenuLink to={ item.path } activeClassName="active" partiallyActive={ false }>{ item.text }</MenuLink>
                            }
                        </MenuItem>
                    )}
                )
            }
        </MenuContainer>
    )
}