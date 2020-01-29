import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import bdcLogo from '../../images/bdc-logo.svg'
import bdcLogoWhite from '../../images/bdc-logo-white.svg'

const BrandContainer = styled(Link)`
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
`

export const Brand = ({ path = '/', white = false, height = 'auto', width = 'auto', style }) => {
    return (
        <BrandContainer to={ path } style={{ ...style, maxWidth: width }}>
            <img src={ white ? bdcLogoWhite : bdcLogo } height="auto" width="100%" alt="BioData Catalyst logo" />
        </BrandContainer>
    )
}