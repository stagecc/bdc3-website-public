import React from 'react'
import { Pie } from '@nivo/pie'
import { Subheading } from '../typography'

export const PieChart = ({ title = '', data, height = 500 }) => {
  return (
    <div style={{
      height: `${ height }px`,
      flex: '1 1 400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }} >
      { title && <Subheading center>{ title }</Subheading> }
      <Pie
        height={ height }
        width={ height }
        data={ data }
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={ 0.5 }
        padAngle={ 0.75 }
        cornerRadius={ 1 }
        colors={{ scheme: 'red_blue' }}
        borderWidth={ 1 }
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={ 10 }
        sliceLabelsTextColor="#333333"
      />
    </div>
  )
}
