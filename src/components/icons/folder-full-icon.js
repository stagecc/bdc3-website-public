import React from 'react'

export const FolderFullIcon = ({ size, fill, ...rest }) => {
  return (
    <svg { ...rest } version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={ `${ size }px` } height={ `${ size }px` } viewBox="0 0 24 24">
      <path d="m0 0h24v24h-24z" fill="none"/>
      <path d="m13.043 5.4575 5.9533-0.74684 0.72152 5.7515-5.9533 0.74684z" fill="#fff" stroke={ fill }/>
      <path d="m9.9131 5.105 5.483-2.4365 2.354 5.2971-5.483 2.4365z" fill="#fff" stroke={ fill }/>
      <path d="m20 6h-8l-2-2h-6c-1.1 0-1.99 0.9-1.99 2l-0.01 12c0 1.1 0.9 2 2 2h16c1.1 0 2-0.9 2-2v-10c0-1.1-0.9-2-2-2z" fill={ fill }/>
      <path d="m20 18h-16v-10h16z" fill={ fill }/>
      <path d="m4 8h16v10h-16z" fill="#fff"/>
    </svg>
  )
}
