import React, { Fragment, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import ReactDataTable from 'react-data-table-component'
import { Card, CardHeader, CardBody, CardFooter } from '../card'
import { CloseIcon, FullscreenIcon } from '../icons'
import { IconButton } from '../buttons'

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <Fragment>
    <input id="search" type="text" placeholder="Filter by Study Name" aria-label="Search Input" value={ filterText } onChange={ onFilter } />
    <button type="button" onClick={ onClear }>X</button>
  </Fragment>
)

export const DataTable = props => {
  const [fullScreen, setFullScreen] = useState(false)
  const [query, setQuery] = useState('')
  const [filteredData, setFilteredData] = useState(props.data)

  const fullScreenStyles = {
    position: 'fixed',
    left: '0',
    top: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '99',
  }

  const notFullScreenStyles = {

  }

  useEffect(() => {
    setFilteredData(props.data.filter(item => item.Study_Name__dbGaP_Link_ && item.Study_Name__dbGaP_Link_.toLowerCase().includes(query.toLowerCase())))
  }, [query])

  const toggleFullScreen = () => setFullScreen(!fullScreen)

  const memoizedSubHeaderComponent = useMemo(() => {
    const handleClearQuery = () => setQuery('')
    return <FilterComponent onFilter={ e => setQuery(e.target.value)} onClear={ handleClearQuery } filterText={ query } />
  }, [query])

  return (
    <Card style={ fullScreen ? fullScreenStyles : null }>
      <CardHeader style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={ toggleFullScreen }>
          { fullScreen ? <CloseIcon size={ 36 } fill="#eee" /> : <FullscreenIcon size={ 36 } fill="#eee" /> }
        </IconButton>
      </CardHeader>
      <ReactDataTable
        { ...props }
        data={ filteredData }
        subHeader
        subHeaderComponent={ memoizedSubHeaderComponent }
      />
      <CardFooter></CardFooter>
    </Card>
  )
}
