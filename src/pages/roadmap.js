import React from "react";
import { SEO } from "../components/seo";
import { PageContent, Container } from "../components/layout";
import Roadmap from "../components/roadmap/roadmap";
import { Paragraph, Title } from "../components/typography";
import { Card, CardBody, CardHeader } from "../components/card";
import { Link } from "@mui/material";

const RoadmapPage = () => {
  return (
    <PageContent>
      <SEO title="Roadmap" description="" keywords="" />

      <Container
        width="90%"
        maxWidth="1200px"
        center
        style={{ marginTop: "0" }}
      >
        <Title>Roadmap</Title>

        <Paragraph>
          The process outlined below guides data generators to upload their data into the NHLBI BioData Catalyst (BDC) ecosystem, providing a step-by-step approach to submitting data and making it available for use through BDC.
        </Paragraph>


        <Card>
          <CardHeader size="large">Roadmap</CardHeader>
          <CardBody>
            <Roadmap steps={[
              {
                "id": 1,
                "title": "Intent to submit",
                "description": `
Please use the email template below with information specific to your study and send it to [bdcatalystdatasharing@nih.gov](mailto:bdcatalystdatasharing@nih.gov).

***
**To:** [bdcatalystdatasharing@nih.gov](mailto:bdcatalystdatasharing@nih.gov)\n
**Subject:** BioData Catalyst Data Submission [Grant Number / Award Number]
| BDC Submission Form                      |   |
| :----------------------------------------|---|
| Study Name                               |   |
| Institution Name                         |   |
| PI Name                                  |   |
| Grant Number/Award Number                |   |
| Expected date for data upload/submission |   |
***

After sending the email, you will receive an automated response with following documents
1) Institutional Certification
2) Data Submission Information Sheet
3) Guidance document for registration in dbGaP

Complete the Institutional Certification and Data Submission Information Sheet and email them to [nhlbigeneticdata@nhlbi.nih.gov](mailto:nhlbigeneticdata@nhlbi.nih.gov).

**Related Links:**
- [Data Submission Information Sheet](https://docs.google.com/document/d/13wyrXedIqxLSficmplWe-uOJ-qkXhzGp/edit?usp=share_link&ouid=114326188882160502012&rtpof=true&sd=true)
- [DUL Statements for Institutional Certification](https://osp.od.nih.gov/wp-content/uploads/NIH_PTC_in_Developing_DUL_Statements.pdf)
`
              },
              {
                "id": 2,
                "title": "Study Registration",
                "description": `
All research data shared with BDC must be registered through **dbGaP*** (exceptions may apply).

There are two steps to registering a study in dbGaP:

### Step A: *Completed by the Genomic Program Administrator (GPA)*
In this step the GPA will complete the registration process in dbGaP.
- The information from the Institutional Certification and Data Submission Information Sheet you submitted will be entered into the dbGaP Submission System by the GPA.
  - ***Note**: The NHLBI GPA may reach out to you for additional information or clarification. You may be asked to provide a Data Sharing Plan and Data Use agreement.*
- An accession number for your study will be generated. 
  - ***Note**: Note: The GPA will share the accession number and the consent group information with the BioData Catalyst Data Management Core to create Data Submission Infrastructure for your study.*

### Step B:
Once you receive an email from dbGaP, please complete the registration process. Refer to the [dbGaP Registration for BioData Catalyst Guidance](https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/data-management/dbgap-registration-for-biodata-catalyst).

Upon receipt of the invitation from dbGaP to complete study registration, you can begin the data upload process as defined in Step 4 below. Data submission to BDC and dbGaP registration completion can occur in parallel.
`
              },
              {
                "id": 3,
                "title": "Data Preparation",
                "description": `
- For Omics and Phenotypic data types, please prepare the data files per the [dbGaP Study Submission Guide](https://www.ncbi.nlm.nih.gov/gap/docs/submissionguide/#aconfig).
- For all data types, please prepare supplemental documentation to accompany the data submission (“data package”), including:
  - Protocols
  - Data Dictionaries*
  - Survey Instruments
  - Data/Metadata model*
  - Additional Supplemental documentation to reproduce study results.

****Note:** Supported documentation types for data dictionaries and models are .csv, tab-delimited, xml, json, and other machine-readable formats. PDF and SAS file formats are not machine readable and discouraged for submission.*
`
              },
              {
                "id": 4,
                "title": "Data Submission",
                "description": `
Upon receipt of the invitation from dbGaP to complete study registration, you can begin the data upload process. Data submission to BDC can happen in parallel to Step 2 of the study registration process.

Contact the NHLBI Data Management Core (DMC) via [https://biodatacatalyst.nhlbi.nih.gov/contact](https://biodatacatalyst.nhlbi.nih.gov/contact), select the "Data Submission" Type, and request one of the following methods for data package upload:

- Access for Read/write permission to the assigned cloud bucket.
- Link your credentials (Amazon/Google) and get access to the AWS S3 or GCP web user interface for data upload.
- Request assistance for direct data upload from your data package location (e.g. sFTP transfer).

***Note:** Please confirm the submission contents before uploading into the NHLBI cloud bucket.*
`
              },
              {
                "id": 5,
                "title": "Next Steps",
                "description": `
Once all the submission content (“Data Package”) is uploaded successfully, the ingestion and release process can take approximately 4-6 weeks from when data quality checks are completed by the BioData Catalyst team. 

The data will go through quality checks before ingestion and release. If issues are found, a member of the DMC will contact you to resolve any issues before ingestion and release. 

Once any data issues are resolved, you may be asked to resubmit the data package.

After the data is released, you will receive notification from the BioData Catalyst Data Management Core that your study is available for use by authorized individuals in BDC ([Study Inventory](https://biodatacatalyst.nhlbi.nih.gov/resources/data/studies)).

You are encouraged to log in and view your study data in the BDCBiodata Catalyst Ecosystem ([Analytic Platform](https://biodatacatalyst.nhlbi.nih.gov/resources/services)).      
`
              }
            ]} />

            <h3>Need Assistance?</h3>
            <Paragraph>
              Contact the NHLBI Data Management Core via <Link href="https://biodatacatalyst.nhlbi.nih.gov/contact" target="_blank">https://biodatacatalyst.nhlbi.nih.gov/contact</Link> and select the "Data Submission" Type.
            </Paragraph>
          </CardBody>
        </Card>

      </Container>
    </PageContent>
  );
};

export default RoadmapPage;
