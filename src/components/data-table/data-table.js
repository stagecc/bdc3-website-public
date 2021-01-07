import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import ReactDataTable from 'react-data-table-component'
import styled from 'styled-components'
import { Card, CardHeader, CardBody, CardFooter } from '../card'
import { TextInput } from '../form'
import { Button, IconButton } from '../buttons'
import { DownloadIcon, PieChartIcon } from '../icons'
import { ChartTooltip, PieChart } from '../charts'
import { Stat } from './stat'
import { downloadCSV, downloadJSON } from '../../utils'
import { BackspaceIcon, CloseIcon, FullscreenIcon } from '../icons'

//

const countObjectsByStringProperty = (objArray, strProperty) => {
  let counts = {}
  objArray.forEach(obj => {
    if (counts.hasOwnProperty(obj[strProperty])) {
      counts[obj[strProperty]] += 1
    } else {
      counts[obj[strProperty]] = 1
    }
  })
  return Object.keys(counts).map(key => ({ id: key, value: counts[key] }))
}

const countObjectsByArrayProperty = (objArray, arrProperty) => {
  let counts = {}
  objArray.forEach(obj => {
    arrProperty && obj[arrProperty] && 
      obj[arrProperty].forEach(value => {
        if (counts.hasOwnProperty(value.trim())) {
          counts[value] += 1
        } else {
          counts[value] = 1
        }
      })
  })
  return Object.keys(counts).map(key => ({ id: key, value: counts[key] }))
}

const countObjectsByProperty = (objArray, property) => {
  if (objArray.length === 0) {
    return []
  }
  if (typeof objArray[0][property] === 'string') {
    return countObjectsByStringProperty(objArray, property)
  }
  if (typeof objArray[0][property] === 'object') {
    return countObjectsByArrayProperty(objArray, property)
  }
  return []
}

//

const DownloadButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: var(--color-blueberry);
  // color: var(--color-crimson);
  // border: 1px solid var(--color-crimson);
  text-transform: none;
  // padding: 0.25rem;
`

const DownloadCSVButton = ({ onExport }) => <DownloadButton small onClick={ e => onExport(e.target.value) }><DownloadIcon fill="var(--color-white)" size={ 16 }/> CSV</DownloadButton>
const DownloadJSONButton = ({ onExport }) => <DownloadButton small onClick={ e => onExport(e.target.value) }><DownloadIcon fill="var(--color-white)" size={ 16 }/> JSON</DownloadButton>

export const DataTable = ({ columns, data, ...props }) => {
  const [query, ] = useState('')
  const [filteredStudies, setFilteredStudies] = useState(data)
  const [selectedStudies, setSelectedStudies] = useState([])
  const [grouping, setGrouping] = useState(columns.filter(column => column.groupable)[0].selector)
  const [groupCounts, setGroupCounts] = useState([])
  const [variablesCount, setVariablesCount] = useState(0)
  const [pieChartVisible, setPieChartVisible] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  // filter state is maintained in this object,
  // whose properties are column.selectors
  // and whose values are initialized ehre as empty strings,
  // to be updated by the user via form fields.
  const [filters, setFilters] = useState(() => {
    const keys = columns.map(column => column.selector)
    let f = {}
    keys.forEach(key => f[key] = '')
    return f
  })

  /**
   * Returns boolean indicating whether the given object, obj has obj[key] = value
   * @param {object} object whose keys are to be checked
   * @param key {string} property in object to check
   * @param value {object} value to compare to object.property
  */
  const isFiltered = (obj, key, value = '') => obj[key] && obj[key].toLowerCase().includes(value.toLowerCase())

  useEffect(() => {
    if (filteredStudies) {
      setFilteredStudies(data.filter(study => isFiltered(study, 'Name', filters.Name)))
    }
  }, [filters])

  useEffect(() => {
    if (filteredStudies && grouping) {
      const num = filteredStudies.reduce((total, study) => total + parseInt(study.Number_of_Variables), 0)
      setVariablesCount(num)
    }
  }, [filteredStudies])

  useEffect(() => {
    if (filteredStudies && grouping) {
      setGroupCounts(countObjectsByProperty(filteredStudies, grouping))
    }
  }, [filteredStudies, grouping])

  //

  const handleGroupingChange = event => setGrouping(event.target.value)

  const handleFilterChange = key => e => {
    const f = { ...filters }
    f[key] = e.target.value
    setFilters(f)
  }

  const handleToggleFullScreen = () => setFullscreen(!fullscreen)

  const handleTogglePieChart = () => setPieChartVisible(!pieChartVisible)

  const fullscreenStyle = {
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
  }

  const handleSelectionChange = useCallback(data => {
    console.log(data.selectedRows)
    setSelectedStudies(data.selectedRows)
  }, [selectedStudies])

  const memoizedSubheaderComponent = useMemo(() => {
    return (
      <Fragment>
        <TextInput id="search-by-study-name" type="text" placeholder="Filter by Study Name" aria-label="Study Name Search Input" value={ filters.Name } onChange={ handleFilterChange('Name') } />
        <IconButton type="button" onClick={ () => setFilters({ ...filters, Name: '' }) }><BackspaceIcon size={24} fill="var(--color-crimson)"/></IconButton>
      </Fragment>
    )
  }, [query, filters, filteredStudies])

  const memoizedActionsComponent = useMemo(() => {
    return (
      <Fragment>
        Download selected studies &nbsp;
        <DownloadCSVButton onExport={ () => downloadCSV(selectedStudies) } />
        &nbsp;
        <DownloadJSONButton onExport={ () => downloadJSON(selectedStudies) } />
      </Fragment>
    )
  }, [selectedStudies])

  //

  if (!filteredStudies) return null

  return (
    <Card style={ fullscreen ? fullscreenStyle : null }>
      <CardHeader style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={ handleTogglePieChart } style={{ transform: 'translateX(1rem)' }}>
          { pieChartVisible ? <PieChartIcon size={ 24 } fill="var(--color-white)" /> : <PieChartIcon size={ 24 } fill="var(--color-crimson-dark)" /> }
        </IconButton>
        <IconButton onClick={ handleToggleFullScreen } style={{ transform: 'translateX(1rem)' }}>
          { fullscreen ? <CloseIcon size={ 24 } fill="var(--color-white)" /> : <FullscreenIcon size={ 24 } fill="var(--color-white)" /> }
        </IconButton>
      </CardHeader>

      <CardBody style={{ overflowY: 'auto', padding: 0, flex: 1, position: 'relative' }}>
        {
          pieChartVisible && (
            <PieChart
              title={
                <Fragment>
                  Studies grouped by
                  <select value={ grouping } onChange={ handleGroupingChange } style={{ margin: '0.5rem' }}>
                    { columns.filter(column => column.groupable).map(column => <option key={ `option-${ column.selector }` } value={ column.selector }>{ column.name }</option>) }
                  </select>
                </Fragment>
              }
              data={ groupCounts }
              height={ fullscreen ? 900 : 600 }
              radialLabelsSkipAngle={ fullscreen ? 4 : 10 }
              tooltip={ event => <ChartTooltip datum={ event.datum } grouping={ grouping.replace(/_/g, ' ') } /> }
            />
          )
        }

        <ReactDataTable
          data={ filteredStudies }
          columns={ columns }
          subHeader
          subHeaderComponent={ memoizedSubheaderComponent }
          selectableRows={ true }
          selectableRowsHighlight={ true }
          onSelectedRowsChange={ handleSelectionChange }
          fixedHeader
          contextMessage={{ singular: 'study', plural: 'studies', message: 'selected' }}
          contextActions={ memoizedActionsComponent }
          { ...props }
        />
      </CardBody>
      <CardFooter>&nbsp;</CardFooter>
    </Card>
  )
}
