function objectToCsv(objArray) {
  let csv = "data:text/csv;charset=utf-8,";
  const columnDelimiter = ",";
  const lineDelimiter = "\r\n";
  const columns = Object.keys(objArray[0]);
  // add column headers
  csv += columns.join(columnDelimiter) + lineDelimiter;
  // add rows `value1,value2,value3\n`
  objArray.forEach(rowObject => {
    const nextLine = columns
      .map(column => JSON.stringify(rowObject[column]).replace(/,/g, "; "))
      .join(columnDelimiter);
    csv += nextLine + lineDelimiter;
  });
  return csv;
}

function downloadCSV(data, filename = "studies-export.csv") {
  const csv = objectToCsv(data);
  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
}

module.exports = { downloadCSV };
