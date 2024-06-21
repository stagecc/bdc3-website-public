import React from "react";
import { SEO } from "../../components/seo";
import { PageContent } from "../../components/layout";
import { Paper } from "@mui/material";
import { CardSection, Programs } from "../../components/program-studies";
import { Studies } from "../../components/program-studies/Studies";
import styled from "styled-components";
import { kebabCase } from "../../utils/casing";
import { QueryCacheProvider } from "../../hooks";
import { useQueryParams } from "../../hooks/use-query-params";

const ProgramStudies = () => {
  const [program, setProgram] = useQueryParams(null, "program");

  return (
    <PageContent width="95%" maxWidth="1600px" center gutters>
      <SEO title={program ?? "Program Studies"} description="" keywords="" />

      <QueryCacheProvider>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            height: "calc(100dvh - 250px)",

            "--color-white": "#eeeeee",
            "--color-lightgrey": "#edeff4",
            "--color-grey": "#cccccc",
          }}
          elevation={4}
        >
          <CardSection title={<div id="programs-title">Programs</div>}>
            <Programs
              selectedProgram={program}
              setSelectedProgram={setProgram}
            />
          </CardSection>
          <CardSection
            title={
              <StudiesHeader>
                {`Studies${program === null ? "" : ` - ${program}`}`}
              </StudiesHeader>
            }
            ariaLabeledBy={
              program === null ? undefined : `tab-${kebabCase(program)}`
            }
            id={program === null ? undefined : `tabpanel-${kebabCase(program)}`}
            >
              <Studies programKey={program} />
          </CardSection>
        </Paper>
      </QueryCacheProvider>
    </PageContent>
  );
};

export default ProgramStudies;

const StudiesHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
