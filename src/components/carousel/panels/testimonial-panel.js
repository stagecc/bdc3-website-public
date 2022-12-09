import React from 'react'
import styled from "styled-components";
import { testimonialContent } from '../types'

const style = {
  margin: 0,
  flex: 1,
  padding: '1rem',
  border: '10px dashed #f90',

}

const Overlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  /* flex-direction: ${props => (props.compact ? "column" : "row")}; */
  align-items: stretch;
`;

export const TestimonialPanel = ({ content }) => {
  return (
    <Overlay>
      <pre style={ style }>
        { JSON.stringify(content, null, 2) }
      </pre>
    </Overlay>
  )
}

TestimonialPanel.propTypes = {
  content: testimonialContent,
}
