import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Paragraph } from '../typography'
import { Button } from '../buttons'
import { Card, CardHeader, CardBody } from '../card'
import { Dots as LoadingDots } from '../loading'
import { ExternalLink } from '../link'

const FRESHDESK_API_KEY = process.env.GATSBY_FRESHDESK_API_KEY
const FRESHDESK_API_CREATE_TICKET_URL = `${ process.env.GATSBY_FRESHDESK_API_ROOT_URL }/tickets`
const FRESHDESK_API_TICKET_FIELDS_URL = `${ process.env.GATSBY_FRESHDESK_API_ROOT_URL }/ticket_fields`

const requestOptions = {
    'Content-Type': 'application/json',
    auth: { username: FRESHDESK_API_KEY, password: 'X' },
}

const inputStyle = `
    flex: 1;
    padding: 0.5rem;
    outline: none;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    border-color: var(--color-lightgrey);
    transition: boroder-color 250ms, filter 250ms;
    &:focus {
        border-color: var(--color-eggplant);
        filter: drop-shadow(0 0 0.1rem var(--color-eggplant));
    }
`

const Form = styled.form`
    padding: 1rem 0.5rem;
`

const FormControl = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    & > label {
        padding: 0.5rem 0;
        font-weight: bold;
    }
`

const TextInput = styled.input.attrs(props => ({ type: props.type }))`
    ${ inputStyle }
`

const Adornment = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    // border: 1px solid #f99;
    min-height: 100%;
    width: 1.5rem;
`

const AdornedInput = ({ adornment, ...props}) => {
    return (
        <div style={{ flex: 1, display: 'flex', justifyContent: 'stretch' }}>
            { adornment && <Adornment>{ adornment }</Adornment> }
            <TextInput { ...props } style={{ flex: 1, width: '100%' }}/>
        </div>
    )
}

const Select = styled.select`
    ${ inputStyle }
`

const Option = styled.option``

const TextArea = styled.textarea`
    resize: vertical;
    height: 200px;
    min-height: 200px;
    max-height: 800px;
    ${ inputStyle }
`

const HelpText = styled.small`
    padding: 0.25rem 0;
    font-style: italic;
`

const SubmitButton = styled(Button).attrs({ type: 'submit', value: 'Submit' })``

const ThankYouMessage = () => {
    return (
        <Paragraph center>
            Thanks &mdash; your cloud credits request has been submitted!
        </Paragraph>
    )
}

const ErrorMessage = () => {
    return (
        <Fragment>
            <Paragraph center>
                Sorry &mdash; an error occurred while submitting your request!
            </Paragraph>
            <Paragraph center>
                Please submit submit your request on <ExternalLink to="https://bdcatalyst.freshdesk.com">our help desk</ExternalLink> while we resolve this issue.
                Thanks!
            </Paragraph>
        </Fragment>
    )
}

export const CloudCreditsForm = () => {
    const [platformOptions, setPlatformOptions] = useState([])
    const [email, setEmail] = useState('')
    const [estimate, setEstimate] = useState(1)
    const [platform, setPlatform] = useState('')
    const [justification, setJustification] = useState('')
    const [wasSubmitted, setWasSubmitted] = useState(false)
    const [error, setError] = useState()
    const [characterCount, setCharacterCount] = useState(0)

    useEffect(() => {
        const fetchPlatformOptions = async () => {
            await axios.get(FRESHDESK_API_TICKET_FIELDS_URL, requestOptions)
                .then(response => {
                    const platformField = response.data.find(field => field.name === 'cf_what_bdcatalyst_service_will_you_use')
                    setPlatformOptions(platformField.choices)
                })
                .catch(error => console.error(error))
        }
        fetchPlatformOptions()
    }, [])

    const handleSubmit = event => {
        event.preventDefault()
        let prefix = (window.location.hostname.includes('staging.') || window.location.hostname.includes('localhost'))
            ? '[TEST] '
            : ''
        const description = `Email Address: ${ email } ~~~~~ `
                    + `Estimate of Cloud Credits Needed: $${ estimate } ~~~~~ `
                    + `Platform/Service: ${ platform } ~~~~~ `
                    + `Justification for Credits: ${ justification } ~~~~~ `
                    + `(This ticket was submitted from ${ window.location.href }.)`
        const payload = {
            type: 'Cloud Credits',
            subject: prefix + 'Cloud Credits Request',
            description: prefix + description,
            priority: 1,
            status: 2,
            email: email,
            custom_fields: {
                cf_estimated_cloud_credits_requested: +estimate,
                cf_what_bdcatalyst_service_will_you_use: platform,
                cf_justification_for_credits: justification,
            }
        }
        const submitTicket = async () => {
            console.log('Submitting', payload)
            setWasSubmitted(true)
            await axios.post(FRESHDESK_API_CREATE_TICKET_URL, payload, requestOptions)
                .then(response => {
                    if (response.status !== 201) {
                        setError('Invalid HTTP response')
                    }
                })
                .catch(error => {
                    console.log(error)
                    setError(error)
                })
        }
        submitTicket()
    }

    const handleChangeEmail = event => setEmail(event.target.value)
    const handleChangeEstimate = event => setEstimate(event.target.value)
    const handleChangePlatform = event => setPlatform(event.target.value)
    const handleChangeJustification = event => {
        setJustification(event.target.value)
        setCharacterCount(event.target.value.length)
    }

    return (
        <Card>
            <CardHeader>Cloud Credits Request</CardHeader>
            <CardBody>
                {
                    !wasSubmitted && platformOptions.length > 0 && (
                        <Form onSubmit={ handleSubmit }>
                            <FormControl>
                                <label htmlFor="email">Email Address</label>
                                <TextInput type="email" required
                                    id="email" name="email"
                                    value={ email } onChange={ handleChangeEmail }
                                />
                                <HelpText>Please use an organizational email address.</HelpText>
                            </FormControl>
                            <FormControl>
                                <label htmlFor="estimate">Estimate of Cloud Credits Needed</label>
                                <AdornedInput type="number" required min="1"
                                    id="estimate" name="estimate"
                                    value={ estimate } onChange={ handleChangeEstimate }
                                    adornment="$"
                                />
                                <HelpText>Please enter your estimate in US Dollars.</HelpText>
                            </FormControl>
                            <FormControl>
                                <label htmlFor="platform">Platform/Service</label>
                                <Select required id="platform" name="platform" value={ platform } onChange={ handleChangePlatform }>
                                    <Option value="">Select One</Option>
                                    { platformOptions.map(option => <Option key={ option } value={ option }>{ option }</Option>) }
                                </Select>
                            </FormControl>
                            <FormControl>
                                <label htmlFor="justification">Justification for Credits</label>
                                <TextArea id="justification" name="justification"
                                    placeholder={`Enter a brief justification for your request.`}
                                    value={ justification } onChange={ handleChangeJustification }
                                    maxLength="3000"
                                />
                                <HelpText>
                                    Your justification must not exceed 3000 characters.
                                    (Current length: { characterCount } / 3000 characters.)
                                </HelpText>
                            </FormControl><br/>
                            <SubmitButton>Submit</SubmitButton>
                        </Form>
                    )
                }
                { !wasSubmitted && platformOptions.length === 0 && <LoadingDots color="var(--color-crimson)" text="Loading form..." textPlacement="top" /> }
                { wasSubmitted && !error && <ThankYouMessage /> }
                { wasSubmitted && error && <ErrorMessage /> }
            </CardBody>
        </Card>
    )
}