import React, { Fragment, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'
import { PlayIcon, StopIcon } from '../../icons'
// import { useLocalStorage } from '../../../hooks'

const INTERVAL = 3 * 1000
const WAIT_TIME = 5 * 1000

const carouselItems = [
    {
        headline: 'We have so much data!',
        description: 'Take control of your data with customizable tools and workflows',
        data: [
            { name: 'Participants', value: 54854 },
            { name: 'Whole Genome Sequences', value: 3216 },
            { name: 'Petabytes of Data', value: 3 },
        ],
    },
    {
        headline: 'Diverse data is a first-class priority',
        description: 'BioData catalyst provides more diverse population data than any other resource',
        data: [
            { name: 'Phenotypes', value: 999 },
            { name: 'Interesting Value', value: 42 },
        ],
    }
]

const Toggler = styled.button`
    z-index: 9;
    position: absolute;
    top: 1rem;
    left: 0;
    transform: translateX(calc(-90% + 24px));
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 75%;
    padding: 1rem 0.75rem;
    white-space: nowrap;
    transition: opacity 250ms ease-in, transform 250ms ease-in, max-width 250ms;
    opacity: 0.1;
    background-color: #333;
    color: #eee;
    border: 1px solid #999;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    &:hover {
        opacity: 1.0;
        transform: translateX(-1px);
    }
`

const Wrapper = styled.div`
    border: 2px solid #99f;
    &:hover ${ Toggler } {
        opacity: 0.75;
    }
`

const DataContainer = styled(animated.div)`
    // border: 1px solid #9f9;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
`

const DataDetails = styled.div`
    // * { border: 1px solid #f99; }
    flex: 2;
    @media screen and (min-width: 992px) {
        flex: 4;
    }
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Headline = styled.h1`
    // border: 1px solid #99f;
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

const Description = styled.p`
    color: #eee;
    background-color: #00000066;
    padding: 0.5rem 1rem;
    text-align: center;
`

const Data = styled.div`
    background-color: #00000066;
    // border: 1px solid #f99;
    flex: 1;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
`

const DatumName = styled.span`
    font-size: 90%;
    color: #eee;
`

const DatumValue = styled.span`
    font-size: 300%;
    font-weight: bold;
    // color: var(--color-crimson);
    color: #f99;
`

const Datum = styled.span`
    // border: 1px solid #fff;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: transform 500ms;
    transform: translateX(${ props => props.active ? '0%' : '100%' });
    &:first-child { padding-top: 1rem; }
    &:last-child { padding-bottom: 1rem; }
    ${ DatumValue } {
        transition: opacity 1500ms 0ms;
        opacity: ${ props => props.active ? '1.0' : '0.0' };
    }
    ${ DatumName } {
        transition: opacity 1500ms 100ms;
        opacity: ${ props => props.active ? '1.0' : '0.0' };
    }
`

const DataSet = ({ active, set, shouldAnimate }) => {
    const { data } = set
    const subInterval = shouldAnimate ? INTERVAL / (set.data.length + 1) : 0
    const [dataIndex, setDataIndex] = useState(0)
    const indexRef = useRef(dataIndex)
    indexRef.current = dataIndex

    const DataContainerAnimation = useSpring({
        opacity: 1.0,
        from: {
            opacity: 0.0,
        },
    })

    useEffect(() => {
        const timer = setInterval(() => setDataIndex(indexRef.current + 1), subInterval)
        return () => clearInterval(timer)
    }, [dataIndex, subInterval])

    return (
        <DataContainer active={ active } style={ DataContainerAnimation }>
            <DataDetails>
                <Headline>{ set.headline }</Headline>
                <Description>{ set.description }</Description>
            </DataDetails>
            <Data>
                {
                    data.map((datum, j) => (
                        <Datum key={ j } active={ j < dataIndex }>
                            <DatumValue>{ datum.value }</DatumValue>
                            <DatumName>{ datum.name }</DatumName>
                        </Datum>
                    ))
                }
            </Data>
        </DataContainer>
    )
}

export const DataCarousel = () => {
    const [carouselIndex, setCarouselIndex] = useState(0)
    const indexRef = useRef(carouselIndex)
    indexRef.current = carouselIndex
    const [animationsOn, setAnimationsOn] = useState(true)
    // const [animationsOn, setAnimationsOn] = useLocalStorage('animationsOn', true)

    const handleToggleAnimations = () => {
        console.log(animationsOn ? 'Animations stopped.' : 'Animations resumed.')
        setAnimationsOn(!animationsOn)
    }

    useEffect(() => {
        let timer
        if (animationsOn) {
            timer = setInterval(() => setCarouselIndex((indexRef.current + 1) % carouselItems.length), INTERVAL + WAIT_TIME)
        }
        return () => clearInterval(timer)
    }, [carouselIndex, animationsOn])

    return (
        <Wrapper>
            <Toggler onClick={ handleToggleAnimations }>
                {
                    animationsOn && typeof animationsOn === 'boolean'
                        ? <Fragment><span style={{ margin: ' 0 1rem 0 0' }}>Stop Animations</span><StopIcon size={ 16 } fill="#fff"/></Fragment>
                        : <Fragment><span style={{ margin: ' 0 1rem 0 0' }}>Resume Animations</span><PlayIcon size={ 16 } fill="#fff"/></Fragment>
                }
            </Toggler>
            {
                carouselItems.map((item, i) => {
                    return i === carouselIndex && (
                        <DataSet key={ i } set={ item } shouldAnimate={ animationsOn }/>
                    )
                })
            }
        </Wrapper>
    )

}
