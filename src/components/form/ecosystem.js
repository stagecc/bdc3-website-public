import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { GoogleReCaptcha, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Paragraph } from "../typography";
import { Button } from "../buttons";
import { Card, CardHeader, CardBody } from "../card";
import { navigate } from "gatsby";
import {
  Form,
  FormControl,
  TextInput,
  HelpText,
  Select,
  Option,
  TextArea,
  FieldSet,
  CheckBoxLabel,
} from "./inputs";

const FRESHDESK_USER_NAME = process.env.GATSBY_FRESHDESK_API_KEY;
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
        The email address provided is already associated with a BDC
        account. For questions, please email{" "}
        <a href="mailto: biodatacatalyst@nhlbi.nih.gov">
          biodatacatalyst@nhlbi.nih.gov
        </a>
      </Paragraph>
    </Fragment>
  );
};

export const EcoSystemForm = (props) => {
  const formRef = useRef(null)
  const token = useRef('')
  const { executeRecaptcha } = useGoogleReCaptcha();
  const honeypotFieldRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [commons, setCommons] = useState("");
  const [organization, setOrganization] = useState("");
  const [referral, setReferralSource] = useState("");
  const [other, setOther] = useState("");
  const [otherTextField, setOtherTextField] = useState(false);
  const [field, setField] = useState("");
  const [interest, setInterest] = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [error, setError] = useState();

  // recaptcha token-fetching function
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log('Execute recaptcha not yet available');
      return;
    }
    token.current = await executeRecaptcha('formSubmit');
  }, [executeRecaptcha]);

  // fetch token on first render
  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (honeypotFieldRef.current?.value !== "") return;

    const payload = {
      name: name,
      email: email,
      custom_fields: {
        era_commons_id: commons,
        contacts_organization: organization,
        contacts_field: field.toString(),
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
          setError(error);
        });
    };
    submitContact();
  };

  const handleChangeName = (event) => setName(event.target.value);
  const handleChangeCommons = (event) => setCommons(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangeOrganization = (event) =>
    setOrganization(event.target.value);
  const handleChangeRefferal = (event) => setReferralSource(event.target.value);
  const handleChangeOther = (event) => {
    setOther(event.target.value);
  };

  const handleChangeField = (event) => {
    if (event.target.value === "Other") {
      setOtherTextField(!otherTextField)
    }
    setField([...field, event.target.value]);
  };
  const handleChangeInterest = (event) => setInterest(event.target.value);
  return (
    <Card {...props}>
      <CardHeader>Join the Ecosystem </CardHeader>
      <CardBody>
        <Paragraph right noMargin>
          <em>Fields with an asterisk (*) are required.</em>
        </Paragraph>
        {!wasSubmitted && (
          <Form onSubmit={handleSubmit} ref={ formRef }>
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
              <label required htmlFor="commons">eRA Commons ID</label>
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
            <FormControl onChange={handleChangeField}>
              <label htmlFor="field">Field of Study or Research Area *</label>
              <HelpText>Select all that apply</HelpText>
              <FieldSet>
                <CheckBoxLabel>
                  <TextInput type="checkbox" value="Heart" name="field" />
                  &nbsp;Heart
                </CheckBoxLabel>
                <CheckBoxLabel>
                  <TextInput type="checkbox" value="Lung" name="field" />
                  &nbsp;Lung
                </CheckBoxLabel>
                <CheckBoxLabel>
                  <TextInput type="checkbox" value="Blood" name="field" />
                  &nbsp;Blood
                </CheckBoxLabel>
                <CheckBoxLabel>
                  <TextInput type="checkbox" value="Sleep" name="field" />
                  &nbsp;Sleep
                </CheckBoxLabel>
                <CheckBoxLabel>
                  <TextInput type="checkbox" value="Methods" name="field" />
                  &nbsp;Methods
                </CheckBoxLabel>
                <CheckBoxLabel>
                  <TextInput
                    type="checkbox"
                    value="Sickle Cell Disease"
                    name="field"
                  />
                  &nbsp;Sickle Cell Disease
                </CheckBoxLabel>
                <CheckBoxLabel>
                  <TextInput
                    type="checkbox"
                    value="Implementation Science"
                    name="field"
                  />
                  &nbsp;Implementation Science
                </CheckBoxLabel>
                <CheckBoxLabel>
                  <TextInput
                    type="checkbox"
                    value="Precision Medicine"
                    name="field"
                  />
                  &nbsp;Precision Medicine
                </CheckBoxLabel>
                <CheckBoxLabel>
                  <TextInput
                    type="checkbox"
                    value="Clinical Trials Optimization"
                    name="field"
                  />
                  &nbsp;Clinical Trials Optimization
                </CheckBoxLabel>
                <CheckBoxLabel>
                  <TextInput
                    type="checkbox"
                    value="Small Business"
                    name="field"
                  />
                  &nbsp;Small Business
                </CheckBoxLabel>
                <CheckBoxLabel>
                  <TextInput type="checkbox" value="HIV/AIDS" name="field" />
                  &nbsp;HIV/AIDS
                </CheckBoxLabel>
                <CheckBoxLabel>
                  <TextInput type="checkbox" value="COVID-19" name="field" />
                  &nbsp;COVID-19
                </CheckBoxLabel>
                <CheckBoxLabel>
                  <TextInput type="checkbox" value="Other" name="field" />
                  &nbsp;Other
                </CheckBoxLabel>
              </FieldSet>
            </FormControl>
            {otherTextField && (
              <FormControl>
                <label required htmlFor="other">
                  If Other, please provide a brief description. *
                </label>
                <TextArea
                  id="other"
                  required
                  name="other"
                  value={other}
                  onChange={handleChangeOther}
                  maxLength="3000"
                />
              </FormControl>
            )}
            <FormControl>
              <label required htmlFor="interest">
                Why are you interested in BDC? *
              </label>
              <Select
                required
                id="interest"
                name="interest"
                value={interest}
                onChange={handleChangeInterest}
              >
                <Option value="">Select One</Option>
                <Option value="I want to keep up with the latest news on the ecosystem">
                  I want to keep up with the latest news on the ecosystem.
                </Option>
                <Option value="I hope to learn how the ecosystem can help me with my research">
                  I hope to learn how the ecosystem can help me with my research.
                </Option>
                <Option value="I am ready to start using the ecosystem!">
                  I am ready to start using the ecosystem!
                </Option>
                <Option value="Not sure / I am just exploring.">
                  Not sure / I am just exploring.
                </Option>
              </Select>
            </FormControl>
            <FormControl>
              <label htmlFor="referral">
                How did you learn about BDC? *
              </label>
              <TextArea
                required
                id="referral"
                name="referral"
                placeholder={`For example, colleague, website, organization`}
                value={referral}
                onChange={handleChangeRefferal}
              />
            </FormControl>

            <GoogleReCaptcha
              onVerify={handleReCaptchaVerify}
            />

            <SubmitButton>Submit</SubmitButton>
          </Form>
        )}
        {wasSubmitted && error && <ErrorMessage />}
      </CardBody>
    </Card>
  );
};

