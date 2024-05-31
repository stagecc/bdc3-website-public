import React from "react";
import styled from "styled-components";

const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  &:first-of-type {
    max-width: 300px;
  }
`

const SectionHeader = styled.header`
  color: white;
  background-color: var(--color-crimson);
  padding: 10px;
  position: relative;
  font-size: 1.4rem;
  border-bottom: 1px solid var(--color-crimson-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${Section}:not(:last-of-type) & {
    border-right: 1px solid var(--color-crimson-dark);
  }
`

const SectionContent = styled.div`
  overflow: auto;
  flex: 1 0 0;
  border-right: 1px solid var(--color-grey);
`

export const CardSection = ({
  title,
  children,
  ariaLabeledBy,
  tabPanel = false,
  id,
}) => {
  return (
    <Section>
      <SectionHeader>{title}</SectionHeader>
      <SectionContent
        aria-labelledby={ariaLabeledBy}
        role={tabPanel ? "tabpanel" : undefined}
        id={id}
      >
        {children}
      </SectionContent>
    </Section>
  );
};