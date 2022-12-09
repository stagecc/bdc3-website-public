import React from 'react'
import styled from "styled-components";

export const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: ${props => (props.compact ? "column" : "row")};
  align-items: stretch;
`;