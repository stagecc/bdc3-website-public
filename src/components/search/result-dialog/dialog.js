import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog, 
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { useSearch } from '../context'
import { DebugTab, StudiesTab } from './tabs'
import { Dots } from '../../loading'

//

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        overflowY: 'scroll',
        maxHeight: '100%',
        maxWidth: '1000px',
        width: '100%',
      }}
      {...other}
    >
      {value === index && children}
    </Box>
  )
}

const StudiesLoadingIndicator = () => (
  <Stack justifyContent="center" alignItems="center">
    <Dots textPlacement="top" text="Locating studies..." />
  </Stack>
)

export const ResultDialog = () => {
  const { fetchStudies, query, selectedResult, setSelectedResult } = useSearch()
  const [open, setOpen] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)
  const [studies, setStudies] = useState([])
  const [loadingStudies, setLoadingStudies] = useState(false)
  
  const handleClose = useCallback(() => {
    setOpen(false)
    // we'll want the closing animation to finish before deselecting the result,
    // otherwise the dialog will immediately unmount. not so nice.
    const deselectTimeout = setTimeout(() => {
      setSelectedResult(null)
      setStudies([])
      setTabIndex(0)
    }, 150)
    // and cleanup.
    return () => clearTimeout(deselectTimeout)
  }, [setSelectedResult])

  const handleClickTab = (event, value) => {
    setTabIndex(value)
  }

  //

  useEffect(() => {
    // we're in here if selectedResult has changed.
    // if there is no selected result, then the dialog should not be open.
    if (!selectedResult) {
      handleClose()
      return
    }
    // then we must have a result to look at,
    // so open the dialog...
    setOpen(true)
  }, [handleClose, open, selectedResult])

  useEffect(() => {
    // we're in here if selectedResult has changed.
    // if there is no selected result, then we bail out now.
    if (!selectedResult) {
      return
    }
    // then we must have a result to look at,
    // so we fire off requests for the additional data related to our result:
    // - studies
    // 
    // todo: improve this logic, error-handling
    setLoadingStudies(true)
    const loadStudies = async () => {
      const data = await fetchStudies(selectedResult.id, query)
      if (!data) {
        return
      }
      setStudies(data)
      setLoadingStudies(false)
    }
    loadStudies()
    // - etc
  }, [fetchStudies, handleClose, query, selectedResult])

  //

  // bail out early if the dialog isn't open.
  if (!selectedResult) {
    return <span id="result-dialog-placeholder" />
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="result-dialog-title"
      aria-describedby="result-dialog-content"
      sx={{
        '.MuiDialog-paper': {
          maxHeight: '75vh',
          width: '100%',
          maxWidth: '1200px',
        },
        '.MuiStack-root': { height: '600px' },
        '#result-dialog-title': {
          p: 0,
          pl: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        '#result-dialog-content': {
          p: 0,
        },
        '#result-dialog-description': {
          flex: `1 0 400px`,
          p: 4,
          overflow: 'scroll',
        },
        '#result-dialog-details': {
          flex: 3,
          p: 0,
        },
      }}
    >
      <DialogTitle id="result-dialog-title">
        { selectedResult.name }
        <Tabs value={ tabIndex } onChange={ handleClickTab }>
          <Tab
            label={ `Studies (${ loadingStudies ? '...' : studies.length })`}
            disabled={ studies.length === 0 }
          />
          { process.env.NODE_ENV === 'development' && <Tab label="Debug" /> }
        </Tabs>
      </DialogTitle>

      <DialogContent id="result-dialog-content" dividers>
        <Stack direction="row">

          <Box id="result-dialog-description">
            <Typography paragraph><strong>Description:</strong></Typography>
            <Typography paragraph>{ selectedResult.description }</Typography>

            <Divider />

            {
              !loadingStudies && (
                <ul>
                  <li><Typography>studies: { studies.length }</Typography></li>
                  <li><Typography>variables: { studies.reduce((sum, study) => sum + study.elements.length, 0) }</Typography></li>
                </ul>
              )
            }
          </Box>

          <Divider orientation="vertical" flexItem />
          
          <TabPanel value={ tabIndex } index={ 0 } className="result-dialog-details">
            {
              loadingStudies
                ? <StudiesLoadingIndicator />
                : <StudiesTab studies={ studies } />
            }
          </TabPanel>

          {/* this debug tab can stay. the tab is rendered in development mode */}
          <TabPanel value={ tabIndex } index={ 1 } className="result-dialog-details">
            <DebugTab concept={ selectedResult } studies={ studies } />
          </TabPanel>

        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={ handleClose }>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
