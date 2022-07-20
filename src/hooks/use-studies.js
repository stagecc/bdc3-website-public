import { graphql, useStaticQuery } from "gatsby";

const studiesQuery = graphql`
  {
    studies: allStudiesJson {
      edges {
        node {
          Accession
          Name
          Description
          Cohort_Abbreviation
          Consent_Code
          Consent_Short
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
          Cohort_Abbreviation
          Description
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
