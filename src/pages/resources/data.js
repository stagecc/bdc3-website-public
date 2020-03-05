import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { SEO } from '../../components/seo'
import { PageContent } from '../../components/layout'
import { Title, Heading, Subheading, Paragraph } from '../../components/typography'
import { Container as Grid, Row, Col } from 'react-grid-system'
import { BulletedList, ListItem } from '../../components/list'
import { ExternalLink } from '../../components/link'
import { Visible } from 'react-grid-system'
import { DataAccess } from '../../components/data-access'

const DataPage = ({ data, location }) => {
    const { dataBucketsGraphic, dataBucketsGraphicMobile } = data

    return (
        <PageContent width="95%" maxWidth="1200px" center gutters style={{ position: 'relative' }}>
            <SEO
                title="BioData Catalyst Data Access"
                description=""
                keywords=""
            />
            
            <Title>Accessing BioData Catalyst Data</Title>

            <br/>
            
            <DataAccess location={ location } />

            <br/>

            <section>
                <Heading>About BioData Catalyst Datasets</Heading>
    
                <Paragraph>
                    The BioData Catalyst ecosystem currently hosts a number of controlled and open datasets:
                </Paragraph>
    
                <BulletedList dense>
                    <ListItem primary={ <span><ExternalLink to="https://www.nhlbiwgs.org/">TOPMed</ExternalLink> Freeze 5b</span> } />
                    <ListItem primary={ <span>Parent Studies <ExternalLink to="https://www.ncbi.nlm.nih.gov/gap/">dbGaP</ExternalLink></span> } />
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
                
                <Visible xs sm>
                    <Img style={{ width: '95%', margin: 'auto' }} fluid={ dataBucketsGraphicMobile.childImageSharp.fluid } alt="Data access flow chart - see description that follows" />
                </Visible>

                <Visible md lg xl>
                    <Img style={{ width: '95%', margin: 'auto' }} fluid={ dataBucketsGraphic.childImageSharp.fluid } alt="Data access flow chart - see description that follows" />
                </Visible>
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

            <br/>

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
        dataBucketsGraphicMobile: file(relativePath: {eq: "data-buckets-mobile.png"}) {
            childImageSharp {
                fluid {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`