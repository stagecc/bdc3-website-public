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
  ErrorText,
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

const ThankYouMessage = ({ name }) => {
  return (
    <Paragraph center>
      Thank You {name}, your request has been submitted!
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

export const EcoSystemForm = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [commons, setCommons] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [organization, setOrganization] = useState("");
  const [referral, setReferralSource] = useState("");
  const [other, setOther] = useState("");
  const [field, setField] = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [error, setError] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name: name,
      email: email,
      custom_fields: {
        era_commons_id: commons,
        contacts_password: password,
        contacts_organization: organization,
        contacts_field: field,
        contacts_referral: referral,
        contacts_other: other,
      },
    };

    const submitContact = async () => {
      console.log("Submitting", payload);
      setWasSubmitted(true);
      await axios
        .post(
          FRESHDESK_API_CREATE_CONTACT,
          payload,
          requestOptions
        )
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
    submitContact();
  };

  const handleChangeName = (event) => setName(event.target.value);
  const handleChangeCommons = (event) => setCommons(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);
  const handleConfirmPassword = (event) => {
    const pw = event.target.value;
    if (pw != password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    setConfirmPassword(pw)
  }
  const handleChangeOrganization = (event) =>
    setOrganization(event.target.value);
  const handleChangeRefferal = (event) => setReferralSource(event.target.value);
  const handleChangeOther = (event) => {
    setOther(event.target.value);
  };

  const handleChangeField = (event) => setField(event.target.value);

  return (
    <Card {...props}>
      <CardHeader>Join the Ecosystem </CardHeader>
      <CardBody>
        <Paragraph right noMargin>
          * <em>All fields are required.</em>
        </Paragraph>
        {!wasSubmitted && (
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
              <label htmlFor="commons">eRA Commons ID *</label>
              <TextInput
                type="commons"
                required
                id="commons"
                name="commons"
                value={commons}
                onChange={handleChangeCommons}
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
                This will create a help desk account for you should you have
                future questions about the ecosystem.
              </HelpText>
            </FormControl>
            <FormControl>
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
                required
                id="other"
                name="other"
                value={other}
                onChange={handleChangeOther}
                maxLength="3000"
              />
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
              <HelpText></HelpText>
            </FormControl>
            <br />
            <SubmitButton>Submit</SubmitButton>
          </Form>
        )}
        {wasSubmitted && !error && <ThankYouMessage name={name} />}
        {wasSubmitted && error && <ErrorMessage />}
      </CardBody>
    </Card>
  );
};
