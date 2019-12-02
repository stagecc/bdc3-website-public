import React from 'react'
import bdcLogo from '../../images/bdc-logo.svg'
import bdcLogoWhite from '../../images/bdc-logo-white.svg'

export const Brand = ({ white = false, height = 60 }) => {
    return <img src={ white ? bdcLogoWhite : bdcLogo } height={ height } alt="BioData Catalyst logo"/>
}