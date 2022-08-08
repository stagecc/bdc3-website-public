import { graphql, useStaticQuery } from "gatsby";

const studiesQuery = graphql`
  {
    studies: allStudiesJson {
      edges {
        node {
          Accession
          Name
          Description
          Short_Description
          Cohort_Abbreviation
          Primary_Research_Focus
          Consent
          Consent_Short
          dbGaP_Listed_Variable
          Data_Dictionary_Link
          Number_of_Variables
          Type
          Molecular_Data
          Populations
        }
      }
    }
    studiesColumns: allStudiesColumnsJson {
      edges {
        node {
          name
          selector
          type
          sortable
          grow
          groupable
          maxWidth
          omit
        }
      }
    }
    covidStudies: allCovidStudiesJson {
      edges {
        node {
          Accession
          Name
          Short_Name
          Description
          Type
          Link
          Network
          Responsible_Party
          Other_Information
        }
      }
    }
    covidStudiesColumns: allCovidStudiesColumnsJson {
      edges {
        node {
          name
          selector
          type
          sortable
          grow
          groupable
          maxWidth
          omit
        }
      }
    }
  }
`;

export const useStudies = () => {
  const {
    studies,
    studiesColumns,
    covidStudies,
    covidStudiesColumns
  } = useStaticQuery(studiesQuery);
  return {
    studies: studies.edges.map(({ node }) => node),
    studiesColumns: studiesColumns.edges.map(({ node }) => node),
    covidStudies: covidStudies.edges.map(({ node }) => node),
    covidStudiesColumns: covidStudiesColumns.edges.map(({ node }) => node)
  };
};
