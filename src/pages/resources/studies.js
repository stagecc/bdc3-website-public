import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { SEO } from '../../components/seo'
import { PageContent } from '../../components/layout'
import { Title, Heading, Subheading, Paragraph } from '../../components/typography'
import { BulletedList, ListItem } from '../../components/list'
import { Button } from '../../components/buttons'
import { ExternalLink } from '../../components/link'
import { Visible } from 'react-grid-system'
import { DataAccess } from '../../components/data-access'
import { DownloadIcon } from '../../components/icons'

const columns = [
    { id: 'Study_Accession', humanReadableName: 'Study Accession' },
    { id: 'Study_Cohort_Abbreviation', humanReadableName: 'Study/Cohort Abbreviation' },
    { id: 'Study_Name__dbGaP_Link_', humanReadableName: 'Study Name (dbGaP Link)' },
    { id: 'Study_Description__Verbose_', humanReadableName: 'Study Description (Verbose)' },
    { id: 'Study_Description__Short_', humanReadableName: 'Study Description (Short)' },
    { id: 'Primary_Research_Focus', humanReadableName: 'Primary Research Focus' },
    { id: 'Total_Number_of_Variables', humanReadableName: 'Total Number of Variables' },
    { id: 'dbGaP_Listed_Variable', humanReadableName: 'dbGaP Listed Variable' },
    { id: 'Study_Type', humanReadableName: 'Study Type' },
    { id: 'Study_Reported_Population_s_', humanReadableName: 'Study-Reported Population(s)' },
    { id: 'Study_Consent', humanReadableName: 'Study Consent' },
    { id: 'Type_of_Molecular_Data_Available', humanReadableName: 'Type of Molecular Data Available' },
    { id: 'Primary_Data_Dictionary_Link', humanReadableName: 'Primary Data Dictionary Link' },
]

const DataPage = ({ data }) => {
    const studies = data.allStudiesCsv.edges.map(({ node }) => node)
    return (
        <PageContent width="95%" maxWidth="1200px" center gutters style={{ position: 'relative' }}>
            <SEO
                title="BioData Catalyst Studies"
                description=""
                keywords=""
            />
            
            <Title>BioData Catalyst Studies</Title>

            <br/>

            <div style={{ height: '800px', overflow: 'scroll' }}>
                <table border="1" cellspacing="0">
                    <tr>
                        <th>#</th>
                        { columns.map(column => <th>{ column.humanReadableName }</th>) }
                    </tr>
                    {
                        studies.map((study, i) => (
                            <tr key={ i + 1 }>
                                <th>{ i + 1 }</th>
                                { columns.map(column => <td>{ study[column.id] }</td>) }
                            </tr>
                        ))
                    }
                </table>
            </div>

        </PageContent>
    )
}

export default DataPage

export const query = graphql`{
    allStudiesCsv {
        edges {
            node {
                Study_Accession
                Study_Cohort_Abbreviation
                Study_Name__dbGaP_Link_
                Study_Description__Verbose_
                Study_Description__Short_
                Primary_Research_Focus
                Total_Number_of_Variables
                dbGaP_Listed_Variable
                Study_Type
                Study_Reported_Population_s_
                Study_Consent
                Type_of_Molecular_Data_Available
                Primary_Data_Dictionary_Link
            }
        }
    }
}`
