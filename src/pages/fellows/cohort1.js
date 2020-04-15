import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { SEO } from '../../components/seo'
import { PageContent } from '../../components/layout'
import { Title, Heading, Subheading, Subsubheading, Paragraph } from '../../components/typography'
import { useFellows, useWindowWidth } from '../../hooks'
import { Collapser } from '../../components/collapser'
import { kebabCase } from '../../utils'

const FellowHeading = styled(Subheading)`
    margin-bottom: 1rem;
    display: flex;
    flex-direction: ${ props => props.compact ? 'column' : 'row' };
    justify-content: flex-start;
`

const FellowAbstractTitle = styled(Subsubheading)`
    margin: 0;
`

const FellowName = styled.span`
`

const FellowOrganization = styled.span`
    font-style: italic;
    font-weight: normal;
`

const FellowProject = styled.div`
    margin-bottom: 1rem;
    color: var(--color-eggplant);
`

const FellowBio = styled(Paragraph)`
`

const FellowDetails = styled.div`
    flex: 1;
`

const PhotoWrapper = styled.div`
    margin: 2rem;
    max-width: 231px;
    max-height: 200px;
    min-width: 231px;
    min-height: 200px;
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    filter: drop-shadow(0 0 0.25rem rgba(0, 0, 0, 0.2));
`

const FellowPhoto = styled(Img)`
    max-width: 231px;
    max-height: 200px;
    min-width: 231px;
    min-height: 200px;
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
    transition: filter 250ms, transform 500ms;
    filter: saturate(0.5);
    transform: scale(1.0);
    transform-origin: center center;
`

const Profile = styled.article`
    // border: 1px solid #f99; * { border: 1px solid #f99; }
    display: flex;
    flex-direction: ${ props => props.compact ? 'column' : 'row' };
    justify-content: center;
    align-items: ${ props => props.compact ? 'center' : 'flex-start' };
    margin-bottom: 3rem;
    &:hover ${ FellowPhoto } {
        transition: filter 500ms, transform 250ms;
        filter: saturate(1.0);
        transform: scale(1.02);
    }
`

const FellowsPage = () => {
    const fellows = useFellows()
    const { isCompact } = useWindowWidth()

    return (
        <PageContent width="95%" maxWidth="1200px" center gutters>
            <SEO
                title="Cohort I Fellows"
                description=""
                keywords=""
            />

            <Title>Cohort I Fellows</Title>
            
            <section id="overview">
                <Paragraph>
                    The NHLBI BioData Catalyst Fellows Program provides researchers, especially early-career researchers, the opportunity to receive funding to support research on novel and innovative data science and data-focused research problems. 
                </Paragraph>
                <Paragraph>
                    Cohort I Fellows will work on the BioData Catalyst Ecosystem from March 2020 to March 2021.
                </Paragraph>
            </section>

            <section id="fellows">
                <Heading>Meet the Fellows</Heading>
                {
                    fellows.map(fellow => (
                        <Profile key={ kebabCase(fellow.project.title.slice(0, 20)) } compact={ isCompact }>
                            <PhotoWrapper>
                                <FellowPhoto fixed={ fellow.photo.childImageSharp.fixed } />
                            </PhotoWrapper>
                            <FellowDetails>
                                <FellowHeading compact={ isCompact }>
                                    <FellowName center={ isCompact }>{ fellow.name }</FellowName>
                                    { !isCompact && <span>&nbsp;-&nbsp;</span> }
                                    <FellowOrganization center={ isCompact }>{ fellow.university }</FellowOrganization>
                                </FellowHeading>
                                <FellowBio dangerouslySetInnerHTML={{ __html: fellow.bio }} />
                                <Collapser
                                    title={ <FellowAbstractTitle>Project: { fellow.project.title }</FellowAbstractTitle> }
                                    ariaId={ `${ kebabCase(fellow.project.title.slice(0, 20)) }_abstract` }
                                >
                                    <Paragraph>
                                        Abstract: { fellow.project.abstract }
                                    </Paragraph>
                                </Collapser>
                            </FellowDetails>
                        </Profile>
                    ))
                }
            </section>

        </PageContent>
    )
}

export default FellowsPage
