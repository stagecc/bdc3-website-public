const fs = require('fs/promises');
const disparity = require('disparity');
const { queryMds, transformStudies } = require("../utils/studies-data-helpers");

const STUDIES_PATH = 'src/data/studies/studies.json';
const COVID_STUDIES_PATH = 'src/data/studies/covid-studies.json';

(async function () {
  const rawMdsData = await queryMds();
  ({ studies, covidStudies } = transformStudies(rawMdsData));

  studiesStringified = JSON.stringify(studies, null, 2);
  covidStudiesStringified = JSON.stringify(covidStudies, null, 2);

  const oldStudies = await fs.readFile(STUDIES_PATH, { encoding: 'utf-8' });
  const oldCovidStudies = await fs.readFile(COVID_STUDIES_PATH, { encoding: 'utf-8' });

  await fs.writeFile(STUDIES_PATH, studiesStringified, { encoding: 'utf-8' });
  await fs.writeFile(COVID_STUDIES_PATH, covidStudiesStringified, { encoding: 'utf-8' });

  console.log(`
============ Studies Updated ============
studies.json:       ${JSON.parse(oldStudies).length} -> ${studies.length}
covid-studies.json: ${JSON.parse(oldCovidStudies).length} -> ${covidStudies.length}
=========================================



============== studies.json ============= 
${disparity.unified(oldStudies, studiesStringified)}
=========================================



========== covid-studies.json =========== 
${disparity.unified(oldCovidStudies, covidStudiesStringified)}
=========================================
`);
})();
