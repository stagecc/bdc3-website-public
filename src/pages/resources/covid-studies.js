import React from "react";
import { Seo } from "../../components/seo";
import { PageContent } from "../../components/layout";
import { Title } from "../../components/typography";
import { DataTable, CovidExpansionPanel } from "../../components/data-table";
import { useStudies } from "../../hooks";

const CovidStudiesPage = () => {
  const { covidStudies, covidStudiesColumns } = useStudies();

  console.log({ covidStudies, covidStudiesColumns });

  return (
    <PageContent
      width="95%"
      maxWidth="1200px"
      center
      gutters
      style={{ position: "relative" }}
    >
      <Seo title="BioData Catalyst COVID Studies" description="" keywords="" />

      <Title>BioData Catalyst COVID Studies</Title>

      <br />

      {covidStudies && covidStudiesColumns && (
        <DataTable
          columns={covidStudiesColumns}
          data={covidStudies}
          expandableRows
          expandableRowsComponent={
            <CovidExpansionPanel columns={covidStudiesColumns} />
          }
          expandOnRowClicked
          highlightOnHover
          dense
        />
      )}
    </PageContent>
  );
};

export default CovidStudiesPage;
