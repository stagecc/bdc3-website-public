function downloadJSON(data, filename = "studies-export.json") {
  let json =
    "data:application/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(data, null, 2));
  const link = document.createElement("a");
  link.setAttribute("href", json);
  link.setAttribute("download", filename);
  link.click();
}

module.exports = { downloadJSON };
