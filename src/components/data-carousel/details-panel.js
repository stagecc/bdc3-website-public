import React from "react";
import styled from "styled-components";
import { animated } from "react-spring";

export const DetailsPanel = styled.div`
  flex: ${props => (props.compact ? "1 0 50%" : "1")};
  height: 100%;
  width: 100%;
  position: relative;
`;

export const DetailWrapper = styled(animated.div)`
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 0px 3rem;
  flex: 2;
  @media screen and (min-width: 992px) {
    flex: 4;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Headline = styled.h1`
  font-size: ${props => (props.testimonialStyle
    ? "1rem" 
    : "24pt"
  )};
  padding: 0 1rem;
  @media screen and (min-width: 768px) {
    font-size: ${props => (props.testimonialStyle ? "3vw" : "5vw")};

  }
  @media screen and (min-width: 992px) {
    font-size: ${props => (props.testimonialStyle ? "180%" : "300%")};

  }
  text-align: center;
  color: #eee;
  padding-bottom: 0;
  margin: 0;
  text-shadow: 0 0 5px #00000066;
`;

export const Description = styled.p`
  color: #eee;
  background-color: #00000076;
  padding: 0.5rem 1rem;
  text-align: center;
  font-size: ${props => (props.testimonialStyle ? "85%" : "100%")};
  letter-spacing: ${props => (props.testimonialStyle ? "0.5px" : "0px")};
`;

export const DataDetail = ({ item, style }) => {
  return (
    <DetailWrapper style={style} testimonialStyle>
      <Headline testimonialStyle>{item.headline}</Headline>
      <Description testimonialStyle>{item.description}</Description>
    </DetailWrapper>
  );
};
