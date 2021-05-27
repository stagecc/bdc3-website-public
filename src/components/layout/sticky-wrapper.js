import styled from "styled-components";

export const StickyWrapper = styled.div`
  z-index: 99;
  position: sticky;
  left: ${props => (props.stuck ? "0" : "unset")};
  right: ${props => (props.stuck ? "0" : "unset")};
  top: ${props => (props.stuck ? "0" : "unset")};
  ${props => props.dropShadow && "filter: drop-shadow(0 0 5px #00000066);"}
  transition: filter 1000ms;
`;
