import React, { Fragment, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import ReactDataTable from 'react-data-table-component'
import { Card, CardHeader, CardBody, CardFooter } from '../card'
import { CloseIcon, FullscreenIcon } from '../icons'
import { IconButton } from '../buttons'
import { DownloadIcon } from '../icons'
import { PieChart } from '../charts'
import { Stat } from './stat'
import { downloadCSV } from '../../utils'

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <Fragment>
    <input id="search" type="text" placeholder="Filter by Study Name" aria-label="Search Input" value={ filterText } onChange={ onFilter } />
    <button type="button" onClick={ onClear }>X</button>
  </Fragment>
)

const ExportButton = ({ onExport }) => <button onClick={ e => onExport(e.target.value) }>Export</button>

export const DataTable = props => {
  const [fullScreen, setFullScreen] = useState(false)
  const [query, setQuery] = useState('')
  const [filteredStudies, setFilteredStudies] = useState(props.data)
  const [typeCounts, setTypeCounts] = useState([])
  const [populationCounts, setPopulationCounts] = useState([])
  const [variablesCount, setVariablesCount] = useState(0)
  const [focusCounts, setFocusCounts] = useState(0)
  const [listedVariableCounts, setListedVariableCounts] = useState([])

  const fullScreenStyles = {
    position: 'fixed',
    left: '0',
    top: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '99',
  }

  useEffect(() => {
    const countValues = key => {
      const counts = {}
      filteredStudies.forEach(study => {
        const value = study[key].trim()
        if (counts.hasOwnProperty(value)) { counts[value] += 1 }
          else { counts[value] = 1 }
      })
      return Object.keys(counts).map(key => ({ id: key, value: counts[key] }))
    }
    const countSemicolonDelimitedValues = key => {
      const counts = {}
      filteredStudies.forEach(study => {
        const values = study[key].split(';').map(s => s.trim())
        values.forEach(value => {
          if (counts.hasOwnProperty(value)) { counts[value] += 1 }
            else { counts[value] = 1 }
        })
      })
      return Object.keys(counts).map(key => ({ id: key, value: counts[key] }))
    }
    setTypeCounts(countSemicolonDelimitedValues('Study_Type'))
    setPopulationCounts(countSemicolonDelimitedValues('Study_Reported_Population_s_'))
    setListedVariableCounts(countSemicolonDelimitedValues('dbGaP_Listed_Variable'))
    setFocusCounts(countValues('Primary_Research_Focus'))
  }, [filteredStudies])

  useEffect(() => {
    const count = filteredStudies.reduce((total, study) => total + parseInt(study.Total_Number_of_Variables), 0)
    setVariablesCount(count)
  }, [filteredStudies])

  useEffect(() => {
    setFilteredStudies(props.data.filter(item => item.Study_Name__dbGaP_Link_ && item.Study_Name__dbGaP_Link_.toLowerCase().includes(query.toLowerCase())))
  }, [query])

  // const toggleFullScreen = () => setFullScreen(!fullScreen)

  const memoizedSubHeaderComponent = useMemo(() => {
    const handleClearQuery = () => setQuery('')
    return <FilterComponent onFilter={ e => setQuery(e.target.value)} onClear={ handleClearQuery } filterText={ query } />
  }, [query])

  const memoizedActions = useMemo(() => <ExportButton onExport={() => downloadCSV(filteredStudies)} />, [filteredStudies])

  return (
    <Card style={ fullScreen ? fullScreenStyles : null }>
      <CardHeader style={{ display: 'flex', justifyContent: 'flex-end' }}>
        &nbsp;
      </CardHeader>
      <details>
        <summary style={{ cursor: 'pointer', backgroundColor: '#eee', padding: '1rem' }}>Stats</summary>
        <CardBody>
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Stat name="Studies" value={ filteredStudies.length } />
            <Stat name="Variables" value={ variablesCount } />
          </div>
          <hr />
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            { typeCounts.length && <PieChart title="Study Type" data={ typeCounts } height="550" /> }
            { focusCounts && <PieChart title="Primary Focus" data={ focusCounts } height="550" /> }
            { listedVariableCounts.length && <PieChart title="Listed Variable" data={ listedVariableCounts } height="550" /> }
            { populationCounts.length && <PieChart title="Population" data={ populationCounts } height="550" /> }
          </div>
        </CardBody>
      </details>

      <ReactDataTable
        { ...props }
        data={ filteredStudies }
        subHeader
        subHeaderComponent={ memoizedSubHeaderComponent }
        actions={ memoizedActions }
      />
      <CardFooter>&nbsp;</CardFooter>
    </Card>
  )
}
