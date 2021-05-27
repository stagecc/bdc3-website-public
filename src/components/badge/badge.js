import React from "react";
import styled from "styled-components";

export const Badge = styled.span`
  background-color: #fff;
  color: #666;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  font-weight: 700;
  padding: 0.5rem;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
  margin: 0;
  ${props => props.margin && `margin: ${props.margin};`}
`;

const HexWrapper = styled.span`
  display: inline-block;
  background-color: var(--color-crimson);
  padding: 0;
  width: calc(1.118 * 5rem);
  height: 5rem;
  clip-path: polygon(
    0% 50%,
    25% 0%,
    75% 0%,
    100% 50%,
    75% 100%,
    25% 100%,
    0% 50%
  );
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const HexInterior = styled.span`
//     display: inline-block;
//     background: #fff;
//     width: 60%;
//     height: calc(1.118 * 60%);
//     border-radius: 50%;
//     padding: 0.5rem;
//     z-index: 1;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// `

export const HexBadge = ({ children }) => {
  return <HexWrapper>{children}</HexWrapper>;
};
