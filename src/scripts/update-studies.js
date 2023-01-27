const fs = require('fs/promises');
const { queryMds, transformStudies } = require("../utils/studies-data-helpers");

(async function () {
  const rawMdsData = await queryMds();
  ({ studies, covidStudies } = transformStudies(rawMdsData));

  studiesStringified = JSON.stringify(studies, null, 2);
  covidStudiesStringified = JSON.stringify(covidStudies, null, 2);
  await fs.writeFile('src/data/studies/studies.json', studiesStringified, { encoding: 'utf-8' });
  await fs.writeFile('src/data/studies/covid-studies.json', covidStudiesStringified, { encoding: 'utf-8' });
})();
