import React from 'react'
import { SEO } from '../components/seo'
import { PageContent } from '../components/layout'
import { Title, Heading, Paragraph } from '../components/typography'
import { ExternalLink } from '../components/link'

const LegalPage = () => (
    <PageContent width="95%" maxWidth="1080px" center gutters>
        <SEO
            title="Legal"
            description=""
            keywords=""
        />

        <Title>Legal Information</Title>
        
        <Heading>NHLBI BioData Catalyst Cloud Use Statement</Heading>

        <Paragraph>
            The NHLBI BioData Catalyst Ecosystem will employ Amazon Web Services and Google Cloud Platform for data storage and compute.
            NHLBI BioData Catalyst comprises the Data Commons Framework Services (DCFS) hosted and operated by the University of Chicago.
            DCFS will provide the gold master data reference as well as authorization/authentication and indexing services.
            The DCFS will also enable security interoperability with the secure workspaces.
            Workspaces will be provided by Terra, hosted and operated by the Broad Institute;
            Fair4Cures, hosted and operated by Seven Bridges Genomics; and i2b2/tranSMART, hosted by the University of Chicago and operated by Harvard Medical School.
        </Paragraph>

        <Paragraph>
            For the NHLBI BioData Catalyst Ecosystem, the NHLBI Designated Authorizing Official has recognized the Authority to Operate (ATO) issued to the Broad Institute,
            University of Chicago and Seven Bridges Genomics as presenting acceptable risk, and therefore the NCI ATO serves as an Interim Authority to Test (IATT) when used by designated TOPMed investigators and collaborators.
        </Paragraph>

        <Paragraph>
            Amazon Web Services (AWS) is a secure cloud services platform offering compute power, database storage, content delivery, and other functionality
            that will allow the NHLBI BioData Catalyst Ecosystem to deploy sophisticated analysis efforts on large scale phenotypic and genomic datasets quickly and cost-effectively.
            It is a secure, durable technology platform with industry-recognized certifications and audits: PCI DSS Level 1, ISO 27001, FISMA Moderate, FedRAMP, HIPAA, and SOC 1 (formerly referred to as SAS 70 and/or SSAE 16) and SOC 2 audit reports.
            Their services and data centers have multiple layers of operational and physical security to ensure the integrity and safety of data.
            AWS has summarized how their platform supports compliance with controlled-access datasets in a white paper,
            including best practices for dbGaP: <ExternalLink to="https://d0.awsstatic.com/whitepapers/compliance/AWS_dBGaP_Genomics_on_AWS_Best_Practices.pdf">https://d0.awsstatic.com/whitepapers/compliance/AWS_dBGaP_Genomics_on_AWS_Best_Practices.pdf</ExternalLink>.
        </Paragraph>

        <Paragraph>
            Google Cloud Platform is a cloud computing service by Google that offers hosting on the same supporting infrastructure that Google uses internally for end-user products like Google Search.
            Google undergoes several independent third party audits on a regular basis to provide verification of security, privacy, and compliance controls including annual audits for SSAE 16/ISAE 3402 Type II.
            Google's infrastructure provides reliable information security that can meet or exceed the requirements of HIPAA and protected health information.
            The Google Cloud Platform has summarized its services with respect to genomics data processing in a white paper here: <ExternalLink to="https://cloud.google.com/genomics/resources/google-genomics-whitepaper.pdf">https://cloud.google.com/genomics/resources/google-genomics-whitepaper.pdf</ExternalLink>.
        </Paragraph>

    </PageContent>
)

export default LegalPage
