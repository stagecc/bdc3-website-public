import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from "styled-components";
import { useWindowWidth } from "../../hooks";
import { panelType } from './types'
import { CarouselPanel } from './panels'
import backgroundImage from "../../images/stars-long-exposure.png";

const INTERVAL = 2000 // ms

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

  useEffect(() => {
    const timer = setInterval(
      () => setCarouselIndex((carouselIndex + 1) % panels.length),
      INTERVAL,
    )
    return () => clearInterval(timer)
  }, [carouselIndex, panels])

  return (
    <Border>
      <Wrapper
        compact={isCompact}
        backgroundColor="#00abf5"
        backgroundImage={backgroundImage}
      >
        <CarouselPanel data={ panels[carouselIndex] } />
      </Wrapper>
    </Border>
  )
}

//

Carousel.propTypes = {
  panels: PropTypes.arrayOf(panelType)
}