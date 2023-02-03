const fs = require('fs/promises');
const table = require('markdown-table');
const { queryMds, transformStudies } = require("../utils/studies-data-helpers");

const STUDIES_PATH = 'src/data/studies/studies.json';
const COVID_STUDIES_PATH = 'src/data/studies/covid-studies.json';

function delta(oldVal, newVal) {
  const delta = newVal - oldVal;
  return delta > 0 ? `+${delta}` : `${delta}`
}

(async function () {
  const rawMdsData = await queryMds();
  ({ studies, covidStudies } = transformStudies(rawMdsData));

  studiesStringified = JSON.stringify(studies, null, 2);
  covidStudiesStringified = JSON.stringify(covidStudies, null, 2);

  const oldStudies = await fs.readFile(STUDIES_PATH, { encoding: 'utf-8' });
  const oldCovidStudies = await fs.readFile(COVID_STUDIES_PATH, { encoding: 'utf-8' });

  const numOldStudies = JSON.parse(oldStudies).length;
  const numOldCovidStudies = JSON.parse(oldCovidStudies).length;
  const numNewStudies = studies.length;
  const numNewCovidStudies = covidStudies.length;

  await fs.writeFile(STUDIES_PATH, studiesStringified, { encoding: 'utf-8' });
  await fs.writeFile(COVID_STUDIES_PATH, covidStudiesStringified, { encoding: 'utf-8' });

  console.log('The following table shows the number of studies in each file before and after updating.\n');
  console.log(table([
    ["File", "Prev", "New", "Change"],
    ["studies.json", numOldStudies, numNewStudies, delta(numOldStudies, numNewStudies)],
    ["covid-studies.json", numOldCovidStudies, numNewCovidStudies, delta(numOldCovidStudies, numNewCovidStudies)]
  ], { align: ['l', 'l', 'l', 'c'] }));
  console.log('\n*Note that the file may have been updated, even if the change in the number of studies is 0. Please use `git diff` or the "Files changed" tab to see in detail what was changed.*');
})();
