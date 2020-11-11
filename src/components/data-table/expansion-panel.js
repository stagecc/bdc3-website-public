import React from 'react'
import styled from 'styled-components'
import { Subheading } from '../typography'

const Wrapper = styled.div`
  padding: 1rem;
  background-color: #eee;
`

export const ExpansionPanel = ({ columns, data }) => (
  <Wrapper>
    <Subheading>
      { data.Study_Name__dbGaP_Link_ } ({ data.Study_Accession })
    </Subheading>
    <hr />
    <strong>Study Description:</strong> { data.Study_Description__Verbose_ }<br />
    <strong>Primary Research Focus:</strong> { data.Primary_Research_Focus }<br />
    <strong>Total Number of Variables:</strong> { data.Total_Number_of_Variables }<br />
    <strong>dbGaP Listed Variable:</strong> { data.dbGaP_Listed_Variable }<br />
    <strong>Study Type:</strong> { data.Study_Type }<br />
    <strong>Study-Reported Population(s):</strong> { data.Study_Reported_Population_s_ }<br />
    <strong>Study Consent:</strong> { data.Study_Consent }<br />
    <strong>Type of Molecular Data Available:</strong> { data.Type_of_Molecular_Data_Available }<br />
    <strong>Primary Data Dictionary Link:</strong> { data.Primary_Data_Dictionary_Link }<br />
  </Wrapper>
)
