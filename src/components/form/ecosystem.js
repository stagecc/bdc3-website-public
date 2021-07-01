import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Paragraph } from "../typography";
import { Button } from "../buttons";
import { Card, CardHeader, CardBody } from "../card";
// import { Dots as LoadingDots } from "../loading";
import { ExternalLink } from "../link";
import { navigate } from "gatsby";
import {
  Form,
  FormControl,
  TextInput,
  HelpText,
  // AdornedInput,
  Select,
  Option,
  TextArea,
  // ErrorText,
} from "./inputs";

const FRESHDESK_USER_NAME = process.env.GATSBY_FRESHDESK_USER_NAME;
const FRESHDESK_PASSWORD = process.env.GATSBY_FRESHDESK_PASSWORD;
const FRESHDESK_API_ROOT_URL = process.env.GATSBY_FRESHDESK_API_ROOT_URL;
const FRESHDESK_API_CREATE_CONTACT = `${FRESHDESK_API_ROOT_URL}/contacts`;

const requestOptions = {
  "Content-Type": "application/json",
  auth: { username: FRESHDESK_USER_NAME, password: FRESHDESK_PASSWORD },
};

const SubmitButton = styled(Button).attrs({
  type: "submit",
  value: "Submit",
})``;

const ErrorMessage = () => {
  return (
    <Fragment>
      <Paragraph center>
        Sorry &mdash; an error occurred while submitting your request!
      </Paragraph>
      <Paragraph center>
        Please submit your request on{" "}
        <ExternalLink to="https://bdcatalyst.freshdesk.com">
          our help desk
        </ExternalLink>{" "}
        while we resolve this issue. Thanks!
      </Paragraph>
    </Fragment>
  );
};

export const EcoSystemForm = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [commons, setCommons] = useState("");
  const [password, setPassword] = useState("");
  // const [confirm_password, setConfirmPassword] = useState("");
  // const [passwordError, setPasswordError] = useState(false);
  const [organization, setOrganization] = useState("");
  const [referral, setReferralSource] = useState("");
  const [other, setOther] = useState("");
  const [field, setField] = useState("");
  const [interest, setInterest] = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [error, setError] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name: name,
      email: email,
      custom_fields: {
        era_commons_id: commons,
        // contacts_password: password,
        contacts_organization: organization,
        contacts_field: field,
        contacts_referral: referral,
        contacts_other: other,
        contacts_interest: interest,
      },
    };

    const submitContact = async () => {
      setWasSubmitted(true);
      await axios
        .post(FRESHDESK_API_CREATE_CONTACT, payload, requestOptions)
        .then((response) => {
          if (![200, 201].includes(response.status)) {
            throw new Error(`Unsuccessful HTTP response, ${response.status}`);
          } else {
            navigate("/contact/ecosuccess");
          }
        })
        .catch((error) => {
          console.log(error);
          setError(error);
        });
    };
    submitContact();
  };

  const handleChangeName = (event) => setName(event.target.value);
  const handleChangeCommons = (event) => setCommons(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);
  // const handleChangePassword = (event) => setPassword(event.target.value);
  // const handleConfirmPassword = (event) => {
  //   const pw = event.target.value;
  //   if (pw != password) {
  //     setPasswordError(true);
  //   } else {
  //     setPasswordError(false);
  //   }
  //   setConfirmPassword(pw);
  // };
  const handleChangeOrganization = (event) =>
    setOrganization(event.target.value);
  const handleChangeRefferal = (event) => setReferralSource(event.target.value);
  const handleChangeOther = (event) => {
    setOther(event.target.value);
  };

  const handleChangeField = (event) => setField(event.target.value);
  const handleChangeInterest = (event) => setInterest(event.target.value);

  return (
    <Card {...props}>
      <CardHeader>Join the Ecosystem </CardHeader>
      <CardBody>
        <Paragraph right noMargin>
          <em>Fields with an asterisk (*) are required.</em>
        </Paragraph>
        {!wasSubmitted && (
          <Form onSubmit={handleSubmit}>
            <FormControl>
              <label htmlFor="name" required>
                Your Full Name *
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
              <label htmlFor="commons">eRA Commons ID</label>
              <TextInput
                type="commons"
                id="commons"
                name="commons"
                value={commons}
                onChange={handleChangeCommons}
              />
              <HelpText>
                eRA Commons ID is a common way to authenticate throughout the
                ecosystem. Please include your eRA Commons if you already have
                one for ease of identification. If you do not yet have an eRA
                Commons ID, you can still join the community.{" "}
              </HelpText>
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
              <HelpText>
                Please use an organization email address. Your email address
                will serve as your user account name.
              </HelpText>
            </FormControl>
            {/* <FormControl>
              <label htmlFor="password">
                NHLBI BioData Catalyst Password *
              </label>
              <TextInput
                type="password"
                required
                id="password"
                name="password"
                value={password}
                onChange={handleChangePassword}
              />
              <HelpText>
                This password will provide access to the BioData Catalyst
                ecosystem help desk and forums.
              </HelpText>
            </FormControl> */}
            {/* <FormControl>
              <label htmlFor="confirm_password">Confirm Password *</label>
              <TextInput
                type="password"
                required
                id=""
                name=""
                value={confirm_password}
                onChange={handleConfirmPassword}
              />
              {passwordError && <ErrorText>Passwords do not match</ErrorText>}
            </FormControl> */}
            <FormControl>
              <label htmlFor="organization">Organization *</label>
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
              <label htmlFor="field">
                NHLBI Field of Study or Research Area *
              </label>
              <Select
                required
                id="field"
                name="field"
                value={field}
                onChange={handleChangeField}
              >
                <Option value="">Select One</Option>
                <Option value="Heart">Heart</Option>
                <Option value="Lung">Lung</Option>
                <Option value="Blood">Blood</Option>
                <Option value="Sleep">Sleep</Option>
                <Option value="Methods">Methods</Option>
                <Option value="Sickle Cell Disease">Sickle Cell Disease</Option>
                <Option value="Implementation Science">
                  Implementation Science
                </Option>
                <Option value="Precision Medicine">Precision Medicine</Option>
                <Option value="Clinical Trials Optimization">
                  Clinical Trials Optimization
                </Option>
                <Option value="Small Business">Small Business</Option>
                <Option value="HIV/AIDS">HIV/AIDS</Option>
                <Option value="COVID-19">COVID-19</Option>
                <Option value="Other">Other</Option>
              </Select>
            </FormControl>
            <FormControl>
              <label htmlFor="other">
                If Other, please provide a brief description.
              </label>
              <TextArea
                id="other"
                name="other"
                value={other}
                onChange={handleChangeOther}
                maxLength="3000"
              />
            </FormControl>
            <FormControl>
              <label htmlFor="interest">
                Why are you interested in NHLBI BioData Catalyst?
              </label>
              <Select
                id="interest"
                name="interest"
                value={interest}
                onChange={handleChangeInterest}
              >
                <Option value="">Select One</Option>
                <Option value="I just want to keep up with the latest news on the ecosystem">
                  I just want to keep up with the latest news on the ecosystem
                </Option>
                <Option value="I am hoping to learn how the ecosystem can help me with my research">
                  I am hoping to learn how the ecosystem can help me with my
                  research
                </Option>
                <Option value="I am ready to start using the ecosystem!">
                  I am ready to start using the ecosystem!
                </Option>
              </Select>
            </FormControl>
            <FormControl>
              <label htmlFor="referral">
                How did you learn about BioData Catalyst? *
              </label>
              <TextArea
                required
                id="referral"
                name="referral"
                placeholder={`Colleague, website, organization`}
                value={referral}
                onChange={handleChangeRefferal}
              />
            </FormControl>
            <br />
            <SubmitButton>Submit</SubmitButton>
          </Form>
        )}
        {wasSubmitted && error && <ErrorMessage />}
      </CardBody>
    </Card>
  );
};
