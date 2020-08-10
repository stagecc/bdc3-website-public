import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Paragraph } from '../typography'
import { Button } from '../buttons'
import { Card, CardHeader, CardBody } from '../card'
import { Dots as LoadingDots } from '../loading'
import { ExternalLink } from '../link'
import { Form, FormControl, TextInput, HelpText, AdornedInput, Select, Option, TextArea } from './inputs'

const FRESHDESK_API_KEY = process.env.GATSBY_FRESHDESK_API_KEY
const FRESHDESK_API_CREATE_TICKET_URL = `${ process.env.GATSBY_FRESHDESK_API_ROOT_URL }/tickets`
const FRESHDESK_API_TICKET_FIELDS_URL = `${ process.env.GATSBY_FRESHDESK_API_ROOT_URL }/ticket_fields`

const requestOptions = {
    'Content-Type': 'application/json',
    auth: { username: FRESHDESK_API_KEY, password: 'X' },
}

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
    const [name, setName] = useState('')
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
        const description = `Name: ${ name } ~~~~~ `
                    + `Email Address: ${ email } ~~~~~ `
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
            name: name,
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

    const handleChangeName = event => setName(event.target.value)
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
                                <label htmlFor="name">Your Name</label>
                                <TextInput type="text" required
                                    id="name" name="name"
                                    value={ name } onChange={ handleChangeName }
                                />
                            </FormControl>
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