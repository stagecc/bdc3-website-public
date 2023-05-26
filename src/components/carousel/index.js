import React, { useEffect, useRef, useState, useMemo } from "react";
import PropTypes from 'prop-types'
import { useWindowWidth } from "../../hooks";
import { panelType } from './types'
import { CarouselPanel } from './panels'
import { PauseIcon, PlayIcon } from "../icons";
import { Overlay, Border, Wrapper, StyledPanelWrapper } from './panels/subcomponents/PanelContainer'
import { useTransition } from "react-spring";
import { StateNote } from './panels/subcomponents/StateNote'

const INTERVAL = 10000 // ms

export const Carousel = ({ panels }) => {
  const { isCompact } = useWindowWidth();
  const [carouselIndex, setCarouselIndex] = useState(0)
  const indexRef = useRef(carouselIndex);
  indexRef.current = carouselIndex;

  // pause/play functionality is controlled by this playingAnimations state variable
  // when playingAnimations is set to false, the carousel does not advance to the next panel
  // see documentation here: https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html
  const [playingAnimations, setPlayingAnimations] = useState(true);

  // this fires when the index changes and playingAnimations changes
  useEffect(() => {

    // if playing, wait for INTERVAL ms before advancing to the next panel
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
  // Useful Links: https://react-spring.dev/docs/components/use-transition
  // Useful Video Walkthrough: https://www.youtube.com/watch?v=WKmhhBokAh8

  // memoize the the transforms for panel transitions, updating as `isCompact` changes.
  const panelTransitionTransform = useMemo(() => {
    const verticalTransform = { 
      /* vertical transform stuff */ 
      from: { opacity: 0, transform: 'translate3d(0,100%,0)' },
      enter: { opacity: 1, transform: 'translate3d(0,0%,0)' },
      leave: { opacity: 0, transform: 'translate3d(0,-50%,0)' },
    }
    const horizontalTransform = { 
      /* horiz transform stuff */ 
      from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
      enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
      leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    }
    return isCompact ? verticalTransform  : horizontalTransform
  }, [isCompact])

  const panelTransitions = useTransition(
    panels[carouselIndex],
    item => item.key,
    // then use the transform here
    { ...panelTransitionTransform }
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
        <Overlay compact={isCompact}>
        {
          panelTransitions.map(({ item, props, key })=>(
            <StyledPanelWrapper key={key} style={props} compact={isCompact}>
              {/* CarouselPanel sends the panel data and panel type 
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