import React, { Fragment, useMemo } from 'react'
import {
  Box, CircularProgress, List, ListItem, ListItemAvatar, ListItemText, Typography,
} from '@mui/material'
import { useSearch } from '../../context'

//

const LabeledProgress = ({ value }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        color="secondary"
        value={ value }
        size={ 50 }
        thickness={ 5 }
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="secondary">
          {`${ Math.round(value) }%`}
        </Typography>
      </Box>
    </Box>
  );
}

const ScoreBreakdownGraphic = ({ data }) => {
  return (
    <List sx={{
      maxWidth: '450px',
      width: '90%',
      m: 'auto',
      mt: 2,
      '.MuiCircularProgress-circle': { fill: '#e9ecef' },
      '.MuiListItemText-root': { pl: 4 }
    }}>
      {
        data.map((d, i) => (
          <ListItem key={ `chart-${ d.id }-${ i }` }>
            <ListItemAvatar>
              <LabeledProgress value={ d.value } />
            </ListItemAvatar>
            <ListItemText primary={ d.name } secondary={ d.label } />
          </ListItem>
        ))
      }
    </List>
  )
}

const parseScoreDetail = ({ value, description, details }) => {
  if (value === 0) return null
  if (description === "sum of:") {
    return details.flatMap((detail) => parseScoreDetail(detail))
  }

  const explainPattern = /^weight\((?<fieldName>.+):(?<searchTerm>.+) in (?<segmentNumber>\d+)\) \[(?<similarityMetric>.+)\], result of:$/
  const match = description.match(explainPattern)
  if (match) {
    let { fieldName, searchTerm } = match.groups
    if (searchTerm.startsWith(`"`) && searchTerm.endsWith(`"`)) searchTerm = searchTerm.slice(1, -1)
    return {
      fieldMatch: fieldName,
      termMatch: searchTerm,
      source: description,
      value
    }
  } else {
    console.log("Failed to parse score explanation:", description)
    return {
      fieldMatch: null,
      termMatch: null,
      source: description,
      value
    }
  }
}

export const ExplanationTab = () => {
  const { selectedResult: { explanation } } = useSearch()
  const totalScore = useMemo(() => explanation.value, [explanation.value])  

  const scoreData = useMemo(() => (parseScoreDetail(explanation)
    .filter((detail) => detail !== null)
    // Reduce duplicate details into single details.
    .reduce((acc, cur) => {
      const existingDetail = acc.find((detail) => detail.source === cur.source)
      if (!existingDetail) acc.push(cur)
      else {
        // If the exact detail already exists, add the scores.
        existingDetail.value += cur.value
      }
      return acc
    }, [])
    // Reduce details down further into single field matches
    // E.g. `name:heart` and `name:heart disease` would get merged into the same detail at this step.
    .reduce((acc, cur) => {
      const existingDetailWithField = acc.find((detail) => detail.fieldMatch === cur.fieldMatch)
      if (!existingDetailWithField) acc.push(cur)
      else {
        // If a detail exists with the current field match, add the scores.
        if (Array.isArray(existingDetailWithField.termMatch)) existingDetailWithField.termMatch.push(cur.termMatch)
        else existingDetailWithField.termMatch = [existingDetailWithField.termMatch, cur.termMatch]
        existingDetailWithField.value += cur.value
      }
      return acc
    }, [])
    // Reduce details into chart data
    .reduce((acc, cur) => {
      const { fieldMatch, termMatch, source, value } = cur
      const [fieldMatchName, fieldMatchDescription] = (
          fieldMatch === 'name'           ? ['Name', 'The name of this concept']
        : fieldMatch === 'description'    ? ['Description', 'The description of this concept']
        : fieldMatch === 'search_terms'   ? ['Search Terms', 'Synonymous names for this concept']
        : fieldMatch === 'optional_terms' ? ['Related Terms', 'Search terms for concepts related to this concept']
        : ['', '']
      )
      if (fieldMatch && termMatch) acc.push({
        id: `${ fieldMatchName }`,
        name: `${ fieldMatchName }`,
        label: `${ fieldMatchDescription }`,
        key: source,
        matchedField: fieldMatch,
        matchedTerms: termMatch,
        failedParse: false,
        value: +((value / totalScore) * 100).toFixed(0),
      })
      else acc.push({
        id: 'unknown',
        name: 'UNKNOWN',
        label: 'Could not parse explanation for this score component.',
        key: source,
        matchedField: null,
        matchedTerms: null,
        failedParse: true,
        value: +((value / totalScore) * 100).toFixed(0)
      })
      return acc
    }, [])
    .sort((a, b) => b.value - a.value)
  ), [explanation, totalScore])

  return (
    <Fragment>
      <Typography variant="h5" className="tab-title">Why am I seeing this result?</Typography>
      
      <Typography paragraph className="tab-description">
        Several factors are considered when identifying results and how to rank them: 
        the <strong>name</strong> and <strong>description</strong> of this
        concept; <strong>search terms</strong>, or synonymous concept names,
        and <strong>related terms</strong>, or related concepts' search terms.
      </Typography>
      <Typography paragraph className="tab-description">
        Here is how the above factors contributed to this concept being among your results.
      </Typography>

      <ScoreBreakdownGraphic data={ scoreData } />
    </Fragment>
  )
}
