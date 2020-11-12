import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { SEO } from '../../components/seo'
import { PageContent } from '../../components/layout'
import { Title } from '../../components/typography'
import { DataTable, ExpansionPanel } from '../../components/data-table'

const columns = [
  {
    name: 'Study Accession', sortable: true,
    selector: 'Study_Accession',
    grow: 1,
    maxWidth: '150px',
  },
  {
    name: 'Study Name (dbGaP Link)', sortable: true,
    selector: 'Study_Name__dbGaP_Link_',
    grow: 8,
    maxWidth: '1150px',
  },
  { name: 'Study/Cohort Abbreviation', sortable: true, selector: 'Study_Cohort_Abbreviation', omit: true },
  { name: 'Study Description (Verbose)', sortable: true, selector: 'Study_Description__Verbose_', omit: true },
  { name: 'Study Description (Short)', sortable: true, selector: 'Study_Description__Short_', omit: true },
  { name: 'Primary Research Focus', sortable: true, selector: 'Primary_Research_Focus', omit: true },
  { name: 'Total Number of Variables', sortable: true, selector: 'Total_Number_of_Variables', omit: true },
  { name: 'dbGaP Listed Variable', sortable: true, selector: 'dbGaP_Listed_Variable', omit: true },
  { name: 'Study Type', sortable: true, selector: 'Study_Type', omit: true },
  { name: 'Study-Reported Population(s)', sortable: true, selector: 'Study_Reported_Population_s_', omit: true },
  { name: 'Study Consent', sortable: true, selector: 'Study_Consent', omit: true },
  { name: 'Type of Molecular Data Available', sortable: true, selector: 'Type_of_Molecular_Data_Available', omit: true },
  { name: 'Primary Data Dictionary Link', sortable: true, selector: 'Primary_Data_Dictionary_Link', omit: true },
]

const DataPage = ({ data }) => {
  const studies = data.allStudies.edges.map(({ node }) => node)
  return (
    <PageContent width="95%" maxWidth="1200px" center gutters style={{ position: 'relative' }}>
      <SEO
        title="BioData Catalyst Studies"
        description=""
        keywords=""
      />
      
      <Title>BioData Catalyst Studies</Title>

      <br/>

      <DataTable
        columns={ columns }
        data={ studies }
        expandableRows
        expandableRowsComponent={ <ExpansionPanel columns={ columns } /> }
        expandOnRowClicked
        highlightOnHover
        dense
        
      />


    </PageContent>
  )
}

export default DataPage

export const query = graphql`{
  allStudies {
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
