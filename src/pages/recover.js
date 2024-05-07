import React, { Fragment } from "react";
import { SEO } from "../components/seo";
import { PageContent } from "../components/layout";
import { Title, Heading, Paragraph, Subheading } from "../components/typography";
import { Link } from "../components/link";
import styled from "styled-components";
import { styled as MUIStyled} from '@mui/material/styles';
import { List, BulletedList, OrderedList, ListItem, StickyMenuItem } from "../components/list";
import { Container as Grid, Row, Col, Visible } from "react-grid-system";
import { navigate } from "gatsby";
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Section = styled.section`
  &:before { 
    content: "";
    display: block; 
    position: relative;
    width: 0;
    height: 170px;
    margin-top: -170px;
  }
  &:first-of-type {
    margin-top: -170px;
  }
  margin-bottom: 1.5rem;
`
const Accordion = MUIStyled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = MUIStyled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: '1rem',
    padding: 0
  },
  
}));

const AccordionDetails = MUIStyled(MuiAccordionDetails)(({ theme }) => ({
  padding: '1rem',
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  fontSize: '85%'
}));

const AccordionSubheading = styled(Subheading)`
  font-size: 0.9rem;
  margin-bottom: 0;
`

const RECOVERPage = () => {
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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
                <StickyMenuItem
                  primary={
                    <a href="#about-recover-at-bdc" onClick={() => navigate("#about-recover-at-bdc")}>
                      About RECOVER
                    </a>
                  }
                />
                <StickyMenuItem
                  primary={
                    <a href="#recover-data-in-bdc" onClick={() => navigate("#recover-data-in-bdc")}>
                      RECOVER Data in BDC
                    </a>
                  }
                />
                <StickyMenuItem
                  primary={
                    <a href="#get-started-with-recover-data" onClick={() => navigate("#get-started-with-recover-data")}>
                      Get Started
                    </a>
                  }
                />
                <StickyMenuItem
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
                  NIH Electronic Research Administration (eRA) Commons
                </Link>{" "}credentials and receive permissions through the Data 
                Access Request (DAR) process of the <Link to="https://www.ncbi.nlm.nih.gov/gap/">
                  NIH’s Database of Genotypes and Phenotypes (dbGaP)
                </Link>{" "}. 
              </Paragraph>

              <Paragraph>
                Users may access aggregated study information about the data 
                without going through an approval process.
              </Paragraph>
              <Paragraph>
                Learn more about the RECOVER data in BDC using these resources:
              </Paragraph>
              <Paragraph style={{marginLeft:'1.08rem'}}>
                <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/written-documentation/nih-recover-release-notes">
                  Read the RECOVER Release notes
                </Link>, which include the de-identification protocols, information 
                about the data in each release, and information for authoring 
                publications. There is also information about the RECOVER Data 
                Dictionaries/REDCap Codebooks and a link to the codebook for each 
                data release in BDC.
              </Paragraph>
            </Section>

            <br />

            <Section id="get-started-with-recover-data">
              <Heading>Get Started with RECOVER Data in BDC</Heading>
              <Paragraph>Select one to see more:</Paragraph>
              <Accordion
                expanded={expanded === 'panel1'} 
                onChange={handleChange('panel1')}
              >
                <AccordionSummary
                  aria-controls={"get-started-no-sign-in-content"}
                  id="get-started-no-sign-in"
                >
                  <AccordionSubheading>
                    I want to explore the aggregate study information (no login 
                    required).
                  </AccordionSubheading>
                </AccordionSummary>
                <AccordionDetails>
                  <Paragraph noMargin>
                    Follow these steps to see aggregated study information:
                  </Paragraph>

                  <OrderedList noPadding>
                    <ListItem
                      primary={
                        <Fragment>
                          Start by going to this website: <Link to="https://openpicsure.biodatacatalyst.nhlbi.nih.gov/picsureui/">
                            https://openpicsure.biodatacatalyst.nhlbi.nih.gov/picsureui/
                          </Link>.
                        </Fragment>
                      }
                    />
                    <ListItem
                      primary={
                        <Fragment>
                          Type “RECOVER” into the search bar, then click “Search.” 
                        </Fragment>
                      }
                    />
                    <ListItem
                      primary={
                        <Fragment>
                          On the page that displays, hover over the button in the 
                          “Filter Search Results by Study Tags” panel that says 
                          “RECOVER_Adult,” then click on the plus sign. This will 
                          limit the data search to the RECOVER dataset. The number 
                          that appears in the parentheses after “RECOVER_Adult” 
                          refers to the number of variables associated with the dataset.
                        </Fragment>
                      }
                    />
                    <ListItem
                      primary={
                        <Fragment>
                          Delete “RECOVER” from the search bar, type a search term 
                          of interest, such as “fever,” and click "Search." This will 
                          limit the results to any variable that includes your term 
                          of interest in the dataset. Each row represents a variable 
                          that includes your search term. The variable name includes 
                          things like the visit number.
                        </Fragment>
                      }
                    />
                    <ListItem
                      primary={
                        <Fragment>
                          In a row’s “Actions” column, click the filter icon <FilterAltIcon sx={{
                            fontSize: '1.2rem',
                            paddingTop: '4px',
                            paddingBottom: '-4px'
                          }}/> to view 
                          the available values associated with the variable. Select 
                          those you want to include and click “Add Filter to Query.”
                        </Fragment>
                      }
                    />
                    <ListItem
                      primary={
                        <Fragment>
                          In the “Results Panel,” the “Data Summary” will display 
                          the total number of RECOVER participants whose data is 
                          currently in BDC that aligns with the values you selected.
                        </Fragment>
                      }
                    />
                  </OrderedList>
                  <br/>
                  <Paragraph noMargin>
                    <Link to="https://openpicsure.biodatacatalyst.nhlbi.nih.gov/picsureui/openAccess">
                      A brief tour of this functionality is available here
                    </Link>.
                  </Paragraph>
                  <br/>
                  <Paragraph>
                  The following video tutorials for this functionality are available:
                  <BulletedList dense style={{paddingLeft: '1rem'}}>
                    <ListItem
                      dense
                      primary={
                        <Fragment>
                          Find variables of interest (<Link to="https://www.youtube.com/watch?v=UVPTwAbwtlo&list=PLJ6YccH8TEufZ5L-ctxzFF7vuZRLVacKw&index=2">
                            video tutorial
                          </Link>)
                        </Fragment>
                      }
                    />
                    <ListItem
                      dense
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
                  </BulletedList>
                  </Paragraph>

                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === 'panel2'} 
                onChange={handleChange('panel2')}
              >
                <AccordionSummary
                  aria-controls={"get-started-request-access-content"}
                  id="get-started-request-access"
                >
                  <AccordionSubheading >
                    I want to request access to the individual-level data and be 
                    prepared to analyze it if granted access (eRA Commons login 
                    required).
                  </AccordionSubheading>
                </AccordionSummary>
                <AccordionDetails>
                  <OrderedList noPadding>
                  <ListItem
                    primary={
                      <Fragment>
                        <Link to="https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?page=login">
                          Submit a data access request (DAR) in the NIH Database 
                          of Genotypes and Phenotypes (dbGaP)
                        </Link>{" "}using the study accession (phs number) for each 
                        dataset of interest. Currently available RECOVER datasets  
                        include the following:
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
                        Sign in or create an account in a BDC analysis platform:
                        <BulletedList>
                          <ListItem
                            primary={
                              <Fragment>
                                <em>BDC Powered by Seven Bridges (BDC-Seven Bridges)</em>
                                <br/>
                                <Link to="https://accounts.sb.biodatacatalyst.nhlbi.nih.gov/auth/register?visible=eraCommons">
                                  Launch the Application</Link> | <Link to="https://sb-biodatacatalyst.readme.io/docs/sign-up-for-biodata-catalyst-powered-by-seven-bridges">
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
                                  Launch the Application</Link> | <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/written-documentation/analyze-data-1/terra/account-setup">
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
                        Once granted access to the dataset, bring it into your project or
                        workspace:
                        <BulletedList>
                          <ListItem
                            primary={
                              <Fragment>
                                <Link to="https://sb-biodatacatalyst.readme.io/docs/import-data-from-biodata-catalyst-powered-by-gen3">
                                  Import Data from <em>BDC-Gen3</em> to <em>BDC-Seven 
                                  Bridges</em>
                                </Link>{" "}(use to move raw data files)
                                <br/>
                                <em>Note: On or about May 3, 2024, those who have 
                                  been granted access to phs003463.v1.p1 will see 
                                  it available in BDC-Seven Bridges projects  
                                  without needing to import it.</em>
                              </Fragment>
                            }
                          />
                          <ListItem
                            primary={
                              <Fragment>
                                <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/written-documentation/analyze-data-1/terra/bringing-data-into-a-workspace/bringing-in-data-from-gen3">
                                  Import Data from <em>BDC-Gen3</em> to <em>BDC-Terra</em>
                                </Link>{" "}(use to move raw data files)
                              </Fragment>
                            }
                          />
                          <ListItem
                            primary={
                              <Fragment>
                                <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/written-documentation/analyze-data-1/terra/bringing-data-into-a-workspace/bringing-in-data-from-gen3">
                                  Import Data from <em>BDC-PIC-SURE</em> to <em>BDC-Seven Bridges</em> or <em>BDC-Terra</em>
                                </Link>{" "}(user builds cohorts and selects variable(s) they want to export) 
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
                        Researchers may request <Link to="/resources/cloud-credits">
                          Pilot Funding ($500 in cloud credits)
                        </Link>{" "}for their research needs.
                      </Fragment>
                    }
                  />
                  <ListItem
                    primary={
                      <Fragment>
                        Use the <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/written-documentation/nih-recover-release-notes">
                          RECOVER Author Acknowledgements
                        </Link> and <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/community/citation-and-acknowledgement">
                          BDC acknowledgment/citation
                        </Link>{" "}language in publications and external 
                        presentations resulting from analyses using RECOVER data 
                        on BDC.
                      </Fragment>
                    }
                  />
                </OrderedList>
                </AccordionDetails>
              </Accordion>
            </Section>
            <br/>
            <br/>
            <Section id="related-resources">
              <Heading>Related Resources</Heading>

                <BulletedList>
                  <ListItem
                    primary={
                      <Fragment>
                        <Link to="https://www.era.nih.gov/register-accounts/create-and-edit-an-account.htm">
                          Create and Manage an eRA Commons Account
                        </Link>
                      </Fragment>
                    }
                  />
                  <ListItem
                    primary={
                      <Fragment>
                        <Link to="/contact/ecosystem/">
                          Join the Community
                        </Link>{" "}to stay up-to-date on data releases and 
                        BDC news.
                      </Fragment>
                    }
                  />
                  <ListItem
                    primary={
                      <Fragment>
                        <Link to="/contact">
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