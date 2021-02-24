import React from 'react'
import { Link } from 'gatsby'
import { SEO } from '../components/seo'
import { PageContent } from '../components/layout'
import { Title, Heading, Paragraph } from '../components/typography'
import { List, ListItem } from '../components/list'
import { DataTable, CovidExpansionPanel } from '../components/data-table'
import { useStudies } from '../hooks'
import { ExternalLink } from '../components/link'

const Covid19Page = () => {
  const { covidStudies, covidStudiesColumns } = useStudies()
  
  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO
        title="COVID-19"
        description=""
        keywords=""
      />
      
      <Title>About BioData Catalyst COVID-19 Data</Title>

      <Paragraph>
        NHLBI's response to the public health threat posed by COVID-19 includes
        a <ExternalLink to="https://www.nhlbi.nih.gov/directors-messages/coronavirus-covid-19-nhlbi-response">multi-pronged research strategy</ExternalLink>,
        which includes translational research, clinical trials, clinical epidemiology, and population science.
        The NHLBI will also leverage its cyberinfrastructure, namely the BioData Catalyst ecosystem,
        to help coordinate various data management needs among many of the COVID-19 efforts.
     </Paragraph>

      <Paragraph>
        BioData Catalyst is supporting data aggregation, rapid and broad access, and computation for NHLBI-funded COVID-19 datasets.
        In an effort to drive more impactful analyses, BioData Catalyst will be interoperable with other COVID-19 data resources.
      </Paragraph>

      <Heading>Available COVID-19 Data</Heading>

      <Paragraph>
        The table below provides metadata on the ORCHID study in the BioData Catalyst ecosystem. 
      </Paragraph>

      {
        covidStudies && covidStudiesColumns && (
          <DataTable
            columns={ covidStudiesColumns }
            data={ covidStudies }
            expandableRows
            expandableRowsComponent={ <CovidExpansionPanel columns={ covidStudiesColumns } /> }
            highlightOnHover
            dense
          />
        )
      }

      <Heading>Accessing ORCHID Trial Data</Heading>

      <Paragraph>
        At this time, BioData Catalyst has available ORCHID (Outcomes Related to COVID-19 treated with Hydroxychloroquine among In-patients with symptomatic Disease) trial data.
        Access to ORCHID data requires data access approvals from the NLM Database of Genotypes and Phenotypes
        (<ExternalLink to="https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?page=login">dbGaP</ExternalLink>) system.
        ORCHID data is also available to those with appropriate access permission
        on <ExternalLink to="https://biolincc.nhlbi.nih.gov/studies/petal_orchid/ ">BioLINCC</ExternalLink>,
        where they may download the data. ORCHID and other hosted data on BioData Catalyst may not be downloaded
        (see the <ExternalLink to="https://biodatacatalyst.nhlbi.nih.gov/data-protection">BioData Catalyst Data Protection webpage</ExternalLink>).
      </Paragraph>

      <Paragraph>
        To learn more about data access and data use on the BioData Catalyst system,
        visit our <ExternalLink to="https://biodatacatalyst.nhlbi.nih.gov/resources/data">Data webpage</ExternalLink>.
        With dbGaP approval, users are able to:
      </Paragraph>

      <Heading>Getting Started on BioData Catalyst</Heading>

      <List ordered>
        <ListItem primary={
          <span>
            Obtain or confirm you already have an <ExternalLink to="https://era.nih.gov/eracommons-timeline.htm">eRA Commons account</ExternalLink>,
            the credentials for which will be used as part of the login process.
          </span>
        } />
        <ListItem primary={
          <div>
            Request dbGaP access to ORCHID study data by: <br /><br />
            <List>
              <ListItem primary={
                <span>
                  (a) Going to the <ExternalLink to="https://dbgap.ncbi.nlm.nih.gov/aa/wga.cgi?page=login">controlled-access login page for dbGaP</ExternalLink> and clicking on the "Login" link on the upper right right side of the page. 
                </span>
              }/>
              <ListItem primary={
                <span>
                  (b) Entering your eRA Commons credentials (first time dbGaP requestors will be asked for additional information).
                </span>
              }/>
              <ListItem primary={
                <span>
                  (c) Clicking on the “my projects” tab and then the link for new data requests, where you will be asked to complete the 424 (R&R)
                </span>
              }/>
            </List>
          </div>
        } />
        <ListItem primary={
          <span>
            Read the BioData Catalyst Ecosystem <ExternalLink to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/">Overview document</ExternalLink> because it provides important information for new users and links to additional guidance and resources.
          </span>
        } />
        <ListItem primary={
          <span>
            Identify your preferred workspace and platforms by considering the descriptions available on the <Link to="/resources/services">BioData Catalyst Services page</Link> and the documentation to which it links.
          </span>
        } />
        <ListItem primary={
          <span>
            Prepare for cloud storage costs (incurred from computation and storage of derived results) which may be paid via
            users’ <ExternalLink to="https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc">Amazon</ExternalLink> and &nbsp;
            <ExternalLink to="https://cloud.google.com/free/?utm_source=google&utm_medium=cpc&utm_campaign=na-US-all-en-dr-SKWS-all-all-trial-b-dr-1009135&utm_content=text-ad-none-any-DEV_c-CRE_265893083938-ADGP_Hybrid%20%7C%20AW%20SEM%20%7C%20BKWS%20%7C%20US%20%7C%20en%20%7C%20BMM%20~%20Google%20Cloud%20Free%20Tier-KWID_43700032443110077-kwd-326209943198&utm_term=KW_%2Bfree%20%2Bgoogle%20%2Bcloud-ST_%2Bfree%20%2Bgoogle%20%2Bcloud&gclid=CjwKCAiAz4b_BRBbEiwA5XlVVtvMK1vgUhmeGn4U0YiiGRlYUHeefMx0xvs_ot5mwkbNLe7ytcdefxoCebAQAvD_BwE">Google</ExternalLink> accounts.
            Cloud credits may be available for those conducting concrete heart, lung, blood, or sleep research.
            Visit the <Link to="/resources/cloud-credits">Cloud Credits page</Link> for more information.
          </span>
        } />
        <ListItem primary={
          <span>
            Once you have approved dbGaP access, you may set up accounts for your preferred workspace and platforms on the BioData Catalyst ecosystem to conduct your research.
            Refer to the Ecosystem Access, Hosted Data, and System Services section of the Overview document
            for <ExternalLink to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/#ecosystem-access-hosted-data-and-system-services">login information</ExternalLink>.
          </span>
        }/>
      </List>

      <Paragraph>
        Researchers using ORCHID data may find helpful the reproducible code originally used by the ORCHID research team to arrive at their results.
        It is available in BioData Catalyst Powered by PIC-SURE for which <ExternalLink to="https://github.com/hms-dbmi/Access-to-Data-using-PIC-SURE-API/blob/master/NHLBI_BioData_Catalyst/R/ORCHID_COVID19.ipynb">there is more information in a Jupyter notebook</ExternalLink>.
      </Paragraph>

      <Heading>Related Resources</Heading>

      <List>
        <ListItem primary={ <ExternalLink to="https://github.com/hms-dbmi/Access-to-Data-using-PIC-SURE-API/blob/master/NHLBI_BioData_Catalyst/R/ORCHID_COVID19.ipynb">ORCHID Clinical Trial: statistical analysis reproduction</ExternalLink> } />
        <ListItem primary={ <ExternalLink to="https://biolincc.nhlbi.nih.gov/studies/petal_orchid/">Downloadable PETAL ORCHID data (BioLINCC)</ExternalLink> } />
      </List>

    </PageContent>
  )
}

export default Covid19Page


