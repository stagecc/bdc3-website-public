import React from 'react'
import styled, { keyframes } from 'styled-components'
import { SEO } from '../components/seo'
import { PageContent } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import ServiceDataSvg from '../images/service-ecosystem/service-data.svg' 
import ServiceSearchSvg from '../images/service-ecosystem/service-search.svg' 
import ServiceAnalysisSvg from '../images/service-ecosystem/service-analysis.svg' 
import ServiceDataSvgMobile from '../images/service-ecosystem/mobile_service-data.svg' 
import ServiceSearchSvgMobile from '../images/service-ecosystem/mobile_service-search.svg' 
import ServiceAnalysisSvgMobile from '../images/service-ecosystem/mobile_service-analysis.svg' 
import { useWindowWidth } from '../hooks'

const marchAnimation = keyframes`
    0% { stroke-dashoffset: 0; }
    100% { stroke-dashoffset: 6; }
`

const AnimateDashedBorder = styled.div`
    .dashed-border {
        animation: ${ marchAnimation } 4000ms linear infinite;
    }
`

const EcosystemPage = () => {
    const { isCompact } = useWindowWidth()
    
    return (
        <PageContent width="95%" maxWidth="1080px" center gutters>
            <SEO
                title="Platforms & Services"
                description=""
                keywords=""
            />

            <Title>The BioData Catalyst Ecosystem</Title>

            <Paragraph>
                For academic heart, lung, blood, and sleep researchers (with access to TOPMed data and capacity to analyze it),
                the BioData Catalyst ecosystem several platforms and services to explore and analyze
                both private and publicly hosted datasets in the cloud using pre-built and custom workflows.
            </Paragraph>
                        
            {
                /**
                *    TODO
                *    - add <title>s in SVGs
                *    - <desc>s ?
                *    - swap in mobile versions
                *    - make all IDs unique across all SVGs
                *    - unrelated, but get at least 64x64 favicon
                **/
            }

            <br/>
            
            {
                isCompact
                    ? <AnimateDashedBorder><ServiceDataSvgMobile width="100%" height="none" /></AnimateDashedBorder>
                    : <AnimateDashedBorder><ServiceDataSvg width="100%" height="none" /></AnimateDashedBorder>
            }

            <br/>
            
            <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi voluptates, perspiciatis aut doloremque porro reprehenderit repudiandae. Amet nostrum adipisci, impedit vero necessitatibus quam reiciendis tenetur ipsam ab itaque repudiandae cumque voluptas totam nemo unde sed, alias aliquam qui, debitis obcaecati sunt! A maxime provident porro.
            </Paragraph>

            <br/>
            
            {
                isCompact
                    ? <AnimateDashedBorder><ServiceSearchSvgMobile width="100%" height="none" /></AnimateDashedBorder>
                    : <AnimateDashedBorder><ServiceSearchSvg width="100%" height="none" /></AnimateDashedBorder>
            }

            <br/>
            
            <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt animi mollitia ex, vitae quidem. Corrupti amet quae pariatur, eligendi et nihil consequatur! Labore mollitia consequatur asperiores, vitae repellendus? Illum excepturi numquam molestiae ex praesentium. Fugiat repellendus nobis, at, blanditiis ad ullam reprehenderit perferendis explicabo reiciendis!
            </Paragraph>
            
            <br/>

            {
                isCompact
                    ? <AnimateDashedBorder><ServiceAnalysisSvgMobile width="100%" height="none" /></AnimateDashedBorder>
                    : <AnimateDashedBorder><ServiceAnalysisSvg width="100%" height="none" /></AnimateDashedBorder>
            }
            
            <br/>
            
            <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates fuga ratione eveniet, inventore. Beatae, aperiam sunt repellendus. Nobis cum impedit dolore alias officia voluptatem nesciunt, tempora totam iure consequatur modi atque facilis velit consectetur corrupti nihil. Deleniti nesciunt saepe placeat ullam, amet fuga voluptates et.
            </Paragraph>

        </PageContent>
    )
}

export default EcosystemPage
