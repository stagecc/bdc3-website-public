import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Paragraph } from "../typography";
import { Button } from "../buttons";
import { Card, CardHeader, CardBody } from "../card";
import { Dots as LoadingDots } from "../loading";
import { ExternalLink } from "../link";
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

const FRESHDESK_API_KEY = process.env.GATSBY_FRESHDESK_API_KEY;
const FRESHDESK_API_ROOT_URL = process.env.GATSBY_FRESHDESK_API_ROOT_URL;
const FRESHDESK_API_CREATE_TICKET_URL = `${FRESHDESK_API_ROOT_URL}/tickets`;
const FRESHDESK_API_TICKET_FIELDS_URL = `${FRESHDESK_API_ROOT_URL}/ticket_fields`;

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
        <ExternalLink to="https://bdcatalyst.freshdesk.com">
          our help desk
        </ExternalLink>{" "}
        while we resolve this issue. Thanks!
      </Paragraph>
    </Fragment>
  );
};

export const CloudCreditsForm = (props) => {
  const [platformOptions, setPlatformOptions] = useState([]);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [organization, setOrganization] = useState("");
  const [collaborators, setCollaborators] = useState("");
  const [project, setProject] = useState("");
  const [justification, setJustification] = useState("");
  const [previousFunding, setPreviousFunding] = useState(false);
  const [previousFundingDetails, setPreviousFundingDetails] = useState("");
  const [estimate, setEstimate] = useState(1);
  const [platform, setPlatform] = useState("");

  const [justificationLength, setJustificationLength] = useState(0);
  const [
    previousFundingDetailsLength,
    setPreviousFundingDetailsLength,
  ] = useState(0);
  const [projectLength, setProjectLength] = useState(0);

  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [error, setError] = useState();

  const testSubmission = ["staging", "localhost"].includes(
    window.location.hostname
  );

  useEffect(() => {
    // before rendering the form, fetch the options for the Platform select dropown
    const fetchPlatformOptions = async () => {
      await axios
        .get(FRESHDESK_API_TICKET_FIELDS_URL, requestOptions)
        .then((response) => {
          const platformField = response.data.find(
            (field) => field.name === "cf_what_bdcatalyst_service_will_you_use"
          );
          setPlatformOptions(platformField.choices);
        })
        .catch((error) => console.error(error));
    };
    fetchPlatformOptions();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    let prefix = testSubmission ? "[TEST] " : "";
    const description =
      `Name: ${name} ~~~~~ ` +
      `Email Address: ${email} ~~~~~ ` +
      `Role: $${role} ~~~~~ ` +
      `Company/Organization: ${organization} ~~~~~ ` +
      `Collaborators: ${collaborators} ~~~~~ ` +
      `Project Name & Description: ${project} ~~~~~ ` +
      `Justification for Credits: ${justification} ~~~~~ ` +
      `Previous Requested Cloud Credits: ${previousFunding} ~~~~~ ` +
      `Use of Initial Pilot Credits: ${previousFundingDetails} ~~~~~ ` +
      `Estimate of Cloud Credits Needed: $${estimate} ~~~~~ ` +
      `Platform/Service: ${platform} ~~~~~ ` +
      `~~~~~ ~~~~~ (This ticket was submitted from ${window.location.href}.)`;
    const payload = {
      type: "Cloud Credits",
      subject: prefix + "Cloud Credits Request",
      description: prefix + description,
      priority: 1,
      status: 2,
      name: name,
      email: email,
      custom_fields: {
        cf_cloud_credits_collaborator_information: collaborators,
        cf_cloud_credits_project_namedescription: project,
        cf_justification_for_credits: justification,
        cf_cloud_credits_previous_request: previousFunding,
        cf_cloud_credits_use_of_initial_pilot_credits: previousFundingDetails,
        cf_estimated_cloud_credits_requested: +estimate,
        cf_what_bdcatalyst_service_will_you_use: platform,
        cf_platform_user_name: username,
      },
    };

    const submitTicket = async () => {
      console.log("Submitting", payload);
      setWasSubmitted(true);
      await axios
        .post(FRESHDESK_API_CREATE_TICKET_URL, payload, requestOptions)
        .then((response) => {
          console.log(response);
          console.log(response.status);
          if (![200, 201].includes(response.status)) {
            throw new Error(`Unsuccessful HTTP response, ${response.status}`);
          }
        })
        .catch((error) => {
          console.log(error);
          setError(error);
        });
    };
    submitTicket();
  };

  const handleChangeName = (event) => setName(event.target.value);
  const handleChangeUserName = (event) => setUserName(event.target.value);
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
  // const handleChangePreviousFunding = (event) =>
  //   setPreviousFunding(event.target.value);
  const handleChangePreviousFundingDetails = (event) => {
    setPreviousFundingDetails(event.target.value);
    setPreviousFundingDetailsLength(event.target.value.length);
  };
  const handleChangeEstimate = (event) => setEstimate(event.target.value);
  const handleChangePlatform = (event) => setPlatform(event.target.value);

  return (
    <Card {...props}>
      <CardHeader>Cloud Credits Request</CardHeader>
      <CardBody>
        <Paragraph right noMargin>
          * <em>All fields are required.</em>
        </Paragraph>
        {!wasSubmitted && platformOptions.length > 0 && (
          <Form onSubmit={handleSubmit}>
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
              <label htmlFor="username" required>
                Platform User Name
              </label>
              <TextInput
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleChangeUserName}
              />
              <HelpText>Seven Bridges users only</HelpText>
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
              <label htmlFor="collaborators">
                Collaborators * (if applicable)
              </label>
              <TextArea
                required
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
            {/* <FormControl>
              <label htmlFor="previous-funding">
                Have you submitted a cloud credits request before? *
              </label>
              <Select
                required
                id="previous-funding"
                name="previous-funding"
                value={previousFunding}
                onChange={handleChangePreviousFunding}
              >
                <Option value="">Select One</Option>
                <Option value="Yes">Yes</Option>
                <Option value="No">No</Option>
              </Select>
            </FormControl> */}
            <FormControl>
              <label htmlFor="previous-funding-details">
                Use of Initial Pilot Credits{" "}
                {previousFunding === "Yes" ? "*" : ""}
              </label>
              <TextArea
                id="previous-funding-details"
                name="previous-funding-details"
                placeholder={
                  previousFunding !== "Yes"
                    ? `N/A`
                    : `Briefly outline your use of previous cloud credit funding.`
                }
                value={previousFundingDetails}
                onChange={handleChangePreviousFundingDetails}
                maxLength="3000"
                disabled={previousFunding !== "Yes"}
                required={previousFunding === "Yes"}
              />
              <HelpText>
                Briefly outline your use of previous cloud credit funding. Limit
                your response to 3000 characters. (Current length:{" "}
                {previousFundingDetailsLength} / 3000 characters.)
              </HelpText>
            </FormControl>
            <FormControl>
              <label htmlFor="justification">Justification for Credits *</label>
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
                the project; 2.) Datasets, tools, types of analysis to be used;
                3.) Experience using cloud platforms; 4.) Anticipated timeline
                for the work; 5.) Whether workflows/pipelines have been
                optimized and/or if guidance/consultation from the platforms has
                been sought; 6.) Estimated costs split out by development,
                testing, analysis optimization, and the running of the analysis
                (provide a basis for the estimated costs e.g. prior research
                results with reference numbers); 7.) Number of samples, cost per
                sample, and whether there is sufficient power of analysis. Limit
                your response to 6000 characters. (Current length:{" "}
                {justificationLength} / 6000 characters.)
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
              <label htmlFor="platform">Preferred Platform/Service *</label>
              <Select
                required
                id="platform"
                name="platform"
                value={platform}
                onChange={handleChangePlatform}
              >
                <Option value="">Select One</Option>
                {platformOptions.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </FormControl>
            <br />
            <SubmitButton>Submit</SubmitButton>
          </Form>
        )}
        {!wasSubmitted && platformOptions.length === 0 && (
          <LoadingDots
            color="var(--color-crimson)"
            text="Loading form..."
            textPlacement="top"
          />
        )}
        {wasSubmitted && !error && <ThankYouMessage />}
        {wasSubmitted && error && <ErrorMessage />}
      </CardBody>
    </Card>
  );
};
