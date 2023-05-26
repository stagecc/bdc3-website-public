import React from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player'

const ResponsiveWrapper = styled.div(({ theme }) => `
  position: relative;
  padding: 0;
  padding-top: 56.25%;
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.25));
  & .player {
    position: absolute;
    top: 0;
    left: 0;
  }
`)

export const VideoPlayer = ({ url, ...props }) => {
  return (
    <ResponsiveWrapper>
      <ReactPlayer
        className="player"
        url={ url }
        width="100%"
        height="100%"
        { ...props }
      />

    </ResponsiveWrapper>
  )  
}