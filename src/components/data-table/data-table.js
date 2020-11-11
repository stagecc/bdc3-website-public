import React, { Fragment, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import ReactDataTable from 'react-data-table-component'
import { Card, CardHeader, CardBody, CardFooter } from '../card'

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <Fragment>
    <input id="search" type="text" placeholder="Filter by Study Name" aria-label="Search Input" value={ filterText } onChange={ onFilter } />
    <button type="button" onClick={ onClear }>X</button>
  </Fragment>
)

export const DataTable = props => {
  const [query, setQuery] = useState('')
  const [filteredData, setFilteredData] = useState(props.data)

  useEffect(() => {
    setFilteredData(props.data.filter(item => item.Study_Name__dbGaP_Link_ && item.Study_Name__dbGaP_Link_.toLowerCase().includes(query.toLowerCase())))
  }, [query])

  const memoizedSubHeaderComponent = useMemo(() => {
    const handleClearQuery = () => setQuery('')
    return <FilterComponent onFilter={ e => setQuery(e.target.value)} onClear={ handleClearQuery } filterText={ query } />
  }, [query])

  return (
    <Card>
      <CardHeader>Studies</CardHeader>
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
