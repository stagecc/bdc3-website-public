import React from "react";
import { SEO } from "../components/seo";
import { PageContent } from "../components/layout";
import {
  Title,
  Heading,
  Paragraph,
  ErrorMessage
} from "../components/typography";
import { Card, CardHeader, CardBody } from "../components/card";
// import { Accordion } from '../components/accordion'
import { Link } from "../components/link";
import { Dots as LoadingDots } from "../components/loading";
import { useFreshdeskFaqs } from "../hooks";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// const panelStyles = {
//   body: {
//     borderBottom: "1px solid #ddd",
//     lineHeight: 1.5
//   }
// };

const FaqPage = () => {
  const { isLoading, folders, error } = useFreshdeskFaqs("GENERAL");

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO title="Frequently Asked Questions" description="" keywords="" />

      <Title>Frequently Asked Questions</Title>

      <Paragraph>
        This page includes answers to our most Frequently Asked Questions. View
        the{" "}
        <Link to="/fellows/faqs">
          BioData Catalyst Fellows Program FAQs here
        </Link>
        .
      </Paragraph>

      {// If an error occurs fetching articles, show error and route users to Freshdesk.
      error && (
        <div>
          <ErrorMessage center>{error}</ErrorMessage>
          <Paragraph center>
            View our FAQs directly at{" "}
            <Link to="https://bdcatalyst.freshdesk.com">
              bdcatalyst.freshdesk.com
            </Link>
            .
          </Paragraph>
        </div>
      )}

      {// Show loading animation while waiting for articles.
      isLoading && (
        <LoadingDots
          color="var(--color-crimson)"
          text="Loading..."
          textPlacement="top"
        />
      )}

      {// If loading articles is complete, render them.
      !isLoading &&
        folders.map(folder => {
          return (
            <Card key={folder.id}>
              <CardHeader>{folder.name}</CardHeader>
              <CardBody>
                <Paragraph noMargin>{folder.description}</Paragraph>
              </CardBody>
              {folder.articles ? (
                <CardBody>
                  {folder.articles.map((article, i) => (
                    <Accordion key={article.title + i}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={article.title + "-content"}
                        id={article.title}
                      >
                        {article.title}
                      </AccordionSummary>
                      <AccordionDetails>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: article.description,
                          }}
                        />
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </CardBody>
              ) : (
                <CardBody>Loading...</CardBody>
              )}
            </Card>
          );
        })}

      <Heading>Still have questions?</Heading>

      <Paragraph>
        If unanswered questions remain, view our complete{" "}
        <Link to="https://bdcatalyst.freshdesk.com/">
          Knowledge Base
        </Link>{" "}
        or submit a <Link to="/contact">help request</Link> to receive
        assistance.
      </Paragraph>
    </PageContent>
  );
};

export default FaqPage;
