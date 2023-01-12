import React from "react";
import { SEO } from "../components/seo";
import { PageContent, Container } from "../components/layout";
import Roadmap from "../components/roadmap/roadmap";
import { Paragraph, Title } from "../components/typography";
import { Card, CardBody, CardHeader } from "../components/card";
import { Box, Link } from "@mui/material";
import { useRoadmap } from "../hooks/use-roadmap";

const RoadmapPage = () => {
  const roadmapData = useRoadmap();

  return (
    <PageContent>
      <SEO title="Roadmap" description="" keywords="" />

      <Container
        width="90%"
        maxWidth="1200px"
        center
        style={{ marginTop: "0" }}
      >
        <Title>Roadmap</Title>

        <Box marginBottom={4}>
          <Paragraph>
            The checklist outlined below guides data generators to upload their data into the NHLBI BioData Catalyst (BDC) ecosystem, providing a step-by-step approach to submitting data and making it available for use through BDC.
          </Paragraph>
        </Box>


        <Card>
          <CardHeader size="large">BioData Catalyst Data Generator Guidance</CardHeader>
          <CardBody>

            <Roadmap steps={roadmapData} />

            <h3>Need Assistance?</h3>
            <Paragraph>
              Contact the NHLBI Data Management Core via <Link href="https://biodatacatalyst.nhlbi.nih.gov/contact" target="_blank">https://biodatacatalyst.nhlbi.nih.gov/contact</Link> and select the "Data Submission" Type.
            </Paragraph>
          </CardBody>
        </Card>

      </Container>
    </PageContent>
  );
};

export default RoadmapPage;
