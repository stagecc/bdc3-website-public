import React from 'react'
import styled from 'styled-components'
import { Container as Grid, Row, Col } from 'react-grid-system'
import { EducationIcon as FakeIcon } from '../icons'

const DataPointWrapper = styled.div`
    // border: 1px solid #f99;
    margin: 1rem;
    disply: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
`

const DataText = styled.div`
    // border: 1px solid #f99;
    color: #fff;
    display: block;
    text-transform: uppercase;
    text-align: center;
`

const DataTitle = styled(DataText)`
    font-size: 80%;
`

const DataCount = styled(DataText)`
    font-weight: bold;
`

const DataPoint = ({ icon, title, count }) => {
    const DataIcon = icon
    return (
        <DataPointWrapper>
            <DataTitle>{ title }</DataTitle>
            <DataIcon size="60" fill="#fff" style={{ display: 'block', margin: '0.5rem auto' }} />
            <DataCount>{ count }</DataCount>
        </DataPointWrapper>
    )
}

export const DataContainer = () => {
    return (
        <Grid>
            <Row justify="around">
                <Col xs={ 6 } sm={ 4 } md={ 2 } style={{ display: 'flex', justifyContent: 'center' }}>
                    <DataPoint title="Studies" icon={ FakeIcon } count={ Math.floor(Math.random() * 100) } />
                </Col>
                <Col xs={ 6 } sm={ 4 } md={ 2 } style={{ display: 'flex', justifyContent: 'center' }}>
                    <DataPoint title="Participants" icon={ FakeIcon } count={ Math.floor(Math.random() * 100) } />
                </Col>
                <Col xs={ 6 } sm={ 4 } md={ 2 } style={{ display: 'flex', justifyContent: 'center' }}>
                    <DataPoint title="Families" icon={ FakeIcon } count={ Math.floor(Math.random() * 100) } />
                </Col>
                <Col xs={ 6 } sm={ 4 } md={ 2 } style={{ display: 'flex', justifyContent: 'center' }}>
                    <DataPoint title="Samples" icon={ FakeIcon } count={ Math.floor(Math.random() * 100) } />
                </Col>
                <Col xs={ 6 } sm={ 4 } md={ 2 } style={{ display: 'flex', justifyContent: 'center' }}>
                    <DataPoint title="Files" icon={ FakeIcon } count={ Math.floor(Math.random() * 100) } />
                </Col>
                <Col xs={ 6 } sm={ 4 } md={ 2 } style={{ display: 'flex', justifyContent: 'center' }}>
                    <DataPoint title="Size" icon={ FakeIcon } count={ Math.floor(Math.random() * 100) } />
                </Col>
            </Row>
        </Grid>
    )
}

