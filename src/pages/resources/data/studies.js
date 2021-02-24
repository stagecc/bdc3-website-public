import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SEO } from '../../../components/seo'
import { PageContent } from '../../../components/layout'
import { Title, Paragraph } from '../../../components/typography'
import { ExternalLink } from '../../../components/link'
import { DataTable, ExpansionPanel } from '../../../components/data-table'
import { useStudies } from '../../../hooks'

const CustomCell = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const StudiesPage = () => {
  const { studies, studiesColumns } = useStudies()
  const [modifiedStudiesColumns, setModifiedStudiesColumns] = useState()

  useEffect(() => {
    const columnsCopy = [...studiesColumns]
    if (studiesColumns.length) {
      const index = columnsCopy.findIndex(column => column.selector === 'Name')
      if (index > -1) {
        columnsCopy[index].cell = row => (
          <CustomCell>
            <ExternalLink to={ `https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${ row.Accession }` }>{ row.Name }</ExternalLink>
          </CustomCell>
        )
      }
      setModifiedStudiesColumns([ ...columnsCopy])
    }
  }, [studiesColumns])


  return (
    <PageContent width="95%" maxWidth="1200px" center gutters style={{ position: 'relative' }}>
      <SEO
        title="BioData Catalyst Studies"
        description=""
        keywords=""
      />
      
      <Title>BioData Catalyst Studies</Title>

      <br/>

      <Paragraph>
        The filterable data table below provides metadata on all studies available in BioData Catalyst.
      </Paragraph>

      {
        studies && modifiedStudiesColumns && (
          <DataTable
            columns={ modifiedStudiesColumns }
            data={ studies }
            expandableRows
            expandableRowsComponent={ <ExpansionPanel columns={ studiesColumns } /> }
            highlightOnHover
            dense
          />
        )
      }

    </PageContent>
  )
}

export default StudiesPage
