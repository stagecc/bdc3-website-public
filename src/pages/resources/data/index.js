import React from "react";
import { graphql} from "gatsby";
import Img from "gatsby-image";
import { SEO } from "../../../components/seo";
import { PageContent } from "../../../components/layout";
import {
  Title,
  Heading,
  Subheading,
  Paragraph,
} from "../../../components/typography";
import { BulletedList, ListItem } from "../../../components/list";
import { Button, ButtonLink } from "../../../components/buttons";
import { Link } from "../../../components/link";
import { Visible } from "react-grid-system";
import { DataAccess } from "../../../components/data-access/data-access";
import { DownloadIcon, MagnifyingGlassIcon } from "../../../components/icons";

const DataPage = ({ data, location }) => {
  const { dataBucketsGraphic, dataBucketsGraphicMobile } = data;

  return (
    <PageContent
      width="95%"
      maxWidth="1200px"
      center
      gutters
      style={{ position: "relative" }}
    >
      <SEO title="BioData Catalyst Data Access" description="" keywords="" />

      <Title>BioData Catalyst Data</Title>

      <DataAccess location={location} />

      <br />

      <Heading>Studies in BioData Catalyst</Heading>

      
      <BulletedList>
        <ListItem
          primary={
            <span>
              COVID-19 data (
              <Link to="/covid-19">ORCHID</Link>,{' '}
              <Link to="/covid-19">RED CORAL</Link>)
            </span>
          }
        />
        <ListItem
          primary={
            <span>
              Sickle Cell Disease Datasets
              <BulletedList>
                <ListItem
                  primary={
                    <span>
                      Cooperative Study of Sickle Cell Disease
                      (<Link to="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002362.v1.p1">CSSCD</Link>)
                    </span>
                  }
                />
                <ListItem
                  primary={
                    <span>
                      Hematopoietic Cell Transplant for Sickle Cell Disease
                      (<Link to="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002385.v1.p1">HCT for SCD</Link>)
                    </span>
                  }
                />
                <ListItem
                  primary={
                    <span>
                      Multicenter Study of Hydroxyurea
                      (<Link to="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002348.v1.p1">MSH</Link>)
                    </span>
                  }
                />
                <ListItem
                  primary={
                    <span>
                      Optimizing Primary Stroke Prevention in Children with Sickle Cell Anemia
                      (<Link to="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002386.v1.p1">STOP II</Link>)
                    </span>
                  }
                />
                <ListItem
                  primary={
                    <span>
                      Treatment of Pulmonary Hypertension and Sickle Cell Disease with Sildenafil Therapy
                      (<Link to="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs002383.v1.p1">Walk-PHaSST</Link>)
                    </span>
                  }
                />
              </BulletedList>
            </span>
          }
        />
        <ListItem
          primary={
            <span>
              The Pediatric Cardiac Genomics Consortium
              (<Link to="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs001843.v1.p2">PCGC</Link>)
                WGS Data
            </span>
          }
        />
        <ListItem
          primary={
            <span>
              <Link to="https://www.nhlbiwgs.org/">TOPMed</Link>{' '}
              Freeze 8 and Freeze 5b Data
              <BulletedList>
                <ListItem
                  primary={
                    <span>
                      Newly added: Coronary Artery Risk Development in Young Adults
                      (<Link to="https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=phs000285.v3.p2">CARDIA</Link>)
                    </span>
                  }
                />
              </BulletedList>
            </span>
          }
        />
        <ListItem
          primary={
            <span>
              <Link to="https://topmed.nhlbi.nih.gov/group/project-studies?field_is_this_a_value=sub">TOPMed</Link>
              {' '}Parent Studies
            </span>
          }
        />
      </BulletedList>


      <br/>

        <Paragraph>
          Download BioData Catalyst Release Notes and Study Details
          using the buttons below.
        </Paragraph>

        <Paragraph center>
          <ButtonLink
            light
            download
            to="/resources/data/studies"
            style={{
              margin: "1rem",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Explore Studies &nbsp;&nbsp;{" "}
            <MagnifyingGlassIcon fill="var(--color-crimson)" size={24} />
          </ButtonLink>
          <ButtonLink
            light
            download
            to="/covid-19"
            style={{
              margin: "1rem",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Explore COVID-19 Studies &nbsp;&nbsp;{" "}
            <MagnifyingGlassIcon fill="var(--color-crimson)" size={24} />
          </ButtonLink>
          <Button
            light
            as="a"
            target="_blank"
            rel="noopener noreferrer"
            href="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/written-documentation/release-notes"
            style={{
              margin: "1rem",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Release Notes &nbsp;&nbsp;{" "}
            <DownloadIcon fill="var(--color-crimson)" size={24} />
          </Button>
        </Paragraph>

      <br />

      <section>
        <Heading>How Data Access Works on BioData Catalyst</Heading>

        <Paragraph>
          The BioData Catalyst ecosystem manages access to the hosted controlled
          data using data access approvals from the NIH Database of Genotypes
          and Phenotypes (
          <Link to="https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?page=login">
            dbGaP
          </Link>
          ). Therefore, users who want to access one or more of the hosted
          controlled studies on the ecosystem must be approved for access to
          that study in dbGaP.
        </Paragraph>

        <Paragraph>
          Users log into BioData Catalyst platforms with their eRA Commons
          credentials and authentication is performed by iTrust.
        </Paragraph>

        <Visible xs sm>
          <Img
            style={{ width: "95%", maxWidth: "800px", margin: "auto" }}
            fluid={dataBucketsGraphicMobile.childImageSharp.fluid}
            alt="Data access flow chart - see description that follows"
          />
        </Visible>

        <Visible md lg xl>
          <Img
            style={{ width: "95%", maxWidth: "800px", margin: "auto" }}
            fluid={dataBucketsGraphic.childImageSharp.fluid}
            alt="Data access flow chart - see description that follows"
          />
        </Visible>

        <Subheading>Data Access Highlights</Subheading>

        <BulletedList>
          <ListItem
            primary={`
            Principal Investigators (PIs) who have approved Data Access Requests (DARs) on dbGaP for BioData Catalyst datasets will be able to programmatically access those data within the BioData Catalyst ecosystem.
          `}
          />
          <ListItem
            primary={
              <span>
                PIs with approved DARs can give lab staff access to the hosted
                datasets on the BioData Catalyst ecosystem by giving the lab
                staff "designated downloader status" on dbGaP.{" "}
                <Link to="https://www.youtube.com/watch?v=Yem3OH26kX4&t=1s">
                  Learn more about this process
                </Link>
                .
              </span>
            }
          />
          <ListItem
            primary={`
            Please note that having other researchers listed on your dbGaP DAR application as internal and external collaborators will not result in these individuals having access to hosted datasets on BioData Catalyst.
            PIs will need to add internal collaborators from their dbGaP application to the list of designated downloaders as described above.
            In addition, external collaborators will need to obtain DAR approval for those at their institutions.
          `}
          />
        </BulletedList>
      </section>

      <br />

      <section>
        <Heading>Data Use Policy Statement</Heading>

        <Paragraph>
          BioData Catalyst adheres to internationally recognized policies for
          data access and release that have been developed to enable broad
          access to data on the BioData Catalyst ecosystem. Data available on
          the BioData Catalyst ecosystem are subject to both general and
          data-set specific data use policies, and access to controlled data are
          restricted to authorized users. As a BioData Catalyst user, you are
          solely responsible for adhering to Data Use Agreement(s),
          Institutional Review Board policies and guidelines, and other Data Use
          Limitations when uploading or downloading data on the BioData Catalyst
          ecosystem.
        </Paragraph>
      </section>

      <br />

      <section>
        <Heading>Adding and Managing Hosted Data</Heading>

        <Paragraph>
          A component of the BioData Catalyst mission is to provide findable,
          accessible, interoperable, and reusable (FAIR) data to support the
          NHLBI research community. One way in which the BioData Catalyst
          Consortium is committed to achieving that mission is to successfully
          manage data already in the ecosystem and make available additional
          hosted data.
        </Paragraph>

        <Paragraph>
          The following documents, which provide <em>current</em> and{" "}
          <em>forward-looking</em> practices, describe the Consortium’s approach
          to adding and managing hosted data.
        </Paragraph>

        <BulletedList>
          <ListItem
            primary={
              <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/data-management/data-management-strategy">
                Data Management Strategy V1.0
              </Link>
            }
          />
          <ListItem
            primary={
              <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/data-management/biodata-catalyst-data-generator-guidance">
                Data Generators Guidance V1.0
              </Link>
            }
          />
        </BulletedList>

        <Paragraph>
          The BioData Catalyst Consortium will update these documents to reflect
          maturities of the ecosystem and best practices in data management.
        </Paragraph>
      </section>

      <br />
      <br />

    </PageContent>
  );
};

export default DataPage;

export const query = graphql`
  {
    dataBucketsGraphic: file(relativePath: { eq: "data-buckets.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    dataBucketsGraphicMobile: file(
      relativePath: { eq: "data-buckets-mobile.png" }
    ) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
