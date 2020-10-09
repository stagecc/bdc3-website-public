import React from 'react'
import { SEO } from '../components/seo'
import { PageContent } from '../components/layout'
import { Title, Paragraph } from '../components/typography'
import { ExternalLink } from '../components/link'

const Covid19Page = () => {
    return (
        <PageContent width="95%" maxWidth="1200px" center gutters>
            <SEO
                title="COVID-19"
                description=""
                keywords=""
            />
            
            <Title>About BioData Catalyst COVID-19 Data</Title>

            <Paragraph>
                NHLBI's response to the public health threat posed by COVID-19 includes
                a <ExternalLink to="https://www.nhlbi.nih.gov/directors-messages/coronavirus-covid-19-nhlbi-response">multi-pronged research strategy</ExternalLink>,
                which includes translational research, clinical trials, clinical epidemiology, and population science.
                The NHLBI will also leverage its cyberinfrastructure, namely the BioData Catalyst ecosystem,
                to help coordinate various data management needs among many of the COVID-19 efforts.
            </Paragraph>

            <Paragraph>
                BioData Catalyst will support data aggregation, rapid and broad access, and computation on NHLBI-funded COVID-19 datasets.
                In an effort to drive more impactful analyses, BioData Catalyst will be interoperable with other COVID-19 data resources.
            </Paragraph>

            <Paragraph>
                At this time, however, we do not have information about the specific COVID-19 data
                BioData Catalyst will host or when it will become available.
            </Paragraph>

            <Paragraph>
                Please check back regularly and look for announcements for updates.
            </Paragraph>

        </PageContent>
    )
}

export default Covid19Page
