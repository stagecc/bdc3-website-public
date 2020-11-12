function downloadCSV(data, filename = 'studies-export.csv') {
  console.log(data)
  let csv = 'data:text/csv;charset=utf-8,'
  const columnDelimiter = ','
  const lineDelimiter = '\n'
  const columns = Object.keys(data[0])
  console.log(columns)
  // add column headers
  csv += columns.join(columnDelimiter) + lineDelimiter
  // add rows `data,data,data,\n`
  data.forEach(rowObject => {
    const nextLine = columns.map(column => rowObject[column]).join(columnDelimiter)
    console.log('=====')
    console.table(rowObject)
    console.log(nextLine)
    csv += nextLine + lineDelimiter
  })
  const link = document.createElement('a')
  link.setAttribute('href', encodeURI(csv))
  link.setAttribute('download', filename)
  link.click()
}

module.exports = { downloadCSV }
