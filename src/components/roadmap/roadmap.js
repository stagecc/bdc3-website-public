import React, { useState } from 'react';
import { Box, Button, Paper, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material"
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

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

  function Icon({ img }) {
    return (
      <img
        src={`/${img}.png`}
        alt={`Step ${img}`}
        width="84"
        height="84"
      />
    )
  }

  const CustomStepIcon = (props) => {
    const stepIcons = {
      1: <Icon img="1" />,
      2: <Icon img="2" />,
      3: <Icon img="3" />,
      4: <Icon img="4" />,
      5: <Icon img="5" />,
      6: <Icon img="6" />,
      7: <Icon img="7" />,
      8: <Icon img="8" />,
      9: <Icon img="9" />,
    }

    return (
      <button
        onClick={() => handleSelect(props.icon - 1)}
        className="cursor-pointer"
      >
        <div>
          {stepIcons[String(props.icon)]}
        </div>
      </button>
    )
  }

  return (
    <Box sx={{ maxWidth: 1200 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.title}>
            <StepLabel
              style={{ padding: 0 }}
            // StepIconComponent={CustomStepIcon}
            >
              <button
                onClick={() => handleSelect(index)}
                className="cursor-pointer"
              >
                <span>
                  {step.title}
                </span>
              </button>
            </StepLabel>

            <StepContent>
              <Typography>
                <ReactMarkdown linkTarget="_blank" remarkPlugins={[remarkGfm]}>{step.description}</ReactMarkdown>
              </Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  {index === 0 ? (
                    ""
                  ) : (
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
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
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  )
}

export default Roadmap;