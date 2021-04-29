import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import bdcLogo from '../../images/bdc-logo.svg'
import bdcLogoWhite from '../../images/bdc-logo-white.svg'

const BrandContainer = styled(Link).attrs({
  className: 'brand',
})(({ compact }) => `
  height: 100%;
  margin: auto 0;
  padding: 0 1rem;
  transition: transform 250ms, max-width 250ms;
  transform: translateX(${ compact ? '-34%' : '0' });
  transformOrigin: 0% 50%;
`)

export const Brand = ({ path = '/', white = false, height = 'auto', width = 'auto', style }) => {
  return (
    <BrandContainer to={ path } style={{ ...style, maxWidth: width }}>
      <img src={ white ? bdcLogoWhite : bdcLogo } height="auto" width="100%" alt="BioData Catalyst logo" />
    </BrandContainer>
  )
}