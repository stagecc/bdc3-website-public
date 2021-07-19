import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Border = styled.div`
  filter: drop-shadow(0 0.75rem 0 var(--color-crimson));
`;

const HeroWrapper = styled.div`
    // & * { border: 1px solid #f99; }
    height: 20vw;
    min-height: 300px;
    max-height: 400px;
    overflow: hidden;
    position: relative;
    margin-bottom: 4rem;
    ${props =>
      props.clipped
        ? "clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% calc(100% - 5vw));"
        : undefined}
    // ${props =>
      props.clipped
        ? "clip-path: polygon(0% 0%, 100% 0%, 100% 100%, calc(100% - 20vw) 100%, 4vw calc(100% - 4vw), 0% 100%);"
        : undefined}
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: ${props => props.backgroundColor};
        background-image: url(${props => props.backgroundImage});
        background-position: center;
        background-size: cover;
        background-blend-mode: multiply;
        filter: brightness(1.5);
    }
`;

HeroWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired
};

const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

Overlay.propTypes = {
  children: PropTypes.node.isRequired
};

export const Hero = ({
  clipped,
  backgroundColor,
  backgroundImage,
  children,
  ...rest
}) => {
  return (
    <Border>
      <HeroWrapper
        clipped={clipped}
        backgroundColor={backgroundColor}
        backgroundImage={backgroundImage}
        {...rest}
      >
        <Overlay {...rest}>{children}</Overlay>
      </HeroWrapper>
    </Border>
  );
};
