import React, { Fragment } from "react";
import { SEO } from "../components/seo";
import { PageContent } from "../components/layout";
import { Title, Heading, Paragraph, Subheading } from "../components/typography";
import { Link } from "../components/link";
import styled from "styled-components";
import { List, BulletedList, OrderedList, ListItem } from "../components/list";
import { Container as Grid, Row, Col, Visible } from "react-grid-system";
import { navigate } from "gatsby";

const Section = styled.section`
  &:before { 
    content: "";
    display: block; 
    position: relative;
    width: 0;
    height: 120px;
    margin-top: -120px;
  }

  &:first-of-type {
    margin-top: -140px;
  }
`

const Subsection = styled(Section)``

const RECOVERPage = () => {

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO title="RECOVER at BDC"/>

      <Title>RECOVER @ BDC</Title>

      <Grid fluid>
        <Row>
          <Visible lg xl>
            <Col lg={3}>
              <List
                style={{
                  position: "sticky",
                  top: "16rem",
                  paddingRight: "2rem",
                }}
                right
              >
                <ListItem
                  primary={
                    <a href="#about-recover-at-bdc" onClick={() => navigate("#about-recover-at-bdc")}>
                      About RECOVER
                    </a>
                  }
                />
                <ListItem
                  primary={
                    <a href="#recover-data-in-bdc" onClick={() => navigate("#recover-data-in-bdc")}>
                      RECOVER Data in BDC
                    </a>
                  }
                />
                <ListItem
                  primary={
                    <a href="#get-started-with-recover-data" onClick={() => navigate("#get-started-with-recover-data")}>
                      Get Started with RECOVER Data in BDC
                    </a>
                  }
                />
                <ListItem
                  primary={
                    <a href="#related-resources" onClick={() => navigate("#related-resources")}>
                      Related Resources
                    </a>
                  }
                />
              </List>
            </Col>
          </Visible>
          <Col xs={12} lg={9}>
            <Section id="about-recover-at-bdc">
              <Heading>About RECOVER and its Research Community</Heading>

              <Paragraph>
                <Link to="https://recovercovid.org/">
                  RECOVER
                </Link>{" "}is a first-of-its-kind, patient-centered research 
                initiative to understand, diagnose, treat, and prevent Long 
                COVID. RECOVER research includes observational cohort studies, 
                electronic health records analysis, pathobiology studies, tissue 
                pathology studies, and clinical trials. 
              </Paragraph>

              <Paragraph>
                RECOVER studies involve thousands of people from all walks of 
                life, hundreds of research investigators, and millions of 
                electronic health records (EHRs). RECOVER aims to achieve the 
                following:
              </Paragraph>

              <BulletedList>
                <ListItem
                  primary={
                    <Fragment>
                      Understand the range of recovery from Long COVID and the 
                      changes it can cause in people over time.
                    </Fragment>
                  }
                />
                <ListItem
                  primary={
                    <Fragment>
                      Define risk factors, understand the number of people 
                      getting Long COVID, and determine whether there are 
                      specific, different Long COVID types.
                    </Fragment>
                  }
                />
                <ListItem
                  primary={
                    <Fragment>
                      Study how Long COVID changes over time and how those 
                      changes may relate to other illnesses.
                    </Fragment>
                  }
                />
                <ListItem
                  primary={
                    <Fragment>
                      Identify possible treatments for Long COVID symptoms.
                    </Fragment>
                  }
                />
              </BulletedList>

            </Section>

            <br />

            <Section id="recover-data-in-bdc">
              <Heading>RECOVER Data in BDC</Heading>

              <Paragraph>
                RECOVER researchers use BDC to analyze scientific data they 
                collect from their research protocols. Once ready for broader 
                availability, the data are made available in BDC to other 
                authorized researchers. 
              </Paragraph>

              <Paragraph>
                Currently, BDC hosts a subset of data from the RECOVER adult 
                cohort study, representing over 14,600 participants who 
                participated in over 92,350 study visits at 79 enrolling 
                sites across the country.
              </Paragraph>

              <Paragraph>
                To maintain the integrity of the data and ensure that participant 
                privacy is protected, access to the data requires investigators 
                to have <Link to="https://public.era.nih.gov/commonsplus/public/login.era?TARGET=https%3A%2F%2Fpublic.era.nih.gov%3A443%2Fcommons">
                  NIH Electronic Research Administration (eRA)
                </Link>{" "}credentials and receive permissions through the Data 
                Access Request (DAR) process of the <Link to="https://www.ncbi.nlm.nih.gov/gap/">
                  NIH’s Database of Genotypes and Phenotypes (dbGaP)
                </Link>{" "}. 
              </Paragraph>

              <Paragraph>
                Users may access aggregated study information about the data 
                without going through an approval process.
              </Paragraph>

            </Section>

            <br />

            <Section id="get-started-with-recover-data">
              <Heading>Get Started with RECOVER Data in BDC</Heading>
              <Subsection>
                <BulletedList>
                  <ListItem
                    primary={
                      <a href="#get-started-no-sign-in" onClick={() => navigate("#get-started-no-sign-in")}>
                        I want to see the aggregate study information without 
                        having to sign in.
                      </a>
                    }
                  />
                  <ListItem
                    primary={
                      <a href="#get-started-explore" onClick={() => navigate("#get-started-explore")}>
                        I have an eRA Commons account and want to explore the 
                        aggregate study information in preparation for requesting 
                        individual-level data access.
                      </a>
                    }
                  />
                  <ListItem
                    primary={
                      <a href="#get-started-request-access" onClick={() => navigate("#get-started-request-access")}>
                        I have an eRA Commons account. I want to request access 
                        to the individual-level data and be prepared to analyze 
                        it if granted access.
                      </a>
                    }
                  />
                </BulletedList>
              </Subsection>

              <br/>

              <Subsection id="get-started-no-sign-in">
                <Subheading eventHeading>
                  I want to see the aggregate study information without having 
                  to sign in.
                </Subheading>

                <Paragraph>
                  Follow these steps to access aggregated study information (no 
                  accounts or sign-in required):
                </Paragraph>

                <OrderedList>
                  <ListItem
                    primary={
                      <Fragment>
                        Go to this website: <Link to="https://openpicsure.biodatacatalyst.nhlbi.nih.gov/picsureui/">
                          https://openpicsure.biodatacatalyst.nhlbi.nih.gov/picsureui/
                        </Link>{" "} and type “RECOVER” into the search bar.
                      </Fragment>
                    }
                  />
                  <ListItem
                    primary={
                      <Fragment>
                        On the new page, hover over the right side of the button 
                        on the top left that says “RECOVER Adult (4876),” and 
                        click on the plus sign. This limits the data search to 
                        the RECOVER dataset.
                      </Fragment>
                    }
                  />
                  <ListItem
                    primary={
                      <Fragment>
                        Delete “RECOVER” from the search bar, type a search term 
                        of interest, like “fever,” and click the search button. 
                        This limits the list of variable names to those that 
                        include your search term. Each row represents a variable 
                        that includes your search term, and the variable name 
                        includes things like the visit number. 
                      </Fragment>
                    }
                  />
                  <ListItem
                    primary={
                      <Fragment>
                        Use the filter icons to the right on each row to see the 
                        available values associated with the variable and select 
                        those you want to include. Then click on the “Add Filter 
                        to Query.”
                      </Fragment>
                    }
                  />
                  <ListItem
                    primary={
                      <Fragment>
                        Look in the results panel to see the total number of 
                        RECOVER participants whose data is currently in BDC that 
                        aligns with the values you selected.
                      </Fragment>
                    }
                  />
                </OrderedList>

                <Paragraph>
                  <Link to="https://openpicsure.biodatacatalyst.nhlbi.nih.gov/picsureui/openAccess">
                    A brief tour of this functionality is available here
                  </Link>.
                </Paragraph>
              </Subsection>
              
              <br/>

              <Subsection id="get-started-explore">
                <Subheading eventHeading >
                  I have an eRA Commons account and want to explore the 
                  aggregate study information in preparation for requesting 
                  individual-level data access.
                </Subheading>

                <Paragraph>
                  Follow these steps to use your eRA Commons ID to explore the 
                  aggregate study information in preparation for requesting 
                  individual-level data access:
                </Paragraph>

                <OrderedList>
                  <ListItem
                    primary={
                      <Fragment>
                        Go to this website: <Link to="https://picsure.biodatacatalyst.nhlbi.nih.gov/psamaui/login">
                          https://picsure.biodatacatalyst.nhlbi.nih.gov/psamaui/login
                        </Link>{" "} and select Log in with eRA Commons. Log in 
                        using your eRA Commons ID and agree to authorize Gen3 to 
                        authorize your access.
                      </Fragment>
                    }
                  />
                  <ListItem
                    primary={
                      <Fragment>
                        Find variables of interest (<Link to="https://www.youtube.com/watch?v=UVPTwAbwtlo&list=PLJ6YccH8TEufZ5L-ctxzFF7vuZRLVacKw&index=2">
                          video tutorial
                        </Link>)
                      </Fragment>
                    }
                  />
                  <ListItem
                    primary={
                      <Fragment>
                        Filter on one or more variables (<Link to="https://www.youtube.com/watch?v=-YWo-_lFpTA&list=PLJ6YccH8TEufZ5L-ctxzFF7vuZRLVacKw&index=3">
                          video tutorial
                        </Link>) and edit variable filters (<Link to="https://www.youtube.com/watch?v=QO-KWrWfdpw&list=PLJ6YccH8TEufZ5L-ctxzFF7vuZRLVacKw&index=4">
                          video tutorial
                        </Link>)
                      </Fragment>
                    }
                  />
                </OrderedList>
              </Subsection>

              <Subsection id="get-started-request-access">
                <Subheading eventHeading >
                  I have an eRA Commons account. I want to request access to the 
                  individual-level data and be prepared to analyze it if granted 
                  access.
                
                </Subheading>

                <OrderedList>
                  <ListItem
                    primary={
                      <Fragment>
                        <Link to="https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?page=login">
                          Submit a data access request (DAR) in the NIH Database 
                          of Genotypes and Phenotypes (dbGaP)
                        </Link>{" "} using the phs number for each dataset of 
                        interest. Currently available RECOVER datasets include the 
                        following:
                        <BulletedList>
                          <ListItem
                            primary={
                              <Fragment>
                                <Link to="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs003463.v1.p1">
                                  NIH RECOVER: A Multi-Site Observational Study of 
                                  Post-Acute Sequelae of SARS-CoV-2 Infection in 
                                  Adults; dbGaP Study Accession: phs003463.v1.p1
                                </Link>
                              </Fragment>
                            }
                          />
                        </BulletedList>
                      </Fragment>
                    }
                  />
                  <ListItem
                    primary={
                      <Fragment>
                        Create an account in a BDC analysis platform (if you do 
                        not already have one):
                        <BulletedList>
                          <ListItem
                            primary={
                              <Fragment>
                                <em>BDC Powered by Seven Bridges (BDC-Seven Bridges)</em>
                                <br/>
                                <Link to="https://accounts.sb.biodatacatalyst.nhlbi.nih.gov/auth/register?visible=eraCommons">
                                  Launch</Link> | <Link to="https://sb-biodatacatalyst.readme.io/docs/sign-up-for-biodata-catalyst-powered-by-seven-bridges">
                                  Create an Account</Link> | <Link to="https://sb-biodatacatalyst.readme.io/docs/create-a-project">
                                  Create a Project</Link>
                              </Fragment>
                            }
                          />
                          <ListItem
                            primary={
                              <Fragment>
                                <em>BDC Powered by Terra (BDC-Terra)</em>
                                <br/>
                                <Link to="https://terra.biodatacatalyst.nhlbi.nih.gov/">
                                  Launch</Link> | <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/written-documentation/analyze-data-1/terra/account-setup">
                                  Create an Account</Link> | <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/written-documentation/analyze-data-1/terra/workspace-setup">
                                  Create a Workspace</Link>
                              </Fragment>
                            }
                          />
                        </BulletedList>
                      </Fragment>
                    }
                  />
                  <ListItem
                    primary={
                      <Fragment>
                        Once granted access to the dataset, bring it into your 
                        workspace:
                        <BulletedList>
                          <ListItem
                            primary={
                              <Fragment>
                                <Link to="https://sb-biodatacatalyst.readme.io/docs/import-data-from-biodata-catalyst-powered-by-gen3">
                                  Import Data from <em>BDC-Gen3</em> to <em>BDC-Seven 
                                  Bridges</em>
                                </Link>
                                <br/>
                                <em>Note: On or about May 3, 2024, those who have 
                                  been granted access to phs003463.v1.p1 will see 
                                  it available in BDC-Seven Bridges workspaces 
                                  without needing to import it.</em>
                              </Fragment>
                            }
                          />
                          <ListItem
                            primary={
                              <Fragment>
                                <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/written-documentation/analyze-data-1/terra/bringing-data-into-a-workspace/bringing-in-data-from-gen3">
                                  Import Data from <em>BDC-Gen3</em> to <em>BDC-Terra</em>
                                </Link>
                              </Fragment>
                            }
                          />
                        </BulletedList>
                      </Fragment>
                    }
                  />
                  <ListItem
                    primary={
                      <Fragment>
                        Researchers may request <Link to="https://biodatacatalyst.nhlbi.nih.gov/resources/cloud-credits">
                          Pilot Funding ($500 in cloud credits)
                        </Link>{" "}to test and evaluate BDC for their research needs.
                      </Fragment>
                    }
                  />
                  <ListItem
                    primary={
                      <Fragment>
                        Use the RECOVER Author Acknowledgements and <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/community/citation-and-acknowledgement">
                          BDC acknowledgment/citation
                        </Link>{" "}language in publications and external 
                        presentations resulting from analyses using RECOVER data 
                        on BDC.
                      </Fragment>
                    }
                  />
                </OrderedList>
              </Subsection>

            </Section>

            <Section id="related-resources">
              <Heading>Related Resources</Heading>

                <BulletedList>
                  <ListItem
                    primary={
                      <Fragment>
                        <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/written-documentation/nih-recover-release-notes">
                          Read the RECOVER Release notes
                        </Link>
                      </Fragment>
                    }
                  />
                  <ListItem
                    primary={
                      <Fragment>
                        <Link to="https://biodatacatalyst.nhlbi.nih.gov/contact/ecosystem/">
                          Join the Community
                        </Link>{" "}to stay up-to-date on data availability and 
                        releases, receive information about BDC events and 
                        trainings, and get access to the <Link to="https://bdcatalyst.freshdesk.com/support/discussions">
                          Community Forum
                        </Link>.
                      </Fragment>
                    }
                  />
                  <ListItem
                    primary={
                      <Fragment>
                        <Link to="https://biodatacatalyst.nhlbi.nih.gov/contact">
                          Use the BDC Help Desk / Contact BDC
                        </Link>
                      </Fragment>
                    }
                  />
                  <ListItem
                    primary={
                      <Fragment>
                        <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation">
                          Read BDC Documentation
                        </Link>
                      </Fragment>
                    }
                  />
                </BulletedList>
            </Section>
          </Col>
        </Row>
      </Grid>

    </PageContent>
  )
}

export default RECOVERPage;