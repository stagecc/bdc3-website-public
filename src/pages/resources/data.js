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
            
            <Heading>About the BioData Catalyst Datasets</Heading>

            <Paragraph>
                The BioData Catalyst ecosystem currently hosts a number of controlled datasets:
            </Paragraph>

            <BulletedList dense>
                <ListItem primary={ <span>The Trans-omics for Precision Medicine (<ExternalLink to="https://www.nhlbiwgs.org/">TOPMed</ExternalLink>) initiative</span> } />
                <ListItem primary={ <span>The Chronic Obstructive Pulmonary Disease (<ExternalLink to="http://www.copdgene.org/">COPD</ExternalLink>) Gene Study</span> } />
            </BulletedList>

            <br/>

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
            
            <br/>
            
            <Subheading>Data Access Highlights</Subheading>

            <BulletedList>
                <ListItem primary={ `
                    Principal Investigators (PIs) who have approved Data Access Requests (DARs) on dbGaP for the BioData Catalyst datasets will be able to programmatically access those data within the BioData Catalyst ecosystem.
                ` } />
                <ListItem primary={
                    <span>
                        PIs with approved DARs can give lab staff access to the hosted datasets on the BioData Catalyst ecosystem by giving the lab staff "designated downloader status" on dbGaP.
                        { ' ' }<ExternalLink to="https://www.youtube.com/watch?v=Yem3OH26kX4&t=1s">Learn more about this process</ExternalLink>.
                    </span>
                } />
                <ListItem primary={ `
                    Please note that having other researchers listed on your dbGaP DAR application as internal and external collaborators will not result in these individuals having access to hosted datasets on BioData Catalyst
                    PIs will need to add internal collaborators from their dbGaP application to the list of designated downloaders as described above.
                    In addition, external collaborators will need to obtain DAR approval for those at their institutions.
                ` }/>
            </BulletedList>

            <br/>

            <Heading>Check Your Data Access</Heading>

            <Paragraph>
                Login below with your eRA Commons ID to view the data sets to which you have access.
            </Paragraph>

            <Paragraph center>
                <ButtonExternalLink to="https://gen3.biodatacatalyst.nhlbi.nih.gov/user/oauth2/authorize?idp=fence&client_id=xMhuXjGdk9zpzdJjufEinh3nKzOUKOTFZcwzU5xT&redirect_uri=https%3A%2F%2Fbiodatacatalyst.nhlbi.nih.gov&response_type=id_token+token&scope=openid+user&nonce=2bfe151af238d21f48d818bf8bbec408838c8dc0ace6b4c5621ac9dfa157798b">Check my Access</ButtonExternalLink>
            </Paragraph>

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