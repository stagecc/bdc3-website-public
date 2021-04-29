import React from 'react'
import { SEO } from '../../components/seo'
import { PageContent } from '../../components/layout'
import { Title, Heading, Paragraph } from '../../components/typography'
import { useFellows } from '../../hooks'
import { kebabCase } from '../../utils'
import { FellowsLinkList, FellowsLinkListItem, FellowsProfile } from '../../components/fellows'


const FellowsCohort2Page = () => {
    const { cohortTwo } = useFellows()

    return (
        <PageContent width="95%" maxWidth="1200px" center gutters>
            <SEO
                title="Cohort II Fellows"
                description=""
                keywords=""
            />

            <Title>Cohort II Fellows</Title>
            
            <section id="overview">
                <Paragraph>
                    The NHLBI BioData Catalyst Fellows Program provides researchers, especially early-career researchers,
                    the opportunity to receive funding to support research on novel and innovative data science and data-focused research problems. 
                </Paragraph>
                <Paragraph>
                    Cohort 2 Fellows will work on the BioData Catalyst Ecosystem from September 2020 to September 2021.
                </Paragraph>
            </section>
            

            <section id="fellows">
                <Heading>Meet the Fellows</Heading>

                <FellowsLinkList>
                    {
                        cohortTwo.map(fellow => (
                            <FellowsLinkListItem key={ kebabCase(fellow.name.replace(/,.+$/, '')) }
                                path={ `/fellows/cohort2#${ kebabCase(fellow.name.replace(/,.+$/, '')) }` }
                                text={ fellow.name }
                            />
                        ))
                    }
                </FellowsLinkList>

                {
                    cohortTwo.map(fellow => (
                        <FellowsProfile
                            key={ kebabCase(fellow.name.replace(/, Ph\.D\.$/, '')) }
                            name={ fellow.name }
                            institution={ fellow.university }
                            bio={ fellow.bio }
                            projectTitle={ fellow.project.title }
                            projectAbstract={ fellow.project.abstract }
                            photo={ fellow.photo.childImageSharp.fixed }
                        />
                    ))
                }
            </section>

        </PageContent>
    )
}

export default FellowsCohort2Page
