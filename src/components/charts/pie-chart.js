import React from 'react'
import { ResponsivePie } from '@nivo/pie'

export const PieChart = ({ data, height = 600 }) => {
  return (
    <div style={{ height: `${ height }px`, flex: '1 1 400px' }}>
      <ResponsivePie
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
