const fetch = require(`node-fetch`);

/**
 * Fetches studies JSON from the BioDataCatalyst Metadata Service
 * @returns a json object containing containing raw MDS data or `null` if there is an error fetching
 */
async function queryMds() {
  const baseUrl = "https://gen3.biodatacatalyst.nhlbi.nih.gov/mds";
  const endpoint = "metadata";
  const guidType = "discovery_metadata";
  const limit = 2000;
  const returnData = "true";
  
  const requestUrl = `${baseUrl}/${endpoint}?_guid_type=${guidType}&limit=${limit}&data=${returnData}`;

  const response = await fetch(requestUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    }
  });

  if(!response.ok) {
    console.error(`Error fetching from ${requestUrl}:\n`, response);
    return null;
  };

  return await response.json();
}

/**
 * Splits `rawMdsData` into two objects (one for regular studies, one for COVID studies),
 * renames several fields, and coverts from named keys to an array of studies
 * @param rawMdsData
 * @returns {{ mdsStudiesList, mdsCovidList }} keys for each array of studies
 */
function transformStudies(rawMdsData) {
  const studies = [];
  const covidStudies = [];

  // iterate over each study
  for (const study of Object.values(rawMdsData)) {
    let isCovidStudy = false;

    const studyMetadata = study['gen3_discovery'];

    // check if study is tagged with 'COVID 19'
    for(const tag of studyMetadata['tags']) {
      if(tag.name.includes('COVID 19'))
        isCovidStudy = true;
    }

    // strip consent
    const fullAccession = studyMetadata['dbgap_accession'];
    const accession = fullAccession.split('').splice(0, fullAccession.indexOf('.c')).join('');

    // write values to row:
    const row = {
      "Accession": accession,
      "Cohort Abbreviation": studyMetadata['short_name'],
      "Name": studyMetadata['full_name'],
      "Description": studyMetadata['study_description'],
      "Consent Code": studyMetadata['dbgap_consent'],
      "Consent Short": studyMetadata['study_id'],
      "Subject Count": studyMetadata['_subjects_count'],
    }

    if(isCovidStudy) {
      covidStudies.push(row);
    } else {
      studies.push(row);
    }
  }

  return { studies, covidStudies }
}

module.exports = { queryMds, transformStudies };
