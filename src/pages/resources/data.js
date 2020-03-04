import React from 'react'
import Img from 'gatsby-image'
import { SEO } from '../../components/seo'
import { PageContent } from '../../components/layout'
import { Title, Heading, Subheading, Paragraph } from '../../components/typography'
import { BulletedList, ListItem } from '../../components/list'
import { ButtonExternalLink } from '../../components/buttons'
import { ExternalLink } from '../../components/link'

const DataPage = ({ data }) => {
    const { dataBucketsGraphic } = data

    return (
        <PageContent width="95%" maxWidth="1200px" center gutters>
            <SEO
                title="BioData Catalyst Data Access"
                description=""
                keywords=""
            />

            <Title>Accessing BioData Catalyst Data</Title>
            
            <section>
                <Heading>About BioData Catalyst Datasets</Heading>
    
                <Paragraph>
                    The BioData Catalyst ecosystem currently hosts a number of controlled datasets:
                </Paragraph>
    
                <BulletedList dense>
                    <ListItem primary={ <span>The Trans-omics for Precision Medicine (<ExternalLink to="https://www.nhlbiwgs.org/">TOPMed</ExternalLink>) initiative</span> } />
                    <ListItem primary={ <span>The Chronic Obstructive Pulmonary Disease (<ExternalLink to="http://www.copdgene.org/">COPD</ExternalLink>) Gene Study</span> } />
                </BulletedList>
            </section>

            <br/>

            <section>
                <Heading>How Data Access Works on BioData Catalyst</Heading>

                <Paragraph>
                    The BioData Catalyst ecosystem manages access to the hosted controlled data using data access approvals
                    from the NIH Database of Genotypes and Phenotypes (<ExternalLink to="https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?page=login">dbGaP</ExternalLink>).
                    Therefore, users who want to access one or more of the hosted controlled studies on the ecosystem must be approved for access to that study in dbGaP. 
                </Paragraph>
                
                <Paragraph>
                    Users log into BioData Catalyst platforms with their eRA Commons credentials and authentication is performed by iTrust.
                </Paragraph>
                
                <Img style={{ width: '90%', margin: 'auto' }} fluid={ dataBucketsGraphic.childImageSharp.fluid } alt="Data access flow chart - see description that follows" />
            </section>
            
            <br/>
            
            <section>
                <Subheading>Data Access Highlights</Subheading>

                <BulletedList>
                    <ListItem primary={ `
                        Principal Investigators (PIs) who have approved Data Access Requests (DARs) on dbGaP for BioData Catalyst datasets will be able to programmatically access those data within the BioData Catalyst ecosystem.
                    ` } />
                    <ListItem primary={
                        <span>
                            PIs with approved DARs can give lab staff access to the hosted datasets on the BioData Catalyst ecosystem by giving the lab staff "designated downloader status" on dbGaP.
                            { ' ' }<ExternalLink to="https://www.youtube.com/watch?v=Yem3OH26kX4&t=1s">Learn more about this process</ExternalLink>.
                        </span>
                    } />
                    <ListItem primary={ `
                        Please note that having other researchers listed on your dbGaP DAR application as internal and external collaborators will not result in these individuals having access to hosted datasets on BioData Catalyst.
                        PIs will need to add internal collaborators from their dbGaP application to the list of designated downloaders as described above.
                        In addition, external collaborators will need to obtain DAR approval for those at their institutions.
                    ` }/>
                </BulletedList>
            </section>

        </PageContent>
    )
}

export default DataPage

export const query = graphql`
    {
        dataBucketsGraphic: file(relativePath: {eq: "data-buckets.png"}) {
            childImageSharp {
                fluid {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`