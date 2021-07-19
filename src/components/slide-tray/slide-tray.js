import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const Tray = styled.div`
  padding-bottom: 1rem;
  width: 100%;
  height: ${props => props.height || "80px"};
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: auto;
  grid-gap: 2.5rem;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  overflow-x: scroll;
`;

const TrayTitle = styled.header`
  padding: 0.5rem 0;
`;

const SCROLL_AMOUNT = 5;
export const SlideTray = ({ title, trayHeight, children }) => {
  const [scrollToRight, setScrollToRight] = useState(true);
  const [scrollAmount, setScrollAmount] = useState(SCROLL_AMOUNT); // in pixels
  const trayRef = useRef();

  useEffect(() => {
    if (trayRef !== null) {
      const timer = setInterval(() => {
        trayRef.current.scrollTo({
          top: 0,
          left: scrollToRight
            ? trayRef.current.scrollLeft + scrollAmount
            : trayRef.current.scrollLeft - scrollAmount,
          behavior: "smooth"
        });
        if (trayRef.current.scrollLeft <= 0) setScrollToRight(true);
        if (trayRef.current.scrollLeft >= trayRef.current.scrollLeftMax)
          setScrollToRight(false);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [scrollToRight, scrollAmount]);

  return (
    <Wrapper
      onMouseOver={() => setScrollAmount(0)}
      onMouseOut={() => setScrollAmount(SCROLL_AMOUNT)}
      onFocus={() => setScrollAmount(0)}
      onBlur={() => setScrollAmount(SCROLL_AMOUNT)}
    >
      {title && <TrayTitle>{title}</TrayTitle>}
      <Tray height={trayHeight} ref={trayRef} className="logo-slider">
        {children}
      </Tray>
    </Wrapper>
  );
};
