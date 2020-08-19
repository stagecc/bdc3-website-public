import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useWindowWidth } from '../../hooks'
import { useTransition } from 'react-spring'
import { DetailsPanel, DataDetail } from './details-panel'
import { DataPanel, Data } from './data-panel'
import { PauseIcon, PlayIcon } from '../icons'
import backgroundImage from '../../images/stars-long-exposure.png'

const INTERVAL = 2 * 1000
// speed up animation time in dev, leave appropriate wait time in prod
const WAIT_TIME = process.env.NODE_ENV === 'production' ? 5 * 1000 : 1 * 1000

const carouselItems = [
    {
        key: 0,
        headline: 'Advancing access to TOPMed data',
        description: 'BioData Catalyst provides one point of entry to the most TOPMed datasets, including Freeze 5b data.',
        data: [
            { name: 'Participants', value: '73,223' },
            { name: 'Petabytes of Data', value: '2.82' },
        ],
    },
    {
        key: 1,
        headline: 'Prioritizing diverse data',
        description: 'BioData Catalyst provides access to the highly diverse TOPMed dataset.',
        data: [
            { name: 'Participants with phenotypes', value: '241,956' },
        ],
    }
]

const StateNote = styled.span`
    color: #eee;
    background-color: #000000;
    position: absolute;
    top: 1rem;
    left: 0;
    padding: 0.5rem;
    padding-left: 1rem;
    border-radius: 4px;
    font-size: 65%;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    cursor: default;
    transition: transform 250ms, filter 250ms;
    transform: translateX(calc(-100% + 32px));
    filter: opacity(0.5);
    &:hover {
        transform: translateX(-0.25rem);
        filter: opacity(0.0);
    }
`

const Border = styled.div`
    filter: drop-shadow(0 0.75rem 0 var(--color-crimson));
`

const Wrapper = styled.div`
    // & * { border: 1px solid #f99; }
    height: 20vw;
    min-height: ${ props => props.compact ? '600px' : '300px' };
    max-height: ${ props => props.compact ? '700px' : '500px' };
    overflow: hidden;
    margin-bottom: 4rem;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% calc(100% - 5vw));
    position: relative;
    transition: filter 250ms;
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: #005489;
        background-image: url(${ props => props.backgroundImage });
        background-position: center;
        background-size: cover;
    }
    &:hover ${ StateNote } {
        filter: opacity(1.0);
    }
    &:focus {
        border: 1px dashed var(--color-crimson);
        filter: saturate(0.75);
    }
`

const Overlay = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: ${ props => props.compact ? 'column' : 'row' };
    align-items: stretch;
`

export const DataCarousel = () => {
    const { isCompact } = useWindowWidth()
    const [carouselIndex, setCarouselIndex] = useState(0)
    const indexRef = useRef(carouselIndex)
    indexRef.current = carouselIndex
    const [playingAnimations, setPlayingAnimations] = useState(true)

    useEffect(() => {
        if (playingAnimations) {
            let timer
            timer = setInterval(() => setCarouselIndex((indexRef.current + 1) % carouselItems.length), INTERVAL + WAIT_TIME)
            return () => clearInterval(timer)
        }
    }, [carouselIndex, playingAnimations])

    const handleKeyDown = event => {
        if (event.keyCode === 32) {
            event.preventDefault()
            setPlayingAnimations(!playingAnimations)
        }
    }

    const detailsTransitions = useTransition(carouselItems[carouselIndex], item => item.key, {
        from: { opacity: 0, transform: 'perspective(600px) translate3d(0, -80%, -300px)' },
        enter: { opacity: 1, transform: 'perspective(600px) translate3d(0, 0, 0)' },
        leave: { opacity: 0, transform: 'perspective(600px) translate3d(0, 80%, -300px)' },
        config: {
            mass: 2,
            tension: 150,
            friction: 30,
        },
    })

    const dataTransitions = useTransition(carouselItems[carouselIndex], item => item.key, {
        from: { opacity: 0, },
        enter: { opacity: 1, },
        leave: { opacity: 0, },
    })

    return (
        <Border>
            <Wrapper
                compact={ isCompact }
                backgroundColor="#00abf5"
                backgroundImage={ backgroundImage }
                tabIndex="0"
                onMouseOver={ () => setPlayingAnimations(false) }
                onFocus={ () => setPlayingAnimations(false) }
                onMouseLeave={ () => setPlayingAnimations(true) }
                onKeyDown={ handleKeyDown }
            >
                <Overlay compact={ isCompact }>
                    <DetailsPanel compact={ isCompact }>
                        { detailsTransitions.map(({ item, props, key }) => <DataDetail key={ key } style={ props } item={ item } />) }
                    </DetailsPanel>
                    <DataPanel compact={ isCompact }>
                        { dataTransitions.map(({ item, props, key }) => <Data key={ key } style={ props } data={ item.data } />) }
                    </DataPanel>
                    <StateNote>
                        <span style={{ marginRight: '0.5rem' }}>Animations paused</span>
                        { playingAnimations ? <PlayIcon size={ 16 } fill="#fff"/> : <PauseIcon size={ 16 } fill="#fff"/> }
                    </StateNote>
                </Overlay>
            </Wrapper>
        </Border>
    )
}