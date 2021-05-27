import React, { useState } from "react";
import styled from "styled-components";
import { IconButton } from "../buttons";
import { CloseIcon } from "../icons";

const Wrapper = styled.div`
  background-color: var(--color-peach);
  color: #333;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  & .banner-content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 1rem;
  }
  & svg {
    opacity: 0.75;
    transition: fill 250ms, opacity 250ms;
  }
  &:hover svg {
    opacity: 1;
    &:hover {
      fill: var(--color-danger);
    }
  }
`;

export const Banner = ({ children }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  if (open) {
    return (
      <Wrapper>
        <div className="banner-content">{children}</div>
        <IconButton onClick={handleClose}>
          <CloseIcon
            className="banner-close"
            fill="var(--color-grey)"
            size={24}
          />
        </IconButton>
      </Wrapper>
    );
  }

  return null;
};
