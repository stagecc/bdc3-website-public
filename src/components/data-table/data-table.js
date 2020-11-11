import React from 'react'
import styled from 'styled-components'
import ReactDataTable from 'react-data-table-component'
import { Card, CardHeader, CardBody, CardFooter } from '../card'

export const DataTable = props => {
  return (
    <Card>
      <CardHeader>Studies</CardHeader>
      <ReactDataTable { ...props } />
      <CardFooter></CardFooter>
    </Card>
  )
}
