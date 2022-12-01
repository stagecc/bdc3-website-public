import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { animated } from "react-spring";

export const DataPanel = styled.div`
  height: 100%;
  width: 100%;
  display: ${props => (props.testimonialStyle ? "none" : "block")};
  flex: ${props => (props.compact ? "1 0 50%" : "3")};
  max-width: ${props => (props.compact ? "none" : "800px")};
  background-color: #00000066;
  text-align: center;
`;

const DataWrapper = styled(animated.div)`
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

export const Data = ({ data, style }) => {
  const [dataIndex, setDataIndex] = useState(0);
  const dataIndexRef = useRef(dataIndex);
  dataIndexRef.current = dataIndex;

  useEffect(() => {
    const timer = setInterval(
      () => setDataIndex(dataIndexRef.current + 1),
      500
    );
    return () => clearInterval(timer);
  }, [dataIndex]);

  return (
    <DataWrapper style={style} >
      {data.map((datum, i) => (
        <Datum key={i} active={i < dataIndex}>
          <DatumValue>{datum.value}</DatumValue>
          <DatumName>{datum.name}</DatumName>
        </Datum>
      ))}
    </DataWrapper>
  );
};
