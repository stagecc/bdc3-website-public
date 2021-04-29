import React, { Fragment, useEffect, useState } from 'react'
import { SEO } from '../../components/seo'
import { Link } from 'gatsby'
import { PageContent } from '../../components/layout'
import { Title, Heading, Subheading, Paragraph } from '../../components/typography'
import { BulletedList, OrderedList, ListItem } from '../../components/list'
import { Table } from '../../components/table'
import { Button } from '../../components/buttons'
import { ExternalLink } from '../../components/link'
import { Alert } from '../../components/alert'

const FellowsPage = () => {
    const [now, ] = useState(new Date())
    const [acceptingApplications, setAcceptingApplications] = useState(false)

    const applicationWindow = {
        startDate: new Date('October 16, 2020 00:00:00'),
        endDate: new Date('December 4, 2020 23:59:59'),
    }

    useEffect(() => {
        setAcceptingApplications(applicationWindow.startDate <= now && now <= applicationWindow.endDate)
    }, [now, applicationWindow.startDate, applicationWindow.endDate])

    return (
        <PageContent width="95%" maxWidth="1200px" center gutters>
            <SEO
                title="Fellows Program"
                description=""
                keywords=""
            />
    
            <Title>Fellows Program Call for Proposals</Title>

            {
                !acceptingApplications && (
                    <Alert
                        type="info" center
                        message="Please note applications to the BioData Catalyst Fellowship Program are currently closed."
                        style={{ width: '75%', margin: '2rem auto' }}
                    />
                )
            }
            
            <section>
                <Heading>About the BioData Catalyst Fellows Program</Heading>
        
                <Paragraph>
                    The NHLBI BioData Catalyst Fellows Program provides early-career researchers (graduate students, postdocs, junior faculty, and others) the opportunity to receive funding to help support research on novel and innovative data science and data-focused research problems. The program is open to academic disciplines conducting biomedical research in heart, lung, blood, and sleep (HLBS) domains and may include focus on the impact of SARS-COV-2 in those domains.
                </Paragraph>
        
                <Paragraph>
                    The vision for the BioData Catalyst is to be a community-driven ecosystem implementing data science solutions, democratizing data and computational access, extending services such as TOPMed and dbGaP, and advancing HLBS science. The BioData Catalyst Fellows Program offers a mechanism for early career researchers to engage with the Consortium as partners in the BioData Catalyst endeavor. The BioData Catalyst Consortium seeks projects that represent diversity across fields of study, institutions, geography, and investigators.
                </Paragraph>
        
                <Paragraph>
                    BioData Catalyst Fellows will:
                </Paragraph>
        
                <BulletedList>
                    <ListItem primary="Improve the NHLBI BioData Catalyst ecosystem based on their feedback. Fellows are among the first users of the ecosystem, chosen in part because they have projects that can benefit from, and be of benefit to, BioData Catalyst." />
                    <ListItem primary="Be our collaborators. Together we will test and expand the BioData Catalyst ecosystem with new tools, data, and capabilities." />
                    <ListItem primary="Have dedicated time to carry out their projects and thereby accelerate their research productivity." />
                    <ListItem primary="Act as our ambassadors in their communities to help onboard others." />
                </BulletedList>

                <Paragraph>
                    Read what our <ExternalLink to="https://drive.google.com/file/d/12MdA9L_0Ouf6CI08zVFxlAOQuN8Wxh_9/view?usp=sharing">Cohort I Fellows have said</ExternalLink> about
                    the NHLBI BioData Catalyst ecosystem and view the projects
                    from <Link to="/fellows/cohort1">Cohort 1</Link> and <Link to="/fellows/cohort2">Cohort 2</Link>.
                </Paragraph>

                {
                    acceptingApplications && (
                        <Fragment>
                            <br/>
                            <Paragraph center>
                                <Button as={ Link } to="/fellows/apply">Apply Now</Button>
                            </Paragraph>
                        </Fragment>
                    )
                }

            </section>
    
            <br/>
            
            <section>
                <Heading>Fellowship Eligibility</Heading>
                
                <Paragraph>
                    Preference will be given to proposals that leverage the strengths of the ecosystem to enable cutting edge research and also test the capabilities of the ecosystem. Consideration will be given to early-career applicants (graduate students, postdocs, junior faculty, and others), especially those who will bring diversity to the BioData Catalyst community.
                </Paragraph>
    
                <Paragraph>
                    The Cohort 3 fellowship funding period will run 12 months, from March 2021 to February 2022, with a brief project report due six months into the project and a final report due at the end. All Fellows will be expected to be involved in NHLBI BioData Catalyst activities during the year, including attending quarterly consortium meetings and participating in monthly Fellows meetings. Fellows will also be encouraged to make their workflows and tools available within the ecosystem and the broader research community and to welcome and help onboard new users to the community.
                </Paragraph>
   
                <Subheading>Team-Based Proposals</Subheading>
    
                <Paragraph>
                    Team-based proposals (for example a subject matter expert paired with a computational expert) are available for Cohort 3 applications. Team proposals offer an opportunity to fulfill the BioData Catalyst goal of fostering diversity across fields of study, institutions, geography, and investigators. Team members should submit separate applications with the prefix "Team Proposal:". Title, Abstract, Project Aims, and Budget Estimate should be the same for Team proposals.  Team proposals will need to demonstrate the significance and added value of including multiple investigators. Team proposal budgets should clearly indicate the percentage of work to be done by each collaborator and should justify any budget of more than $69, 733 for the project as a whole, up to $100,000.
                </Paragraph>

                <Subheading>SARS-COV-2 Proposals</Subheading>
    
                <Paragraph>
                    Research proposals that aim to extend our understanding of the effects of SARS-COV-2 in HLBS domains are strongly encouraged. The NHLBI encourages the use of the BioData Catalyst ecosystem to study SARS-COV-2 pathophysiology and understand long-term sequelae as the pandemic continues to evolve. More information on SARS-COV-2 work being done on BioData Catalyst can be found <Link to="/covid-19">here</Link>.
                </Paragraph>
            </section>
    
            <br/>
    
            <section>
                <Heading>Fellowship Financial Stipend</Heading>
    
                <Paragraph>
                    Awardees will receive a stipend of up to $69,733, which includes costs for salary, travel, training, publication, and conference fees. As part of the Uniform Guidance, fellowships are not subject to indirect costs, and these should not be budgeted. Reasonable cloud costs will be covered by NHLBI and should not be included in your budget. Fellows are expected to contribute a significant percentage of their time to their project proposals (25% at a minimum for each Fellow).
                </Paragraph>
            </section>
    
            <br/>
    
            <section>
                <Heading>Cohort 3 Fellows Program Timeline</Heading>
    
                <Table>
                    <thead>
                        <tr>
                            <th style={{ padding: '0.5rem' }}>Date</th>
                            <th style={{ padding: '0.5rem' }}>Event</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>October 16, 2020</td>
                            <td>Application Process Opens </td>
                        </tr>
                        <tr>
                            <td>December 4, 2020 11:59 PM Eastern Time</td>
                            <td>Application Deadline</td>
                        </tr>
                        <tr>
                            <td>January 25, 2021 (Anticipated)</td>
                            <td>Award notices released</td>
                        </tr>
                        <tr>
                            <td>March 1, 2021 (Anticipated)</td>
                            <td>Fellows Program Begins</td>
                        </tr>
                        <tr>
                            <td>February 28, 2022 (Anticipated)</td>
                            <td>Fellows Program Ends</td>
                        </tr>
                    </tbody>
                </Table>
            </section>
    
            <br/>
    
            <section>
                <Heading>Fellowship Application Process</Heading>
    
                <Paragraph>
                    Applicants submit proposals during the open Cohort 3 application window. Proposals should address the requirements below and any additional questions via the Fellows Program Application Form. The proposal should be understandable to readers from outside the field of study and must clearly spell out the project aims, past studies, methods, materials, and BioData Catalyst engagement plan.
                </Paragraph>
    
                <br/>
    
                <Subheading>Proposal Requirements</Subheading>
    
                <OrderedList>
                    <ListItem
                        primary="Profile Information"
                        secondary="Provide your name, organization, department, position title, research area, email address, and your profile web page."
                    />
                    <ListItem
                        primary="Letters of Support"
                        secondary="Two signed letters of support from mentors or key collaborators are required. Letters for projects arising from TOPMed Working Groups should demonstrate the applicant’s participation in a relevant working group and confirm that the applicant has (or will have) access to the appropriate data and that the proposed project is supported by the Working Group. Letters of support should include contact information of the reference (full name, position title, organization, email/phone number, and signature)."
                    />
                    <ListItem
                        primary="Biographical Sketch"
                        secondary="NIH biosketch or a biographical sketch (not to exceed 5 pages) is required."
                    />
                    <ListItem
                        primary="Abstract"
                        secondary="Provide an abstract on your research question and how your proposed project will address the goals of the Fellows Program. (125 words maximum)"
                    />
                    <ListItem
                        primary="Project Aims"
                        secondary="Describe concisely the specific research approach you intend to take, specifically outlining aims, goals, deliverables, and timelines for the year. (300 words maximum)"
                    />
                    <ListItem
                        primary="Prior Studies"
                        secondary="Using examples of work, by you or others, please outline how your proposed project would align with past studies. Please provide sufficient background to demonstrate project feasibility, and that your project can be completed successfully in the duration of the year. (175 words maximum)"
                    />
                    <ListItem
                        primary="Expertise"
                        secondary="Describe your familiarity with genomic analysis, statistical programming, and cloud based computation. (125 words maximum)"
                    />
                    <ListItem
                        primary="Methods and Materials"
                        secondary="Explain what methods and material are to be used in the project such as protocols, data, software, analysis; and how you plan to use the BioData Catalyst ecosystem to enhance your proposed project. Provide details on the status of your access to the relevant datasets (e.g. IRB approval, data use agreements), whether you are currently engaged with working groups (e.g. TOPMED), and/or outline plans to obtain data access during the Fellows Program. Include an estimate of the scale of the proposed analyses (e.g., the sample size, number of proposed analyses, and types data expected to be used). (300 words maximum)"
                    />
                    <ListItem
                        primary="Engagement"
                        secondary="Fellows are expected to participate in regular Consortium meetings, including quarterly meetings, monthly Fellows meetings, and relevant working groups; provide on-going feedback on the ecosystem, and share analysis results and software with the community, as appropriate.  Please outline any other ideas on how to engage and collaborate (e.g., training on use of a novel workflow created in the project) with the Consortium and the broader community as an ambassador for BioData Catalyst  (100 words maximum)"
                    />
                    <ListItem
                        primary="Budget Estimate"
                        secondary="Provide a budget estimate including costs for salary, travel, training, publication, and conference fees. As part of the Uniform Guidance, fellowships are not subject to indirect costs. Fringe benefits, tuition, and equipment (e.g. computers) are not an allowable costs on the stipend payment.  (75 words maximum)"
                    />
                    <ListItem
                        primary="References"
                        secondary="Provide a list of references cited in the previous questions here (125 words maximum)"
                    />
                </OrderedList>
    
                <br/>
    
                <Subheading>Selection Criteria</Subheading>
        
                <Paragraph>
                    A Review Committee comprised of NHLBI BioData Catalyst Consortium members, NHLBI representatives, and external experts will use the following criteria to evaluate proposals and select award recipients:
                </Paragraph>
        
                <BulletedList>
                    <ListItem primary="The proposal outlines a high-impact research topic and speaks to novel approaches to meet challenges in the research area." />
                    <ListItem primary="The proposal addresses an important scientific question that can be usefully answered using the BioData Catalyst ecosystem along with the available data resources within the 1-year timeframe." />
                    <ListItem primary="The applicant has assembled relevant assets and is ready to begin the project at funding, if awarded." />
                    <ListItem primary="The applicant has obtained IRB approval, data use agreements (e.g. dbGaP), is participating in working groups (e.g. TOPMED) as appropriate, and/or is in the process of obtaining data access and dbGaP data use agreements before applying." />
                    <ListItem primary="The applicant has demonstrated the necessary background and capabilities to accomplish the proposed work." />
                    <ListItem primary="The application describes approaches and/or tools that will benefit the functionality of the BioData Catalyst ecosystem." />
                    <ListItem primary="The application represents diversity across fields of study, institutions, geography, and investigators." />
                    <ListItem primary="The applicant has a willingness to engage and collaborate with the BioData Catalyst community, contribute to documentation and training resources, be an ambassador welcoming and empowering new users, and help foster a diverse and inclusive community." />
                </BulletedList>
            </section>
    
            <br/>
    
            <section>
                <Heading>Notification</Heading>
    
                <Paragraph>
                    Applicants should expect to be notified of their award status approximately one month after the submission window closes (see the timeline above for anticipated dates). Applicants who receive an award should expect to immediately begin the process of establishing a subcontract award between their home institution and the University of North Carolina at Chapel Hill.
                </Paragraph>
            </section>
    
            <br/>
    
            <section>
                <Heading>Questions</Heading>
    
                <Paragraph>
                    Questions regarding the Fellows Program may be directed to the NHLBI BioData Catalyst Help Desk and by selecting the Fellows Program type from the <Link to="/contact">contact form</Link>.
                </Paragraph>
            </section>
    
            <br/>
    
            <section>
                <Heading>Frequently Asked Questions</Heading>
    
                <Paragraph>
                    A list of Frequently Asked Questions can be viewed at <Link to="/fellows/faqs">https://biodatacatalyst.nhlbi.nih.gov/fellows/faqs</Link>.
                </Paragraph>
            </section>
    
        </PageContent>
    )
}

export default FellowsPage
