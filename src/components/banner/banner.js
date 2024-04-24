import React, { useState } from "react";
import styled from "styled-components";
// import { useLocalStorage } from "../../hooks"
import { IconButton } from "../buttons";
import { CloseIcon } from "../icons";

const Wrapper = styled.div(({ active }) => `
  position: relative;
  border: solid var(--color-crimson);
  background-color: var(--color-white);
  color: var(--color-crimson);
  border-width: 0 0 0.75rem 0;
  transition: border-color 250ms;
  & .toggler {
    transform: translate3d(0, ${ active ? '5px' : 0 }, 0);
    width: 40px;
    height: 50px;
    clip-path: polygon(0% 0%, 100% 0%, 100% calc(100% - 15px), 50% 100%, 0% calc(100% - 15px));
    z-index: 999;
    background-color: var(--color-crimson);
    position: absolute;
    right: 1rem;
    top: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    transition: transform 250ms ease-out 250ms;
    &:hover {
      transform: translate3d(0, ${ active ? '0px' : '10px' }, 0);
    }
  }
  & svg {
    opacity: 0.75;
    transition: fill 250ms, opacity 250ms;
  }
  &:hover, &:focus-within {
    border-color: var(--color-crimson);
    & .toggler {
      transition: background-color 250ms, transform 50ms ease-out;
      background-color: var(--color-crimson);
      filter: brightness(1.0);
      & svg {
        opacity: 1.0;
      }
    }
  }
`);

export const Banner = ({ children, openedIcon, closedIcon }) => {
  const [open, setOpen] = useState(true);
  
  return (
    <Wrapper active={ open }>
      { open && children }
      <IconButton onClick={ () => setOpen(!open) } className="toggler">
        { open ? openedIcon : closedIcon }
      </IconButton>
    </Wrapper>
  );

  return null;
};
