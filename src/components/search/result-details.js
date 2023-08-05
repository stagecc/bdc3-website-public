import React, { useCallback, useEffect, useState } from "react";
import { useSearch } from './context'
import {
  Button,
  Dialog, 
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from '@mui/material'

//

export const ResultDetails = () => {
  const { selectedResult, setSelectedResult } = useSearch()
  const [open, setOpen] = useState(false)
  
  const handleClose = useCallback(() => {
    setOpen(false)
    // we'll want the closing animation to finish before deselecting the result,
    // otherwise the dialog will immediately unmount. not so nice.
    const deselectTimeout = setTimeout(() => {
      setSelectedResult(null)
    }, 150)
    // and cleanup.
    return () => clearTimeout(deselectTimeout)
  }, [setSelectedResult])

  useEffect(() => {
    // we're in here if selectedResult has changed.
    // if there is no selected result, then the dialog should not be open.
    if (!selectedResult) {
      handleClose()
    }
    // then we must have a result to look at,
    // so open the dialog.
    setOpen(true)
  }, [handleClose, open, selectedResult])

  // bail out early if the dialog isn't open.
  if (!selectedResult) {
    return <span id="result-dialog-placeholder" />
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="result-dialog-title"
      aria-describedby="result-dialog-description"
      sx={{ '.MuiDialog-paper': {
        height: '100%',
        maxHeight: '66vh',
        width: '100%',
        maxWidth: '1200px',
      } }}
    >
      <DialogTitle id="result-dialog-title">
        {selectedResult.name}
      </DialogTitle>
      <Divider />
      <DialogContent id="result-dialog-description" as="pre" sx={{
        fontSize: '75%',
        whiteSpace: 'pre-wrap',
      }}>
        { JSON.stringify(selectedResult, null, 2) }
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={ handleClose }>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
