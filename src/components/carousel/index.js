import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types'
import styled from "styled-components";
import { useWindowWidth } from "../../hooks";
import { panelType } from './types'
import { CarouselPanel } from './panels'
import backgroundImage from "../../images/stars-long-exposure.png";
import { PauseIcon, PlayIcon } from "../icons";
import { Overlay } from './panels/subcomponents/Overlay'

const INTERVAL = 2000 // ms

const StateNote = styled.span`
  color: #eee;
  background-color: #000000;
  position: absolute;
  top: 1rem;
  left: 0;
  padding: 0.5rem;
  padding-left: 1rem;
  border-radius: 4px;
  font-size: 65%;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  cursor: default;
  transition: transform 250ms, filter 250ms;
  transform: translateX(calc(-100% + 32px));
  filter: opacity(0.5);
  &:hover {
    transform: translateX(-0.25rem);
    filter: opacity(0);
  }
`;

const Border = styled.div`
  filter: drop-shadow(0 0.75rem 0 var(--color-crimson));
`;

const Wrapper = styled.div`
  // & * { border: 1px solid #f99; }
  height: 20vw;
  min-height: ${props => (props.compact ? "600px" : "300px")};
  max-height: ${props => (props.compact ? "700px" : "500px")};
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
    background-image: url(${props => props.backgroundImage});
    background-position: center;
    background-size: cover;
  }
  &:focus {
    border: 1px dashed var(--color-crimson);
    filter: saturate(0.75);
  }
`;

export const Carousel = ({ panels }) => {
  const { isCompact } = useWindowWidth();
  const [carouselIndex, setCarouselIndex] = useState(0)
  const indexRef = useRef(carouselIndex);
  indexRef.current = carouselIndex;
  const [playingAnimations, setPlayingAnimations] = useState(true);

  useEffect(() => {
    if (playingAnimations) {
      let timer;
      timer = setInterval(
        () => setCarouselIndex((carouselIndex + 1) % panels.length),
        INTERVAL,
      )
      return () => clearInterval(timer)
    }
  }, [carouselIndex, panels, playingAnimations])

  const handleKeyDown = event => {
    if (event.keyCode === 32) {
      event.preventDefault();
      setPlayingAnimations(!playingAnimations);
    }
  };

  return (
    <Border>
      <Wrapper
        compact={isCompact}
        backgroundColor="#00abf5"
        backgroundImage={backgroundImage}
        tabIndex="0"
        onMouseOver={() => setPlayingAnimations(false)}
        onFocus={() => setPlayingAnimations(false)}
        onMouseLeave={() => setPlayingAnimations(true)}
        onKeyDown={handleKeyDown}

      >
        <Overlay>
          <CarouselPanel data={ panels[carouselIndex] } />
          <StateNote>
              <span style={{ marginRight: "0.5rem" }}>Animations paused</span>
              {playingAnimations ? (
                <PlayIcon size={16} fill="#fff" />
              ) : (
                <PauseIcon size={16} fill="#fff" />
              )}
            </StateNote>
        </Overlay>
      </Wrapper>
    </Border>
  )
}

//

Carousel.propTypes = {
  panels: PropTypes.arrayOf(panelType)
}