import React, { Fragment, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Hexagon } from './hexagon'
import { Container } from '../../layout'
import { Heading, Paragraph } from '../../typography'
import { DataBoltIcon, EducationIcon, MicroscopeIcon } from '../../icons'
import { useWindowWidth } from '../../../hooks'

const INTERVAL = 5 * 1000
const carouselItems = [
    {
        text: 'Tools',
        path: '/resources/tools',
        icon: MicroscopeIcon,
        backgroundImage: 'http://picsum.photos/600/300',
        heading: 'Take control of your data with customizable tools and workflows',
        body: 'BioData Catalyst provides researchers with collaborative tools and workflows to speed up the process of finding, accessing, sharing, storing, cross-linking, and computing on large-scale data sets.',
    },
    {
        text: 'Data',
        path: '/resources/data',
        icon: DataBoltIcon,
        backgroundImage: 'http://picsum.photos/600/301',
        heading: 'Access biomedical data when you need it and how you need it',
        body: 'Use BioData Catalyst capabilities to access data across boundaries. Easily search for and integrate NHLBI imaging data, TOPMed data, and more.',
    },
    {
        text: 'Learn',
        path: '/resources/training',
        icon: EducationIcon,
        backgroundImage: 'http://picsum.photos/600/302',
        heading: 'Get the support you need to explore, analyze, and discover',
        body: 'Utilize the BioData Catalyst library of video training, supporting documentation, and FAQs to answer questions along the way. If you can’t find what you need in the documentation, our help desk is sure to have the answer.',
    },
]

export const SlideDeckContainer = styled(Container)`
    padding: 3rem;
    min-height: 500px;
    position: relative;
`

export const Slide = styled.div`
    color: #ddd;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transition: ${ props => props.active ? 'opacity 1000ms' : 'opacity 1000ms' };
    opacity: ${ props => props.active ? 1 : 0 };
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: var(--color-eggplant);
        background-image: url(${ props => props.backgroundImage });
        background-position: center;
        background-size: cover;
        background-blend-mode: multiply;
        filter: brightness(2.5);
        z-index: -1;
    }
`

const SlideText = styled(Container)`
    ${
        props => props.active ? `
            transition: transform 500ms ease-out 100ms, opacity 500ms;
            opacity: 1;
            transform: scale(1);
        ` : `
            transition: transform 500ms 250ms, opacity 1000ms;
            opacity: 0;
            transform: scale(0.90);
        `
    }
`

export const TabsContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 270px;
    margin: -4rem 0 0 0;
`

export const Carousel = () => {
    const [index, setIndex] = useState(1)
    const indexRef = useRef(index)
    indexRef.current = index
    const { isCompact } = useWindowWidth()

    useEffect(() => {
        const timer = setInterval(() => setIndex((indexRef.current + 1) % carouselItems.length), INTERVAL)
        return () => clearInterval(timer)
    }, [index])

    const handleHover = newIndex => event => setIndex(newIndex)
    
    return (
        <Fragment>
            <SlideDeckContainer>
                {
                    carouselItems.map((item, i) => (
                        <Slide key={ i } backgroundImage={ item.backgroundImage } active={ index === i }>
                            <SlideText width="80%" maxWidth="700px" active={ index === i }>
                                <Heading center light style={{ width: '90%', margin: '0 auto', fontSize: '220%', padding: '1rem', backgroundColor: '#111133aa' }}>
                                    { item.heading }
                                </Heading>
                                <Paragraph style={{ lineHeight: 1.25, padding: '1rem', backgroundColor: '#111133aa'  }}>
                                    { item.body }
                                </Paragraph>
                            </SlideText>
                        </Slide>
                    ))
                }
            </SlideDeckContainer>

            <TabsContainer>
                {
                    carouselItems.map((tab, i) => (
                        <Hexagon
                            key={ i }
                            path={ tab.path }
                            active={ index === i }
                            size={ isCompact ? window.innerWidth / 3.5 : 200 }
                            growOnActive={ !isCompact }
                            showtext={ !isCompact }
                            text={ tab.text }
                            icon={ tab.icon }
                            hoverHandler={ handleHover(i) }
                        />
                    ))
                }
            </TabsContainer>
        </Fragment>
    )
}
