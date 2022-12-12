import React from 'react'
import styled from "styled-components";

export const DataPanel = styled.div`
  height: 100%;
  width: 100%;
  display: block;
  flex: 1;
  flex: ${props => (props.dataset ? "3" : "1")};
  max-width: ${props => (props.compact ? "none" : "800px")};
  background-color: #00000066;
  text-align: center;
`;

export const DataWrapper = styled.div`
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
  font-size: ${props => (props.dataset ? "150%" : "300%")};
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

export const CarouselBulletedList = styled.ul`
  list-style: none; /* Remove default bullets */
  margin: 1rem;
  text-align: left;
`
;

export const CarouselListItem = styled.li`
  font-size: 130%;
  line-height: 1.5;
  color: #eee;
  padding: 0.5rem;
  &::before {
    content: '•';
    margin: 0 10px;
    color: #f99;
  }
`