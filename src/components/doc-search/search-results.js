import React, { Fragment } from "react";
import styled from "styled-components";
import { Result } from "./search-result";
import { useDocSearch } from "./search-context";
import { Dots as LoadingDots } from "../loading";
import { PaginationTray } from "./pagination-tray";
import { Card, CardHeader, CardBody, CardFooter } from "../card";
import { Paragraph } from "../typography";
import { Link } from "../link";

const Wrapper = styled.section``;

export const ResultsCard = styled(Card)``;

export const ResultsCardHeader = styled(CardHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 2rem;
  padding-right: 2rem;
`;

export const ResultsCardBody = styled(CardBody)``;

export const ResultsCardFooter = styled(CardFooter)`
  display: flex;
  align-items: center;
  padding-left: 0;
  padding-right: 0;
`;

export const ResultsCardTitle = styled.span`
  flex: 1;
`;

const ResultsList = () => {
  const {
    currentPage,
    error,
    pageCount,
    results,
    searchedQuery,
    totalResults
  } = useDocSearch();

  // if there is an error
  if (error) {
    return (
      <section style={{ width: "650px", margin: "auto" }}>
        <Paragraph center>We're so sorry! {error.message}</Paragraph>
        <Paragraph center>
          However, you're in luck. The BioData Catalyst Documentation Search can
          be accessed at{" "}
          <Link to="https://cse.google.com/cse?cx=f67468621577c356b">
            https://cse.google.com/cse?cx=f67468621577c356b
          </Link>
          .
        </Paragraph>
      </section>
    );
  }

  // if no error, but there are no results for a non-empty query, show note to user
  if (searchedQuery && totalResults === 0) {
    return <Paragraph center>"{searchedQuery}" returned no results.</Paragraph>;
  }

  if (!searchedQuery) {
    return null;
  }

  // there are results, so show them
  return (
    <ResultsCard>
      <ResultsCardHeader>
        {totalResults > 0 && (
          <span>
            {totalResults}{" "}
            {totalResults - (currentPage - 1) * 10 - 1 > 10 && `estimated`}{" "}
            results
          </span>
        )}
      </ResultsCardHeader>
      <ResultsCardBody style={{ padding: 0 }}>
        {results.map((result, i) => {
          return (
            <Result
              key={`result-${i}_${searchedQuery}_${result.cacheId}`}
              index={(currentPage - 1) * 10 + i + 1}
              result={result}
            />
          );
        })}
      </ResultsCardBody>
      <ResultsCardFooter>
        {totalResults > 0 ? (
          <span>
            Page {currentPage} of {pageCount}{" "}
            {totalResults - (currentPage - 1) * 10 - 1 > 10 && `estimated`}{" "}
            pages
          </span>
        ) : (
          <span>&nbsp;</span>
        )}
      </ResultsCardFooter>
    </ResultsCard>
  );
};

export const SearchResults = () => {
  const { loading, totalResults } = useDocSearch();

  if (totalResults === "0") {
    return null;
  }

  return (
    <Wrapper>
      {loading ? (
        <LoadingDots
          color="var(--color-crimson)"
          text="Searching..."
          textPlacement="bottom"
        />
      ) : (
        <ResultsList />
      )}

      <br />

      {totalResults > 0 && <PaginationTray />}
    </Wrapper>
  );
};
