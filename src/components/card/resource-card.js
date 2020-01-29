import React from 'react'
import { Card, CardHeader, CardBody } from '.'
import { LineBreak } from '../layout'
import { HexBadge } from '../badge'

export const ResourceCard = ({ title, icon, children }) => {
    return (
        <Card>
            <CardHeader bgColor="#fff" fgColor="#444" style={{ borderBottom: '1px solid var(--color-crimson' }}/>
            <CardBody style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-2.5rem', left: '2rem' }}>
                    <HexBadge>{ icon }</HexBadge>
                </div>
                <LineBreak count={ 2 } />
                <h3 style={{ color: 'var(--color-crimson)' }}>{ title }</h3>
                { children }
            </CardBody>
        </Card>
    )
}
