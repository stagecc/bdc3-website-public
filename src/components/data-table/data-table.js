import React, { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div(({ fullscreen }) => `
  overflow: scroll;
  ${
    fullscreen ? `
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      z-index: 99;
      ` : undefined
  }
  background-color: #fff;
  & table {
    border: 1px solid var(--color-grey);
    border-spacing: 0;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`)

export const DataTable = ({ columns, data }) => {
  const [fullScreen, setFullScreen] = useState(false)

  const handleToggleFullScreen = event => setFullScreen(!fullScreen)

  return (
    <Wrapper fullscreen={ fullScreen }>
      <button onClick={ handleToggleFullScreen }>fullscreen</button>
      <table>
        <thead>
          <tr>
            <th>#</th>
            { columns.map(column => <th>{ column.humanReadableName }</th>) }
          </tr>
        </thead>
        <tbody>
          {
            data.map((datum, i) => (
              <tr key={ i + 1 }>
                <th>{ i + 1 }</th>
                { columns.map(column => <td>{ datum[column.id] }</td>) }
              </tr>
            ))
          }
        </tbody>
      </table>
     <pre>{ JSON.stringify({ columns, data }, null, 2) }</pre>
    </Wrapper>
  )
}
