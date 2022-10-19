import React from "react";
import styled from "styled-components";
import { Subheading } from "../typography";
import { Link } from "../link";

const Wrapper = styled.div`
  background-color: #cccccc55;
  border-left: 0.5rem solid var(--color-lightgrey);
  font-size: 80%;
  transition: border-color 250ms, background-color 250ms;
  &:hover {
    border-color: var(--color-blueberry);
    background-color: #f0eeee66;
  }
`;

// const LIST_DELIMITER = " ; ";

// const DbGapLink = ({ pht }) => {
//   const re = new RegExp(/pht(\d+)\.v\d\.p\d/);
//   const [, digits] = pht.match(re);
//   return (
//     <Link
//       to={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/dataset.cgi?study_id=phs000956.v4.p1&pht=${digits}`}
//     >
//       {pht}
//     </Link>
//   );
// };

const Header = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1rem;
  margin: 0;
  border-bottom: 1px solid #ccc;
  line-height: 1.4;
  background-color: #d1d1d1;
  & ${Subheading} {
    margin: 0;
  }
  & span {
  }
`;

const Body = styled.div`
  padding: 1rem 0;
  margin: 0 1rem;
  line-height: 1.4;
`;

const Footer = styled.div`
  background-color: #d1d1d1;
  height: 2px;
`;

export const ExpansionPanel = ({ data }) => {
  return (
    <Wrapper>
      <Header>
        <Subheading>
          <Link
            to={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${data.Accession}`}
          >
            {data.Name}
          </Link>
        </Subheading>
        <span>{data.Accession}</span>
      </Header>

      <Body>
        {/* Full Name DONE*/}
        <strong>Study Name:</strong> {data.Name}
        <br />
        <br />
        {/* Study Description DONE*/}
        <strong>Study Description:</strong> {data.Description}
        <br />
        <br />
        {/* Study ID */}
        <strong>Study ID: </strong>
        {data.Consent_Short}
        <br />
        <br />
        {/* Code DONE*/}
        <strong>Study Code: </strong>
        {data.Consent_Code}
        <br />
        <br />
        {/* Short Name DONE*/}
        <strong>Short Name:</strong> {data.Cohort_Abbreviation}
        <br />
        <br />
      </Body>

      <Footer />
    </Wrapper>
  );
};

export const CovidExpansionPanel = ({ data }) => {
  return (
    <Wrapper>
      <Header>
        <Subheading>
          <Link
            to={`https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${data.Accession}`}
          >
            {data.Name}
          </Link>
        </Subheading>
      </Header>

      {/* <Body>
        <strong>Short Name:</strong> {data.Name}
        <br />
        <br />
        <strong>Study Description:</strong> {data.Description}
        <br />
        <br />
        <strong>dbGaP Accession ID:</strong> {data.Accession}
        <br />
        <br />
        <strong>Cohort Abbreviation:</strong> {data.Cohort_Abbreviation}
        <br />
        <br />
      </Body> */}
      <Body>
        {/* Full Name DONE*/}
        <strong>Study Name:</strong> {data.Name}
        <br />
        <br />
        {/* Study Description DONE*/}
        <strong>Study Description:</strong> {data.Description}
        <br />
        <br />
        {/* Study ID */}
        <strong>Study ID: </strong>
        {data.Consent_Short}
        <br />
        <br />
        {/* Code DONE*/}
        <strong>Study Code: </strong>
        {data.Consent_Code}
        <br />
        <br />
        {/* Short Name DONE*/}
        <strong>Short Name:</strong> {data.Cohort_Abbreviation}
        <br />
        <br />
      </Body>

      <Footer />
    </Wrapper>
  );
};
