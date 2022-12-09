import React from 'react'
import styled from "styled-components";
import { statsContent } from '../types'

const style = {
  margin: 0,
  flex: 1,
  padding: '1rem',
  border: '10px dashed #0f9',

}
const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: ${props => (props.compact ? "column" : "row")};
  align-items: stretch;
`;
export const DetailsPanel = styled.div`
  flex: ${props => (props.compact ? "1 0 50%" : "3")};
  height: 100%;
  width: 100%;
  position: relative;
`;

export const DetailWrapper = styled.div`
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
  font-size: 1rem;
  padding: 0 1rem;
  @media screen and (min-width: 768px) {
    font-size: 3vw;

  }
  @media screen and (min-width: 992px) {
    font-size: 180%;

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
  font-size: 85%;
  letter-spacing: 0.5px;
`;

export const DataPanel = styled.div`
  height: 100%;
  width: 100%;
  display: block;
  flex: 1;
  max-width: ${props => (props.compact ? "none" : "800px")};
  background-color: #00000066;
  text-align: center;
`;

const DataWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  position: relative;
`;

export const DatumName = styled.span`
  font-size: 90%;
  color: #eee;
`;

export const DatumValue = styled.span`
  font-size: 300%;
  font-weight: bold;
  // color: var(--color-crimson);
  color: #f99;
`;

export const Datum = styled.span`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 500ms;
  transform: translateX(${props => (props.active ? "0%" : "100%")});
  &:first-child {
    padding-top: 1rem;
  }
  &:last-child {
    padding-bottom: 1rem;
  }
`;

export const StatsPanel = ({ content }) => {
  return (
    <Overlay>
      <DetailsPanel>
        <DetailWrapper>
          <Headline>{content.headline}</Headline>
          <Description>{content.description}</Description>
        </DetailWrapper>
      </DetailsPanel>
      <DataPanel>
        <DataWrapper>
          {content.stats.map((datum, i) => (
            <Datum key={i} active>
              <DatumValue>{datum.value}</DatumValue>
              <DatumName>{datum.name}</DatumName>
            </Datum>
          ))}
        </DataWrapper>
      </DataPanel>
    </Overlay>
  )
}

StatsPanel.propTypes = {
  content: statsContent,
}
