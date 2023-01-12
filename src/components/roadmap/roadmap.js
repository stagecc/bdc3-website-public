import React, { useState } from 'react';
import { Box, Button, Paper, Step, StepLabel, Stepper, StepContent, Typography } from "@mui/material"
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
import { styled as MuiStyled } from '@mui/material/styles';

const LabelButton = styled.button`
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  font-size: 1.25rem;
  color: var(--color-crimson);
  cursor: pointer;
  font-weight: 900;

  &:hover {
    color: var(--color-crimson-dark);
  }
`;

const StyledConnector = MuiStyled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.root}`]: {
    marginLeft: 'calc(32px - 6px / 2)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: 'var(--color-crimson)'
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: 'var(--color-crimson)'
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    width: '6px',
    border: 0,
    backgroundColor: 'var(--color-lightgrey)',
  },
}));

const Roadmap = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const handleSelect = (i) => {
    setActiveStep(i)
  }

  const CustomStepIcon = ({ active, completed, icon }) => {
    const fillColor = completed
      ? 'var(--color-crimson)'
      : active
      ? 'var(--color-crimson-light)'
      : 'var(--color-lightgrey)';

    return <svg height="55.43" width="64" viewBox='-32 -27.713 64 55.43' fill={fillColor} >
      {/* hexagon svg: */}
      <path d="M32 0 L16 27.713 L-16 27.713 L-32 0 L-16 -27.713 L16 -27.713 Z " />

      {/* checkmark svg: */}
      {completed && <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="white" transform='scale(1.5) translate(-12, -11)' />}

      {!completed && <text fill='white' textAnchor='middle' x='0' y='12' fontSize='1.75rem'>{icon}</text>}
    </svg>
  }

  return (
    <Box sx={{ maxWidth: 1200 }} marginY={2}>
      <Stepper activeStep={activeStep} orientation="vertical" connector={<StyledConnector />}>
        {steps.map((step, index) => (
          <Step
            key={step.title}
            sx={{
              '& .MuiStepContent-root': {
                borderColor: "var(--color-lightgrey)",
                borderWidth: "6px",
                marginLeft: 'calc(32px - 6px / 2)',
              }
            }}
          >
            <StepLabel
              style={{ padding: 0 }}
              StepIconComponent={CustomStepIcon}
            >
              <LabelButton
                onClick={() => handleSelect(index)}
                className="cursor-pointer"
              >
                <span>
                  {step.title}
                </span>
              </LabelButton>
            </StepLabel>

            <StepContent sx={{ pl: 4 }}>
              <Typography>
                <ReactMarkdown linkTarget="_blank" remarkPlugins={[remarkGfm]}>{step.description}</ReactMarkdown>
              </Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{
                      mt: 1,
                      mr: 1,
                      backgroundColor: 'var(--color-crimson)',
                      '&:hover': {
                        backgroundColor: 'var(--color-crimson-light)'
                      }
                    }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  {index === 0 ? (
                    ""
                  ) : (
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{
                        mt: 1,
                        mr: 1,
                        color: 'var(--color-crimson-dark)',
                        '&:hover': {
                          backgroundColor: 'rgba(210, 59, 79, 0.04)'
                        }
                      }}
                    >
                      Back
                    </Button>
                  )}
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Button onClick={handleReset} variant={"outlined"} sx={{
            mt: 1,
            mr: 1,
            color: 'var(--color-crimson)',
            borderColor: 'var(--color-crimson)',
            '&:hover': {
              backgroundColor: 'rgba(210, 59, 79, 0.04)',
              borderColor: 'var(--color-crimson)',
            }
          }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  )
}

export default Roadmap;