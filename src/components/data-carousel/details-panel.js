import React from 'react'
import styled from 'styled-components'
import { animated } from 'react-spring'

export const DetailsPanel = styled.div`
    flex: ${ props => props.compact ? '1 0 50%' : '3' };
    height: 100%;
    width: 100%;
    position: relative;
`

export const DetailWrapper = styled(animated.div)`
    position: absolute;
    height: 100%;
    width: 100%;
    flex: 2;
    @media screen and (min-width: 992px) {
        flex: 4;
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Headline = styled.h1`
    font-size: 24pt;
    padding: 0 1rem;
    @media screen and (min-width: 768px) {
        font-size: 5vw;
    }
    @media screen and (min-width: 992px) {
        font-size: 300%;
    }
    text-align: center;
    color: #eee;
    padding-bottom: 0;
    margin: 0;
    text-shadow: 0 0 5px #00000066;
`

export const Description = styled.p`
    color: #eee;
    background-color: #00000066;
    padding: 0.5rem 1rem;
    text-align: center;
`

export const DataDetail = ({ item, style }) => {
    return (
        <DetailWrapper style={ style }>
            <Headline>{ item.headline }</Headline>
            <Description>{ item.description }</Description>
        </DetailWrapper>
    )
}