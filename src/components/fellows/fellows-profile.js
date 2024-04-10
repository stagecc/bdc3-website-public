import React from "react";
import Img from "gatsby-image";
import styled from "styled-components";
import { useWindowWidth } from "../../hooks";
import { Subheading, Subsubheading, Paragraph } from "../typography";
import { Collapser } from "../collapser";
import { kebabCase } from "../../utils";

const FellowHeading = styled(Subheading)`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const FellowAbstractTitle = styled(Subsubheading)`
  margin: 0;
`;

const FellowName = styled.span``;

const FellowOrganization = styled.span`
  font-style: italic;
  font-weight: normal;
`;

const FellowBio = styled(Paragraph)``;

const FellowDetails = styled.div`
  flex: 1;
`;

const PhotoWrapper = styled.div`
  margin: 2rem;
  max-width: 231px;
  max-height: 200px;
  min-width: 231px;
  min-height: 200px;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  filter: drop-shadow(0 0 0.25rem rgba(0, 0, 0, 0.2));
`;

const FellowPhoto = styled(Img)`
  max-width: 231px;
  max-height: 200px;
  min-width: 231px;
  min-height: 200px;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  transition: filter 250ms, transform 500ms;
  filter: saturate(0.5);
  transform: scale(1);
  transform-origin: center center;
`;

const Wrapper = styled.article`
  &:before { 
    content: "";
    display: block; 
    position: relative;
    width: 0;
    height: 150px;
    margin-top: -150px;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: ${props => (props.compact ? "column" : "row")};
  justify-content: center;
  align-items: ${props => (props.compact ? "center" : "flex-start")};
  margin-bottom: 3rem;
  &:hover ${FellowPhoto} {
    transition: filter 500ms, transform 250ms;
    filter: saturate(1.0);
    transform: scale(1.02);
  }
`;

export const FellowsProfile = ({
  name,
  institution,
  bio,
  projectTitle,
  projectAbstract,
  photo
}) => {
  const { isCompact } = useWindowWidth();
  return (
    <Wrapper id={kebabCase(name.replace(/,.+$/, ""))} >
      <FlexWrapper compact={isCompact}>
        <PhotoWrapper>
          <FellowPhoto fixed={photo} />
        </PhotoWrapper>
        <FellowDetails>
          <FellowHeading>
            <FellowName center={isCompact}>{name}</FellowName>
            <FellowOrganization center={isCompact}>
              {institution}
            </FellowOrganization>
          </FellowHeading>
          <FellowBio dangerouslySetInnerHTML={{ __html: bio }} />
          <Collapser
            title={
              <FellowAbstractTitle>Project: {projectTitle}</FellowAbstractTitle>
            }
            ariaId={`${kebabCase(projectTitle.slice(0, 20))}_abstract`}
          >
            <Paragraph>Abstract: 
              <div dangerouslySetInnerHTML={{ __html: projectAbstract }} />
            </Paragraph>
          </Collapser>
        </FellowDetails>
      </FlexWrapper>
    </Wrapper>
  );
};
