import React from 'react'

export const StarIcon = ({ size, fill, ...rest }) => {
  return (
    <svg { ...rest } version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={ `${ size }px` } height={ `${ size }px` } viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill={ fill } />
    </svg>
  )
}
