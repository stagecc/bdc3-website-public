import React, { Fragment, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import ReactDataTable from 'react-data-table-component'
import { Card, CardHeader, CardBody, CardFooter } from '../card'
import { CloseIcon, FullscreenIcon } from '../icons'
import { IconButton } from '../buttons'
import { PieChart } from '../charts'
import { Stat } from './stat'

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <Fragment>
    <input id="search" type="text" placeholder="Filter by Study Name" aria-label="Search Input" value={ filterText } onChange={ onFilter } />
    <button type="button" onClick={ onClear }>X</button>
  </Fragment>
)

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

  const sumValues = key => filteredStudies.reduce((total, study) => total + parseInt(study[key]), 0)


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

  const toggleFullScreen = () => setFullScreen(!fullScreen)

  const memoizedSubHeaderComponent = useMemo(() => {
    const handleClearQuery = () => setQuery('')
    return <FilterComponent onFilter={ e => setQuery(e.target.value)} onClear={ handleClearQuery } filterText={ query } />
  }, [query])

  return (
    <Card style={ fullScreen ? fullScreenStyles : null }>
      <CardHeader>&nbsp;</CardHeader>
      <CardBody>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Stat name="Studies" value={ filteredStudies.length } />
          <Stat name="Variables" value={ variablesCount } />
        </div>
        <hr />
        <details>
          <summary style={{ cursor: 'pointer' }}>Charts</summary>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <PieChart data={ typeCounts } />
            <PieChart data={ focusCounts } />
            <PieChart data={ listedVariableCounts } />
            <PieChart data={ populationCounts } />
          </div>
        </details>
        <hr />
      </CardBody>

      <ReactDataTable
        { ...props }
        data={ filteredStudies }
        subHeader
        subHeaderComponent={ memoizedSubHeaderComponent }
      />
      <CardFooter>&nbsp;</CardFooter>
    </Card>
  )
}
