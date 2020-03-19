import React from 'react'
import { Link } from 'gatsby'
import { SEO } from '../components/seo'
import { PageContent } from '../components/layout'
import { Title, Heading, Subheading, Paragraph } from '../components/typography'
import { BulletedList, OrderedList, ListItem } from '../components/list'
import { Table } from '../components/table'

const FellowsPage = () => (
    <PageContent width="95%" maxWidth="1200px" center gutters>
        <SEO
            title="Fellows Program"
            description=""
            keywords=""
        />

        <Title>Fellows Program</Title>
        
        <section>
            <Heading>About the BioData Catalyst Fellows Program</Heading>
    
            <Paragraph>
                The NHLBI BioData Catalyst Fellows Program provides researchers, especially early-career researchers,
                the opportunity to receive funding to support research on novel and innovative data science and data-focused research problems.
                The program is open to academic disciplines conducting biomedical research or related research in heart, lung, blood, and sleep domains. 
            </Paragraph>
    
            <Paragraph>
                A primary goal of the BioData Catalyst development team is to meet user needs and incorporate feedback.
                The BioData Catalyst Fellows Program offers one mechanism for researchers to engage with the Consortium
                as partners in the BioData Catalyst endeavor.
            </Paragraph>
    
            <Paragraph>
                The goals of the BioData Catalyst Fellows Program are to:
            </Paragraph>
    
            <BulletedList>
                <ListItem primary="Improve the NHLBI BioData Catalyst system based on feedback from fellows." />
                <ListItem primary="Identify and begin to develop BioData Catalyst users who become ambassadors for the system among their peers." />
                <ListItem primary="Support researchers to allow them dedicated time to work with TOPMed data to accelerate research productivity." />
            </BulletedList>
    
            <Paragraph>
                <strong>The BioData Catalyst Fellows Program is not currently accepting applications. Look for additional funding opportunities in June 2020.</strong>
            </Paragraph>
        </section>

        <br/>
        
        <section>
            <Heading>Fellowship Eligibility</Heading>
            
            <Paragraph>
                Applicants must be authorized to work in the USA and affiliated with a research academic institution.
                Preference will be given to early-career researchers (graduate students, postdocs, and junior faculty). 
            </Paragraph>

            <Paragraph>
                Round 2 Fellowship positions will run from September 2020 - August, 2021),
                with a brief project report due six months into the project (February 2021) and at the end (August 2021).
                All Fellows will be expected to be involved in NHLBI BioData Catalyst activities during the year,
                including attending quarterly face-to-face consortium meetings and select meetings (<em>e.g.</em>, working group meetings).
            </Paragraph>
        </section>

        <br/>

        <section>
            <Heading>Fellowship Financial Stipend</Heading>

            <Paragraph>
                Awardees will receive a stipend of up to $69,733, which includes costs for travel, training, publication, and conference fees.
                Computing costs will be covered separately. 
            </Paragraph>
        </section>

        <br/>

        <section>
            <Heading>Round 2 Fellows Program Timeline</Heading>

            <Table>
                <tbody>
                    <tr>
                        <td>June 5, 2020</td>
                        <td>Application Process Opens </td>
                    </tr>
                    <tr>
                        <td>July 3, 2020  11:59 PM Eastern Time</td>
                        <td>Application Deadline</td>
                    </tr>
                    <tr>
                        <td>August 3, 2020</td>
                        <td>Successful Proposals Announced</td>
                    </tr>
                    <tr>
                        <td>September 2020 (Anticipated)</td>
                        <td>Fellows Program Begins</td>
                    </tr>
                </tbody>
            </Table>
        </section>

        <br/>

        <section>
            <Heading>Fellowship Application Process</Heading>

            <Paragraph>
                During an open application window, applicants should submit proposals which address the requirements below.
                The proposal should be understandable to readers from outside the field of study and must clearly spell out the project aims, past studies, methods, materials, and engagement plan.
            </Paragraph>
        </section>

        <br/>

        <section>
            <Subheading>Proposal Requirements</Subheading>

            <OrderedList>
                <ListItem primary="Profile information &ndash; Provide your name, organization, department, position title, research area, email address, and your personal profile web page." />
                <ListItem primary="Letters of support &ndash; Two letters of support from mentors or key collaborators are required. Letters for projects arising from TOPMed Working Groups should demonstrate the applicant’s critical participation in a relevant working group and confirm that the applicant has (or will have) access to the appropriate data and that the proposed project is supported by the Working Group.  Letters of support should include contact information (full name, position title, organization, email/phone number, and signature) of the reference. " />
                <ListItem primary="Biographical sketch &ndash; A biographical sketch or NIH biosketch (not to exceed 5 pages) is required." />
                <ListItem primary="Abstract &ndash; Provide an abstract on your research question and how your proposed project will address the goals of the Fellows Program. (100 words maximum)" />
                <ListItem primary="Project aims &ndash; Describe concisely the specific research approach you intend to take, outlining aims, goals, deliverables, and timelines for the year. (350 words maximum)" />
                <ListItem primary="Prior studies &ndash; Using examples of work, by you or others, please outline how your proposed project aligns with past studies. Please provide sufficient background to demonstrate project feasibility, and that your project can be completed successfully in the duration of the year. (150 words maximum)" />
                <ListItem primary="Expertise &ndash; Describe your familiarity with genomic analysis, statistical programming, and cloud based computation. (100 words maximum)" />
                <ListItem primary="Methods and materials &ndash; Explain what methods and material are to be used in the project such as protocols, data, software, analysis; and how you plan to use the BioData Catalyst ecosystem to enhance your proposed project. Provide details on the status of your access to the relevant datasets (e.g. IRB approval, data use agreements), whether you are currently engaged with working groups (e.g., TOPMed), and/or outline plans to obtain data access during the Fellows Program. Include an estimate of the scale of the proposed analyses (e.g., the sample size, number of proposed analyses, and types data expected to be used). (150 words maximum)" />
                <ListItem primary="Engagement &ndash; Indicate how you will engage and collaborate with Consortium members, Fellows peer group, and the broader community. (75 words maximum)" />
                <ListItem primary="Budget estimate &ndash; Provide a budget estimate including expected research costs and costs for travel, training, publication, and conference fees. (50 words maximum)" />
                <ListItem primary="References &ndash; Provide a list of references cited in the previous questions here (100 words maximum) " />
            </OrderedList>
        </section>

        <br/>

        <section>
            <Subheading>Selection Criteria</Subheading>
    
            <Paragraph>
                A Review Committee comprised of NHLBI BioData Catalyst Consortium members, NHLBI representatives,
                and external experts will use the following criteria to evaluate proposals and select award recipients:
            </Paragraph>
    
            <BulletedList>
                <ListItem primary="The proposal is relevant to the research topic and speaks to novel approaches to challenges in the research area." />
                <ListItem primary="The proposal addresses an important scientific question that can be usefully answered using the BioData Catalyst ecosystem along with the available data resources and in the 1-year timeframe." />
                <ListItem primary="The applicant has obtained IRB approval, data use agreements (e.g. dbGaP), is participating in working groups (e.g., TOPMed), and/or is in the process of obtaining data access and dbGaP data use agreements." />
                <ListItem primary="The applicant has demonstrated the necessary background and capabilities to accomplish the proposed work." />
                <ListItem primary="The application describes approaches that will benefit the functionality of the BioData Catalyst ecosystem." />
                <ListItem primary="The applicant has a willingness to engage and collaborate with the Consortium, Fellows peer group, and the broader community." />
            </BulletedList>
        </section>

        <br/>

        <section>
            <Heading>Notification</Heading>

            <Paragraph>
                Applicants are notified of their status approximately one month after the submission window closes
                (see the timeline above for this round’s anticipated dates).
                Awardees will be expected to present a prospective outline of their research plans at the start of the fellowship,
                a mid-year status report, and to submit an end-of-term summary.
                Fellows are also expected to attend NHLBI BioData Catalyst Consortium quarterly face-to-face meetings
                and are encouraged to attend related meetings
                (<em>e.g.</em>, working groups) and events applicable to their project proposals.
            </Paragraph>
        </section>

        <br/>

        <section>
            <Heading>Questions</Heading>

            <Paragraph>
                Questions may be directed to the NHLBI BioData Catalyst Coordinating Center at <a href="mailto:bdc3@renci.org">bdc3@renci.org</a>.
            </Paragraph>
            
            <Paragraph>
                A list of Frequently Asked Questions can be viewed at <Link to="/faqs">https://biodatacatalyst.nhlbi.nih.gov/faqs</Link>
            </Paragraph>
        </section>

    </PageContent>
)

export default FellowsPage
