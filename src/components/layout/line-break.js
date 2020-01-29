import React from 'react'

export const LineBreak = ({ count = 1 }) => {
    return (
          [...Array(count).keys()].map(i => <br key={ i }/>)
    )
}
