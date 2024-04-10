import React from "react";
import { SEO } from "../components/seo";
import { PageContent } from "../components/layout";
import { Title, Heading, Paragraph } from "../components/typography";
import { List, ListItem } from "../components/list";
import { DataTable, CovidExpansionPanel } from "../components/data-table";
import { useStudies } from "../hooks";
import { Link } from "../components/link";

const Covid19Page = () => {
  const { covidStudies, covidStudiesColumns } = useStudies();

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO title="COVID-19 Data" description="" keywords="" />

      <Title>About BDC COVID-19 Data</Title>

      <Paragraph>
        NHLBI's response to the public health threat posed by COVID-19 includes
        a{" "}
        <Link to="https://www.nhlbi.nih.gov/directors-messages/coronavirus-covid-19-nhlbi-response">
          multi-pronged research strategy
        </Link>
        , which consists of translational research, clinical trials, clinical
        epidemiology, and population science. The NHLBI is also leveraging its
        cyberinfrastructure, namely the BDC ecosystem, to help
        coordinate various data management needs of many of the COVID-19
        efforts.
      </Paragraph>

      <Paragraph>
        BDC is supporting data aggregation, rapid and broad access,
        and computation for several NIH-funded COVID-19 datasets. In an effort
        to drive more impactful analyses, BDC will be interoperable
        with other COVID-19 data resources.
      </Paragraph>

      <Heading>Available COVID-19 Data</Heading>

      <Paragraph>
        The table below provides metadata on the SARS-CoV-2 studies in the
        BDC ecosystem. Note that some parts of the ecosystem may
        lag in showing some datasets.
      </Paragraph>

      {covidStudies && covidStudiesColumns && (
        <DataTable
          columns={covidStudiesColumns}
          data={covidStudies}
          expandableRows
          expandableRowsComponent={
            <CovidExpansionPanel columns={covidStudiesColumns} />
          }
          highlightOnHover
          dense
        />
      )}

      <Heading>Access COVID-19 Data</Heading>

      <Paragraph>
        Access to COVID-19 data on BDC requires data access
        approvals from the NLM Database of Genotypes and Phenotypes (
        <Link to="https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?page=login">
          dbGaP
        </Link>
        ) system. To learn more about data access and data use on the BDC
        system, visit our{" "}
        <Link to="https://biodatacatalyst.nhlbi.nih.gov/resources/data">
          Data webpage
        </Link>
        .
      </Paragraph>

      <Heading>Get Started on BioData Catalyst</Heading>

      <List ordered>
        <ListItem
          primary={
            <span>
              Obtain or confirm you already have an{" "}
              <Link to="https://era.nih.gov/eracommons-timeline.htm">
                eRA Commons account
              </Link>
              , the credentials which will be used as part of the login process.
            </span>
          }
        />
        <ListItem
          primary={
            <div>
              Request dbGaP access to the data from the studies of interest:{" "}
              <br />
              <br />
              <List>
                <ListItem
                  primary={
                    <span>
                      (a) Going to the{" "}
                      <Link to="https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?page=login">
                        controlled-access login page for dbGaP
                      </Link>{" "}
                      and clicking on the "Login" link on the upper right side
                      of the page.
                    </span>
                  }
                />
                <ListItem
                  primary={
                    <span>
                      (b) Entering your eRA Commons credentials (first time
                      dbGaP requestors will be asked for additional
                      information).
                    </span>
                  }
                />
                <ListItem
                  primary={
                    <span>
                      (c) Clicking on the “my projects” tab and then the link
                      for new data requests, where you will be asked to complete
                      the SF 424 (R&R)
                    </span>
                  }
                />
              </List>
            </div>
          }
        />
        <ListItem
          primary={
            <span>
              Read the BDC{" "}
              <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/">
                documentation
              </Link>{" "}
              , as it provides important information for new users and links
              to additional guidance and resources.
            </span>
          }
        />
        <ListItem
          primary={
            <span>
              Identify your preferred workspace and platforms by considering the
              descriptions available on the{" "}
              <Link to="/resources/services">
                BDC Services page
              </Link>{" "}
              and the documentation to which it links.
            </span>
          }
        />
        <ListItem
          primary={
            <span>
              Prepare for cloud storage costs (incurred from computation and
              storage of derived results) which may be paid via users’{" "}
              <Link to="https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc">
                Amazon
              </Link>{" "}
              and &nbsp;
              <Link to="https://cloud.google.com/free/?utm_source=google&utm_medium=cpc&utm_campaign=na-US-all-en-dr-SKWS-all-all-trial-b-dr-1009135&utm_content=text-ad-none-any-DEV_c-CRE_265893083938-ADGP_Hybrid%20%7C%20AW%20SEM%20%7C%20BKWS%20%7C%20US%20%7C%20en%20%7C%20BMM%20~%20Google%20Cloud%20Free%20Tier-KWID_43700032443110077-kwd-326209943198&utm_term=KW_%2Bfree%20%2Bgoogle%20%2Bcloud-ST_%2Bfree%20%2Bgoogle%20%2Bcloud&gclid=CjwKCAiAz4b_BRBbEiwA5XlVVtvMK1vgUhmeGn4U0YiiGRlYUHeefMx0xvs_ot5mwkbNLe7ytcdefxoCebAQAvD_BwE">
                Google
              </Link>{" "}
              accounts. Cloud credits may be available for those conducting
              heart, lung, blood, or sleep research. Visit the{" "}
              <Link to="/resources/cloud-credits">Cloud Credits page</Link> for
              more information.
            </span>
          }
        />
        <ListItem
          primary={
            <span>
              Once you have approved dbGaP access, you may set up accounts for
              your preferred workspace and platforms on the BDC
              ecosystem to conduct your research. Refer to the Ecosystem Access,
              Hosted Data, and System Services section of the Overview document
              for{" "}
              <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/#ecosystem-access-hosted-data-and-system-services">
                login information
              </Link>
              .
            </span>
          }
        />
      </List>
    </PageContent>
  );
};

export default Covid19Page;
