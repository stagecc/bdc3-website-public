import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const throb = keyframes`
    0% {
        opacity: 0;
        transform: scale(1) rotate(180deg);
    }
    33.6% {
        transform: scale(1.3) rotate(180deg);
    }
    42.2% {
        transform: scale(0.4) rotate(180deg);
    }
    50% {
        opacity: 1;
        transform: scale(1.5) rotate(90deg);
    }
    100% {
        opacity: 0;
        transform: scale(1) rotate(0deg);
    }
`;

const glow = keyframes`
    0% {
        opacity: 0.6;
    }
    50% {
        opacity: 0.85;
    }
    100% {
        opacity: 0.6;
    }
`;

const Wrapper = styled.div`
  // & * {border: 1px solid #f99;}
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Tray = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Dot = styled.div`
  background-color: ${props => props.color || "#333"};
  margin: 0.75rem;
  height: 0.5rem;
  width: 0.5rem;
  animation: ${throb} 1500ms ease-out infinite;
  &:nth-child(1) {
    animation-delay: 0ms;
  }
  &:nth-child(2) {
    animation-delay: 75ms;
  }
  &:nth-child(3) {
    animation-delay: 150ms;
  }
  &:nth-child(4) {
    animation-delay: 225ms;
  }
  position: relative;
`;

const LoadingText = styled.div`
  text-align: center;
  color: ${props => props.color || "#333"};
  opacity: 0.75;
  animation: ${glow} 1500ms ease-out infinite;
  padding: 0.5rem;
`;

export const Dots = ({ text = "", textPlacement, color }) => (
  <Wrapper>
    {text !== "" && textPlacement === "top" && (
      <LoadingText color={color}>{text}</LoadingText>
    )}
    <Tray>
      <Dot color={color} />
      <Dot color={color} />
      <Dot color={color} />
      <Dot color={color} />
    </Tray>
    {text !== "" && textPlacement === "bottom" && (
      <LoadingText color={color}>{text}</LoadingText>
    )}
  </Wrapper>
);

Dots.propTypes = {
  text: PropTypes.string,
  textPlacement: PropTypes.oneOf(["top", "bottom"]),
  color: PropTypes.string
};

Dots.defaultProps = {
  color: 'var(--color-crimson)'
}
