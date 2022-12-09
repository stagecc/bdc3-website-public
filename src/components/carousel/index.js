import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from "styled-components";
import { useWindowWidth } from "../../hooks";
import { panelType } from './types'
import { CarouselPanel } from './panels'
import backgroundImage from "../../images/stars-long-exposure.png";

const INTERVAL = 2000 // ms

const wrapperStyle = {
  border: '2px solid #456',
  margin: '1rem',
  padding: '1rem',
  minHeight: '400px',
  maxHeight: '400px',
  display: 'flex',
}


export const Carousel = ({ panels }) => {
  const [carouselIndex, setCarouselIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(
      () => setCarouselIndex((carouselIndex + 1) % panels.length),
      INTERVAL,
    )
    return () => clearInterval(timer)
  }, [carouselIndex, panels])

  return (
    <CarouselPanel data={ panels[carouselIndex] } />
  )
}

//

Carousel.propTypes = {
  panels: PropTypes.arrayOf(panelType)
}