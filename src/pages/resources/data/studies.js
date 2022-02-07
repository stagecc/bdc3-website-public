import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SEO } from "../../../components/seo";
import { PageContent } from "../../../components/layout";
import { Title, Paragraph } from "../../../components/typography";
import { Link } from "../../../components/link";
import { DataTable, ExpansionPanel } from "../../../components/data-table";
import { useStudies } from "../../../hooks";

const CustomCell = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StudiesPage = () => {
  const { studies, studiesColumns } = useStudies();
  const [modifiedStudiesColumns, setModifiedStudiesColumns] = useState();

  useEffect(() => {
    const columnsCopy = [...studiesColumns];
    if (studiesColumns.length) {
      const index = columnsCopy.findIndex(column => column.selector === "Name");
      if (index > -1) {
        columnsCopy[index].cell = row => (
          <CustomCell>
            <Link
              to={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${row.Accession}`}
            >
              {row.Name}
            </Link>
          </CustomCell>
        );
      }
      setModifiedStudiesColumns([...columnsCopy]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PageContent
      width="95%"
      maxWidth="1200px"
      center
      gutters
      style={{ position: "relative" }}
    >
      <SEO title="BioData Catalyst Studies" description="" keywords="" />

      <Title>BioData Catalyst Studies</Title>

      <br />

      <Paragraph>
        The filterable data table below provides metadata on all
        non-COVID studies available in BioData Catalyst.{' '}
        <Link to="/covid-19">View COVID-19 studies here</Link>.

      </Paragraph>

      {studies && modifiedStudiesColumns && (
        <DataTable
          columns={modifiedStudiesColumns}
          data={studies}
          expandableRows
          expandableRowsComponent={<ExpansionPanel columns={studiesColumns} />}
          highlightOnHover
          dense
        />
      )}
    </PageContent>
  );
};

export default StudiesPage;
