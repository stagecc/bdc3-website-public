import React from 'react'
import { SEO } from '../../components/seo'
import { PageContent } from '../../components/layout'
import { Title, Heading, Paragraph } from '../../components/typography'
import { ButtonExternalLink } from '../../components/buttons'

const ByodPage = () => (
    <PageContent width="95%" maxWidth="1200px" center gutters>
        <SEO
            title="Bring Your Own Data"
            description=""
            keywords=""
        />

        <Title>Bring Your Own Data</Title>
        
        <Paragraph>
            To support flexibility and analysis, we allow researchers to bring their own data and workflows into the ecosystem.
            Researchers can bring their own datasets into BioData Catalyst powered by Seven Bridges and BioData Catalyst powered by Terra.
        </Paragraph>
        
        <br/>
        
        <section>
            <Heading>Build on Your Existing Work</Heading>

            <Paragraph>
                As described in the BioData Catalyst Data Use Policy, users can upload data for which they have the appropriate approval,
                provided that they do not violate the terms of their Data Use Agreements, Limitations, or Institutional Review Board policies and guidelines.
            </Paragraph>

            <br/>

            <Paragraph center>
                <ButtonExternalLink to="https://sb-biodatacatalyst.readme.io/docs/upload-to-the-platform">BYOD to BioData Catalyst powered by Seven Bridges</ButtonExternalLink>
            </Paragraph>
            
            <br/>

            <Paragraph center>
                <ButtonExternalLink to="https://support.terra.bio/hc/en-us/articles/360024056512-Uploading-to-a-workspace-Google-bucket">BYOD to BioData Catalyst powered by Terra</ButtonExternalLink>
            </Paragraph>
        </section>

        <br/>

        <section>
            <Heading>Data Use Policy Statement</Heading>

            <Paragraph>
                BioData Catalyst adheres to internationally recognized policies for data access and release that have been developed
                to enable broad access to data on the BioData Catalyst ecosystem.
                Data available on the BioData Catalyst ecosystem are subject to both general and data-set specific data use policies,
                and access to controlled data are restricted to authorized users.
                As a BioData Catalyst user, you are solely responsible for adhering to Data Use Agreement(s),
                Institutional Review Board policies and guidelines, and other Data Use Limitations when uploading
                or downloading data on the BioData Catalyst ecosystem. 
            </Paragraph>
        </section>

    </PageContent>
)

export default ByodPage
