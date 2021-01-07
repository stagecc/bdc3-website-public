import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Subheading } from '../typography'
import { ExternalLink } from '../link'

const Wrapper = styled.div`
  background-color: #cccccc55;
  border-left: 0.5rem solid var(--color-lightgrey);
  font-size: 80%;
  transition: border-color 250ms, background-color 250ms;
  &:hover {
    border-color: var(--color-blueberry);
    background-color: #f0eeee66;
  }
`

const LIST_DELIMITER = ' ; '

const DbGapLink = ({ pht }) => {
  const re = new RegExp(/pht(\d+)\.v\d\.p\d/)
  const [, digits] = pht.match(re)
  return <ExternalLink to={ `https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/dataset.cgi?study_id=phs000956.v4.p1&pht=${ digits }` }>{ pht }</ExternalLink>
}

const Header = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1rem;
  margin: 0;
  border-bottom: 1px solid #ccc;
  line-height: 1.4;
  background-color: #d1d1d1;
  & ${ Subheading } {
    margin: 0;
  }
  & span { }
`

const Body = styled.div`
  padding: 1rem 0;
  margin: 0 1rem;
  line-height: 1.4;
`

const Footer = styled.div`
  background-color: #d1d1d1;
  height: 2px;
`

export const ExpansionPanel = ({ data }) => {
  return (
    <Wrapper>
      <Header>
        <Subheading>
          <ExternalLink to={ `https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${ data.Accession }` }>{ data.Name }</ExternalLink>
        </Subheading>
        <span>{ data.Accession }</span>
      </Header>

      <Body>
        <strong>Study Description:</strong> { data.Description }<br /><br />
        <strong>Primary Research Focus:</strong> { data.Primary_Research_Focus }<br /><br />
        <strong>dbGaP Listed Variable:</strong> { data.dbGaP_Listed_Variable.join(LIST_DELIMITER) }<br /><br />
        <strong>Study Type:</strong> { data.Type.join(LIST_DELIMITER) }<br /><br />
        <strong>Study-Reported Population(s):</strong> { data.Populations.join(LIST_DELIMITER) }<br /><br />
        <strong>Study Consent:</strong> { data.Consent_Short.join(LIST_DELIMITER) }<br /><br />
        <strong>Primary Data Dictionary Link:</strong> <DbGapLink pht={ data.Data_Dictionary_Link }/><br />
      </Body>

      <Footer />
    </Wrapper>
  )
}

export const CovidExpansionPanel = ({ data }) => {
  return (
    <Wrapper>
      <Header>
        <Subheading>{ data.Name }</Subheading>
      </Header>

      <Body>
        <strong>Short Name:</strong> { data.Short_Name }<br /><br />
        <strong>Study Description:</strong> { data.Description }<br /><br />
        <strong>Study Type:</strong> { data.Type }<br /><br />
        <strong>Study Link:</strong> <ExternalLink to={ data.Link }>{ data.Link }</ExternalLink><br /><br />
        <strong>Network:</strong> { data.Network }<br /><br />
        <strong>Responsible Party:</strong> { data.Responsible_Party }<br /><br />
        <strong>Status:</strong> { data.Status }<br />
      </Body>

      <Footer />
    </Wrapper>
  )
}
