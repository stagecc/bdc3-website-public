import styled from "styled-components";
import { animated } from "react-spring";
import backgroundImage from "../../../../images/stars-long-exposure.png";
import { StateNote } from '../subcomponents/StateNote'

export const Overlay = styled.div(({ compact }) => `
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: ${ compact ? "column" : "row" };
  align-items: stretch;
`);

export const Border = styled.div`
  filter: drop-shadow(0 0.75rem 0 var(--color-crimson));
`;

export const Wrapper = styled.div(({ compact }) => `
  // & * { border: 1px solid #f99; }
  height: 20vw;
  min-height: ${ compact ? "500px" : "300px" };
  max-height: ${ compact ? "600px" : "500px" };
  overflow: hidden;
  margin-bottom: 4rem;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% calc(100% - 5vw));
  position: relative;
  transition: filter 250ms;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #005489;
    background-image: url(${backgroundImage});
    background-position: center;
    background-size: cover;
  }
  &:hover ${StateNote} {
    filter: opacity(1);
  }
  &:focus {
    border: 1px dashed var(--color-crimson);
    filter: saturate(0.75);
  }
`);

export const StyledPanelWrapper = styled(animated.div)`
position: absolute;
left: 0;
top: 0;
height: 100%;
width: 100%;
display: flex;
flex-direction: ${props => (props.compact ? "column" : "row")};
align-items: stretch;
` 