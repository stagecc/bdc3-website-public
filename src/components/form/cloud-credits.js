import React, { Fragment, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Paragraph } from "../typography";
import { Button } from "../buttons";
import { Card, CardHeader, CardBody } from "../card";
// import { Dots as LoadingDots } from "../loading";
import { Link } from "../link";
import {
  Form,
  FormControl,
  TextInput,
  HelpText,
  AdornedInput,
  Select,
  Option,
  TextArea,
} from "./inputs";
// import { render } from "react-dom";

const FRESHDESK_API_KEY = process.env.GATSBY_FRESHDESK_API_KEY;
const FRESHDESK_API_ROOT_URL = process.env.GATSBY_FRESHDESK_API_ROOT_URL;
const FRESHDESK_API_CREATE_TICKET_URL = `${FRESHDESK_API_ROOT_URL}/tickets`;
// const FRESHDESK_API_TICKET_FIELDS_URL = `${FRESHDESK_API_ROOT_URL}/ticket_fields`;

const requestOptions = {
  "Content-Type": "application/json",
  auth: { username: FRESHDESK_API_KEY, password: "X" },
};

const SubmitButton = styled(Button).attrs({
  type: "submit",
  value: "Submit",
})``;

const ThankYouMessage = () => {
  return (
    <Paragraph center>
      Thanks &mdash; your cloud credits request has been submitted!
    </Paragraph>
  );
};

const ErrorMessage = () => {
  return (
    <Fragment>
      <Paragraph center>
        Sorry &mdash; an error occurred while submitting your request!
      </Paragraph>
      <Paragraph center>
        Please submit submit your request on{" "}
        <Link to="https://bdcatalyst.freshdesk.com">
          our help desk
        </Link>{" "}
        while we resolve this issue. Thanks!
      </Paragraph>
    </Fragment>
  );
};

export const CloudCreditsForm = (props) => {
  const honeypotFieldRef = useRef(null);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [terraUsername, setTerraUserName] = useState("");
  const [projectPi, setProjectPi] = useState("");
  const [email, setEmail] = useState("");
  const [how, setHow] = useState("");
  const [role, setRole] = useState("");
  const [cloudCreditsRequest, setCloudCreditsRequest] = useState("");
  const [organization, setOrganization] = useState("");
  const [collaborators, setCollaborators] = useState("");
  const [relatedResearch, setRelatedResearch] = useState("");
  const [project, setProject] = useState("");
  const [justification, setJustification] = useState("");
  const [previousFundingDetails, setPreviousFundingDetails] = useState("");
  const [estimate, setEstimate] = useState();
  const [platform, setPlatform] = useState("Select One");
  const [preferedAnalysisPlatform, setPreferedAnalysisPlatform] = useState(
    "Not Applicable"
  );
  const [requestedTerraAmount, setRequestedTerraAmount] = useState(0);
  const [
    requestedSevenBridgesAmount,
    setRequestedSevenBridgesAmount,
  ] = useState(0);

  const [justificationLength, setJustificationLength] = useState();
  const [
    previousFundingDetailsLength,
    setPreviousFundingDetailsLength,
  ] = useState();

  const [projectLength, setProjectLength] = useState(0);

  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [error, setError] = useState();
  const [buttonLocked, setbuttonLocked] = useState(false);

  const testSubmission = ["staging", "localhost"].includes(
    window.location.hostname
  );

  // useEffect(() => {
  //   // before rendering the form, fetch the options for the Platform select dropown
  //   const fetchPlatformOptions = async () => {
  //     await axios
  //       .get(FRESHDESK_API_TICKET_FIELDS_URL, requestOptions)
  //       .then((response) => {
  //         // const platformField = response.data.find(
  //         //   (field) => field.name === "cf_what_bdcatalyst_service_will_you_use"
  //         // );
  //         // setPlatformOptions(platformField.choices);
  //         // console.log(response);
  //       })
  //       .catch((error) => console.error(error));
  //   };
  //   fetchPlatformOptions();
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if(honeypotFieldRef.current?.value !== "") return;

    let prefix = testSubmission ? "[TEST] " : "";
    const description =
      `Name: ${name} ~~~~~ ` +
      `Email Address: ${email} ~~~~~ ` +
      `Username (Seven Bridges Only)): ${username} ~~~~~ ` +
      `Project Pi (If applicable): ${projectPi} ~~~~~ ` +
      `Role: ${role} ~~~~~ ` +
      `Company/Organization: ${organization} ~~~~~ ` +
      `Collaborators: ${collaborators} ~~~~~ ` +
      `Is your research related to HLBS?: ${relatedResearch} ~~~~~ ` +
      `How did you learn about BioData Catalyst?: ${how} ~~~~~ ` +
      `BioData Catalyst users may request one of the following: ${cloudCreditsRequest} ~~~~~ ` +
      `Select your preferred analysis platform (or choose to explore both) ${preferedAnalysisPlatform} ~~~~~ ` +
      `Project Name & Description: ${project} ~~~~~ ` +
      `Justification for Credits: ${justification} ~~~~~ ` +
      `cf_cloud_credits_previous_use_of_cloud_credits: ${previousFundingDetails} ~~~~~ ` +
      `Estimate of Cloud Credits Needed: $${estimate} ~~~~~ ` +
      `Platform/Service: ${platform} ~~~~~ ` +
      `cf_cloud_credits_requested_terra_amount: ${requestedTerraAmount} ~~~~~ ` +
      `cf_cloud_credits_requested_seven_bridges_amount: ${requestedSevenBridgesAmount} ~~~~~ ` +
      `~~~~~ ~~~~~ (This ticket was submitted from ${window.location.href}.)`;

    const additionalFields =
      cloudCreditsRequest === "Additional cloud credits"
        ? {
            cf_cloud_credits_project_namedescription: project,
            cf_cloud_credits_previous_use_of_cloud_credits: previousFundingDetails,
            cf_estimated_cloud_credits_requested: Number(estimate),
            cf_justification_for_credits: justification,
            cf_what_bdcatalyst_service_will_you_use: platform,
            cf_cloud_credits_requested_terra_amount: Number(
              requestedTerraAmount
            ),
            cf_cloud_credits_requested_seven_bridges_amount: Number(
              requestedSevenBridgesAmount
            ),
          }
        : {};

    const payload = {
      type: "Cloud Credits",
      subject: prefix + "Cloud Credits Request",
      description: prefix + description,
      priority: 1,
      status: 2,
      name: name,
      email: email,
      custom_fields: {
        cf_cloud_credits_username_seven_bridges_only: username,
        cf_cloud_credits_terra_user_name: terraUsername,
        cf_cloud_credits_project_pi: projectPi,
        cf_cf_cloud_credits_collaborator_information: role,
        cf_cf_organization: organization,
        cf_cloud_credits_collaborator_information: collaborators,
        cf_cloud_credits_related_research_to_hlbs: relatedResearch,
        cf_cloud_credits_how_did_you_learn_about_bdc: how,
        cf_cloud_credits_request_type: cloudCreditsRequest,
        cf_cloud_credits_preferred_analysis_platform_amount: preferedAnalysisPlatform,
        ...additionalFields,
      },
    };

    const submitTicket = async () => {
      setWasSubmitted(true);
      await axios
        .post(FRESHDESK_API_CREATE_TICKET_URL, payload, requestOptions)
        .then((response) => {
          if (![200, 201].includes(response.status)) {
            setbuttonLocked(false);
            throw new Error(`Unsuccessful HTTP response, ${response.status}`);
          }
          setbuttonLocked(true);
        })
        .catch((error) => {
          setError(error);
        });
    };
    submitTicket();
  };

  const renderSwitch = (platform) => {
    switch (platform) {
      case "$250 each on both Seven Bridges and Terra":
        return (
          <>
            <FormControl>
              <label htmlFor="username">
                {" "}
                Seven Bridges users only: Platform User Name (create account{" "}
                <Link to="https://docs.sevenbridges.com/docs/sign-up">
                  here
                </Link>
                )
              </label>
              <TextInput
                required
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleChangeUserName}
              />
              {/* <HelpText>Seven Bridges users only</HelpText> */}
            </FormControl>{" "}
            <FormControl>
              <label htmlFor="terraUsername">
                Terra users only: Google identity (create account{" "}
                <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/written-documentation/getting-started/analyze-data-1/terra/account-setup">
                  here
                </Link>
                )
              </label>
              <TextInput
                required
                type="text"
                id="terraUsername"
                name="terraUsername"
                value={terraUsername}
                onChange={handleChangeTerraUserName}
              />
              {/* <HelpText>Terra users only</HelpText> */}
            </FormControl>
          </>
        );
      case "Both Seven Bridges and Terra":
        return (
          <>
            <FormControl>
              <label htmlFor="username">
                {" "}
                Seven Bridges users only: Platform User Name (create account{" "}
                <Link to="https://docs.sevenbridges.com/docs/sign-up">
                  here
                </Link>
                )
              </label>
              <TextInput
                required
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleChangeUserName}
              />
              {/* <HelpText>Seven Bridges users only</HelpText> */}
            </FormControl>{" "}
            <FormControl>
              <label htmlFor="terraUsername">
                Terra users only: Google identity (create account{" "}
                <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/written-documentation/getting-started/analyze-data-1/terra/account-setup">
                  here
                </Link>
                )
              </label>
              <TextInput
                required
                type="text"
                id="terraUsername"
                name="terraUsername"
                value={terraUsername}
                onChange={handleChangeTerraUserName}
              />
              {/* <HelpText>Terra users only</HelpText> */}
            </FormControl>
          </>
        );
      case "$500 on Seven Bridges":
        return (
          <>
            <FormControl>
              <label htmlFor="username">
                {" "}
                Seven Bridges users only: Platform User Name (create account{" "}
                <Link to="https://docs.sevenbridges.com/docs/sign-up">
                  here
                </Link>
                )
              </label>
              <TextInput
                required
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleChangeUserName}
              />
              {/* <HelpText>Seven Bridges users only</HelpText> */}
            </FormControl>
          </>
        );
      case "Seven Bridges":
        return (
          <>
            <FormControl>
              <label htmlFor="username">
                {" "}
                Seven Bridges users only: Platform User Name (create account{" "}
                <Link to="https://docs.sevenbridges.com/docs/sign-up">
                  here
                </Link>
                )
              </label>
              <TextInput
                required
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleChangeUserName}
              />
              {/* <HelpText>Seven Bridges users only</HelpText> */}
            </FormControl>
          </>
        );
      case "$500 on Terra":
        return (
          <>
            <FormControl>
              <label htmlFor="terraUsername">
                Terra users only: Google identity (create account{" "}
                <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/written-documentation/getting-started/analyze-data-1/terra/account-setup">
                  here
                </Link>
                )
              </label>
              <TextInput
                required
                type="text"
                id="terraUsername"
                name="terraUsername"
                value={terraUsername}
                onChange={handleChangeTerraUserName}
              />
              {/* <HelpText>Terra users only</HelpText> */}
            </FormControl>
          </>
        );
      case "Terra":
        return (
          <>
            <FormControl>
              <label htmlFor="terraUsername">
                Terra users only: Google identity (create account{" "}
                <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/written-documentation/getting-started/analyze-data-1/terra/account-setup">
                  here
                </Link>
                )
              </label>
              <TextInput
                required
                type="text"
                id="terraUsername"
                name="terraUsername"
                value={terraUsername}
                onChange={handleChangeTerraUserName}
              />
              {/* <HelpText>Terra users only</HelpText> */}
            </FormControl>
          </>
        );

      default:
        return <></>;
    }
  };

  const handleChangeName = (event) => setName(event.target.value);
  const handleChangeProjectPi = (event) => setProjectPi(event.target.value);
  const handleChangeUserName = (event) => setUserName(event.target.value);
  const handleChangeTerraUserName = (event) =>
    setTerraUserName(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangeRole = (event) => setRole(event.target.value);
  const handleChangeOrganization = (event) =>
    setOrganization(event.target.value);
  const handleChangeCollaborators = (event) =>
    setCollaborators(event.target.value);
  const handleChangeProject = (event) => {
    setProject(event.target.value);
    setProjectLength(event.target.value.length);
  };
  const handleChangeJustification = (event) => {
    setJustification(event.target.value);
    setJustificationLength(event.target.value.length);
  };
  const handleChangePreviousFundingDetails = (event) => {
    setPreviousFundingDetails(event.target.value);
    setPreviousFundingDetailsLength(event.target.value.length);
  };
  const handleChangeEstimate = (event) => setEstimate(event.target.value);
  const handleChangePlatform = (event) => setPlatform(event.target.value);
  const handleChangeRelatedResearch = (event) =>
    setRelatedResearch(event.target.value);
  const handleChangeHow = (event) => setHow(event.target.value);
  const handleChangeCloudCreditsRequest = (event) =>
    setCloudCreditsRequest(event.target.value);
  const handleChangePreferedAnalysisPlatform = (event) =>
    setPreferedAnalysisPlatform(event.target.value);
  const handleChangeRequestedSevenBridgesAmount = (event) =>
    setRequestedSevenBridgesAmount(event.target.value);
  const handleChangeRequestedTerraAmount = (event) =>
    setRequestedTerraAmount(event.target.value);

  return (
    <Card {...props}>
      <CardHeader>Cloud Credits Request</CardHeader>
      <CardBody>
        <Paragraph center noMargin>
          Before completing this form you must create an account on the
          applicable platform(s),{" "}
          <Link to="https://sb-biodatacatalyst.readme.io/docs/sign-up-for-biodata-catalyst-powered-by-seven-bridges">
            Seven Bridges
          </Link>{" "}
          or{" "}
          <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/written-documentation/getting-started/analyze-data-1/terra/account-setup">
            Terra
          </Link>
          .
        </Paragraph>
        <Paragraph right noMargin>
          * <em>All fields are required.</em>
        </Paragraph>
        <Form onSubmit={handleSubmit}>

          {/* fake field for detecting bots, not visible to user */}
          <FormControl fake>
            <label htmlFor="website">
              Website
            </label>
            <TextInput
              type="text"
              id="website"
              name="website"
              defaultValue=""
              tabIndex="-1"
              autoComplete="off"
              ref={honeypotFieldRef}
            />
          </FormControl>
          <FormControl>
            <label htmlFor="name" required>
              Your Name *
            </label>
            <TextInput
              type="text"
              required
              id="name"
              name="name"
              value={name}
              onChange={handleChangeName}
            />
          </FormControl>
          <FormControl>
            <label htmlFor="email">Email Address *</label>
            <TextInput
              type="email"
              required
              id="email"
              name="email"
              value={email}
              onChange={handleChangeEmail}
            />
            <HelpText>Please use an organizational email address.</HelpText>
          </FormControl>
          <FormControl>
            <label htmlFor="projectPi">Project PI </label>
            <TextInput
              type="text"
              id="projectPi"
              name="projectPi"
              value={projectPi}
              onChange={handleChangeProjectPi}
            />
            <HelpText>(if applicable)</HelpText>
          </FormControl>
          <FormControl>
            <label htmlFor="role">Your Role *</label>
            <TextInput
              type="role"
              required
              id="role"
              name="role"
              value={role}
              onChange={handleChangeRole}
            />
          </FormControl>
          <FormControl>
            <label htmlFor="organization">Your Organization *</label>
            <TextInput
              type="organization"
              required
              id="organization"
              name="organization"
              value={organization}
              onChange={handleChangeOrganization}
            />
          </FormControl>
          <FormControl>
            <label htmlFor="collaborators">Collaborators (if applicable)</label>
            <TextArea
              id="collaborators"
              name="collaborators"
              placeholder={`Enter each collaborator's name, email, role, and organization.`}
              value={collaborators}
              onChange={handleChangeCollaborators}
            />
            <HelpText>
              Please list&mdash;one per line&mdash;the Name, Email, Role, and
              Organization of each PI, Collaborator, and Student.
            </HelpText>
          </FormControl>
          <FormControl>
            <label htmlFor="relatedResearch">
              Is your research related to HLBS? *
            </label>
            <Select
              required
              id="relatedResearch"
              name="relatedResearch"
              value={relatedResearch}
              onChange={handleChangeRelatedResearch}
            >
              <Option value="">Select One</Option>

              <Option You value={"Yes"}>
                Yes
              </Option>
              <Option You value={"No"}>
                No
              </Option>
            </Select>
            <HelpText>
              Cloud Credits are available only to researchers of Heart, Lung,
              Blood and Sleep (HLBS) disorders.
            </HelpText>
          </FormControl>
          <FormControl>
            <label htmlFor="how">
              How did you learn about BioData Catalyst?
            </label>
            <TextArea
              id="how"
              name="how"
              value={how}
              onChange={handleChangeHow}
            />
          </FormControl>
          <FormControl>
            <label htmlFor="cloudCreditsRequest">
              BioData Catalyst users may request one of the following: *
            </label>
            <Select
              required
              id="cloudCreditsRequest"
              name="cloudCreditsRequest"
              value={cloudCreditsRequest}
              onChange={handleChangeCloudCreditsRequest}
            >
              <Option value="">Select One</Option>
              <Option
                You
                value={
                  "$500 in initial pilot cloud credits to begin a project or explore the ecosystem"
                }
              >
                $500 in initial pilot cloud credits to begin a project or
                explore the ecosystem
              </Option>
              <Option You value={"Additional cloud credits"}>
                Additional cloud credits
              </Option>
            </Select>
          </FormControl>
          {cloudCreditsRequest ===
            "$500 in initial pilot cloud credits to begin a project or explore the ecosystem" && (
            <>
              <FormControl>
                <label htmlFor="preferedAnalysisPlatform">
                  Select your preferred analysis platform * (or choose to
                  explore both)
                </label>
                <Select
                  required
                  id="preferedAnalysisPlatform"
                  name="preferedAnalysisPlatform"
                  value={preferedAnalysisPlatform}
                  onChange={handleChangePreferedAnalysisPlatform}
                >
                  <Option value="">Select One</Option>
                  <Option You value={"$500 on Seven Bridges"}>
                    $500 on Seven Bridges
                  </Option>
                  <Option You value={"$500 on Terra"}>
                    $500 on Terra
                  </Option>
                  <Option
                    You
                    value={"$250 each on both Seven Bridges and Terra"}
                  >
                    $250 each on both Seven Bridges and Terra
                  </Option>
                </Select>
              </FormControl>
              {renderSwitch(preferedAnalysisPlatform)}
            </>
          )}
          {cloudCreditsRequest === "Additional cloud credits" && (
            <>
              <FormControl>
                <label htmlFor="project">Project Name & Description *</label>
                <TextArea
                  required
                  id="project"
                  name="project"
                  placeholder={`Enter project name and a brief description.`}
                  value={project}
                  onChange={handleChangeProject}
                  maxLength="3000"
                />
                <HelpText>
                  Limit your response to 3000 characters. (Current length:{" "}
                  {projectLength} / 3000 characters.)
                </HelpText>
              </FormControl>
              <FormControl>
                <label htmlFor="previous-funding-details">
                  Previous use of cloud credits *
                </label>
                <TextArea
                  id="previous-funding-details"
                  name="previous-funding-details"
                  placeholder={`Briefly outline your use of previous cloud credit funding.`}
                  value={previousFundingDetails}
                  onChange={handleChangePreviousFundingDetails}
                  maxLength="3000"
                  required
                />
                <HelpText>
                  Briefly outline your use of previous cloud credit funding.
                  Limit your response to 3000 characters. (Current length:
                  {previousFundingDetailsLength} / 3000 characters.)
                </HelpText>
              </FormControl>
              <FormControl>
                <label htmlFor="estimate">
                  Estimate of Cloud Credits Needed *
                </label>
                <AdornedInput
                  type="number"
                  required
                  min="1"
                  id="estimate"
                  name="estimate"
                  value={estimate}
                  onChange={handleChangeEstimate}
                  adornment="$"
                />
                <HelpText>
                  Please enter your estimate in US Dollars. Round up to the
                  nearest $100 and add a $300 buffer for troubleshooting and
                  testing.
                </HelpText>
              </FormControl>
              <FormControl>
                <label htmlFor="justification">
                  Justification for Credits *
                </label>
                <TextArea
                  required
                  id="justification"
                  name="justification"
                  placeholder={`Enter a brief justification for your request.`}
                  value={justification}
                  onChange={handleChangeJustification}
                  maxLength="6000"
                />
                <HelpText>
                  Reviewers will be interested in: 1.) Significance and goals of
                  the project; 2.) Datasets, tools, types of analysis to be
                  used; 3.) Experience using cloud platforms; 4.) Anticipated
                  timeline for the work; 5.) Whether workflows/pipelines have
                  been optimized and/or if guidance/consultation from the
                  platforms has been sought; 6.) Estimated costs split out by
                  development, testing, analysis optimization, and the running
                  of the analysis (provide a basis for the estimated costs e.g.
                  prior research results with reference numbers); 7.) Number of
                  samples, cost per sample, and whether there is sufficient
                  power of analysis. Limit your response to 6000 characters.
                  (Current length: {justificationLength} / 6000 characters.)
                </HelpText>
              </FormControl>
              <FormControl>
                <label htmlFor="platform">
                  Select the platform on which you will use the additional
                  credits: *
                </label>
                <Select
                  required
                  id="platform"
                  name="platform"
                  value={platform}
                  onChange={handleChangePlatform}
                >
                  <Option value="Select One">Select One</Option>
                  <Option value="Seven Bridges">Seven Bridges</Option>
                  <Option value="Terra">Terra</Option>
                  <Option value="Both Seven Bridges and Terra">
                    Both Seven Bridges and Terra
                  </Option>
                </Select>
              </FormControl>
              {renderSwitch(platform)}
              {platform === "Both Seven Bridges and Terra" && (
                <>
                  <FormControl>
                    <label htmlFor="requestedSevenBridgesAmount">
                      Indicate the amount of cloud credits requested for use on
                      each platform *
                    </label>
                    <AdornedInput
                      type="number"
                      required
                      min="1"
                      id="requestedSevenBridgesAmount"
                      name="requestedSevenBridgesAmount"
                      value={requestedSevenBridgesAmount}
                      onChange={handleChangeRequestedSevenBridgesAmount}
                      adornment="$"
                      placeholder="Seven Bridges:"
                    />
                    <HelpText>Seven Bridges</HelpText>
                    <AdornedInput
                      type="number"
                      required
                      min="1"
                      id="requestedTerraAmount"
                      name="requestedTerraAmount"
                      value={requestedTerraAmount}
                      onChange={handleChangeRequestedTerraAmount}
                      adornment="$"
                      placeholder="Terra:"
                    />
                    <HelpText>Terra</HelpText>
                  </FormControl>
                </>
              )}
            </>
          )}
          <br />
          <SubmitButton disabled={buttonLocked}>Submit</SubmitButton>
        </Form>
        {/* {!wasSubmitted && platformOptions.length === 0 && (
          <LoadingDots
            color="var(--color-crimson)"
            text="Loading form..."
            textPlacement="top"
          />
        )} */}
        {wasSubmitted && !error && <ThankYouMessage />}
        {wasSubmitted && error && <ErrorMessage />}
      </CardBody>
    </Card>
  );
};
