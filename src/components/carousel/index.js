import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types'
import { useWindowWidth } from "../../hooks";
import { panelType } from './types'
import { CarouselPanel } from './panels'
import { PauseIcon, PlayIcon } from "../icons";
import { Overlay, Border, Wrapper, StyledPanelWrapper } from './panels/subcomponents/PanelContainer'
import { useTransition } from "react-spring";
import { StateNote } from './panels/subcomponents/StateNote'

const INTERVAL = 5000 // ms

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
  
  // panelTransitions is an array created using the useTransition hook from react-spring
  // This array adds transition variables and is mapped over  inside the Overlay component. 
  // It takes three arguments, 1- the data that you want to display, 2- a key, 3- the config object
  // The component that is returned is a styled component with a base of animated.div called StyledPanelWrapper
  // Inside StyledPanelWrapper is the CarouselPanel component, which displays only the current panel
  // For documentation see here: https://react-spring.dev/docs/components/use-transition

  const panelTransitions = useTransition(
    panels[carouselIndex],
    item => item.key,
    {
      from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
      enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
      leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    }
  );
  
  return (
    <Border>
      <Wrapper
        compact={isCompact}
        backgroundColor="#00abf5"
        tabIndex="0"
        onMouseOver={() => setPlayingAnimations(false)}
        onFocus={() => setPlayingAnimations(false)}
        onMouseLeave={() => setPlayingAnimations(true)}
        onKeyDown={handleKeyDown}
      >
        <Overlay>
        {
          panelTransitions.map(({ item, props, key })=>(
            <StyledPanelWrapper key={key} style={props} compact={isCompact}>
              {/* CarouselPanel sents the panel data and panel type 
              and uses react.createElement based on the panel type */}
              <CarouselPanel item={item} />
            </StyledPanelWrapper>
            ))
        }
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