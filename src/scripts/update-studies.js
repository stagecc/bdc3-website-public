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

  const opt = { context: 0 }; // display no context lines around diff changes
  const studiesDiff = disparity.unified(oldStudies, studiesStringified, opt);
  const covidStudiesDiff = disparity.unified(oldCovidStudies, covidStudiesStringified, opt);

  console.log(`
============ Studies Updated ============
studies.json:         ${JSON.parse(oldStudies).length} -> ${studies.length}
covid-studies.json:   ${JSON.parse(oldCovidStudies).length} -> ${covidStudies.length}
=========================================
`);

  if(studiesDiff !== '') {
    console.log(`\n\n
============== studies.json ============= 
${studiesDiff}
=========================================`);
  }

  if(covidStudiesDiff !== '') {
    console.log(`\n\n
========== covid-studies.json ===========
${covidStudiesDiff}
=========================================`);
  }
})();
