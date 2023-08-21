import React, { useMemo, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useSearch } from '../../context'

//

const parseScoreDetail = ({ value, description, details }) => {
    if (value === 0) return null
    if (description === "sum of:") {
        return details.flatMap((detail) => parseScoreDetail(detail))
    }

    const explainPattern = /^weight\((?<fieldName>.+):(?<searchTerm>.+) in (?<segmentNumber>\d+)\) \[(?<similarityMetric>.+)\], result of:$/
    const match = description.match(explainPattern)
    if (match) {
        let { fieldName, searchTerm, segmentNumber, similarityMetric } = match.groups
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
  const { selectedResult } = useSearch()

  const [advancedBreakdown, setAdvancedBreakdown] = useState(false)
  const scoreData = useMemo(() => (parseScoreDetail(selectedResult.explanation)
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
      // Reduce details down further into single field matches, if advanced breakdown is disabled.
      // E.g. `name:heart` and `name:heart disease` would get merged into the same detail at this step.
      .reduce((acc, cur) => {
          if (advancedBreakdown) {
              acc.push(cur)
              return acc
          }
          const existingDetailWithField = acc.find((detail) => detail.fieldMatch === cur.fieldMatch)
          if (!existingDetailWithField) acc.push(cur)
          else {
              // If a detail exists with the current field match, and not in advanced breakdown, add the scores.
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
                fieldMatch ===        "name"    ? ["Name", "The name of this concept"]
              : fieldMatch === "description"    ? ["Description", "The description of this concept"]
              : fieldMatch === "search_terms"   ? ["Search terms", "Synonymous names for this concept"]
              : fieldMatch === "optional_terms" ? ["Related terms", "Search terms for concepts related to this concept"]
              : ["", ""]
          )
          const advancedBreakdownString = ` ${ fieldMatchName.endsWith("s") ? "contain" : "contains"} the term "${ termMatch }"`
          if (fieldMatch && termMatch) acc.push({
              name: `${ fieldMatchName }`,
              description: `${ fieldMatchDescription }${ advancedBreakdown ? advancedBreakdownString : ""}`,
              key: source,
              matchedField: fieldMatch,
              matchedTerms: termMatch,
              failedParse: false,
              value
          })
          else acc.push({
              name: "Unknown",
              description: "Could not parse explanation for this score component.",
              key: source,
              matchedField: null,
              matchedTerms: null,
              failedParse: true,
              value
          })
          return acc
      }, [])
      .sort((a, b) => b.value - a.value)
  ), [selectedResult.explanation, advancedBreakdown])

  return (
    <Box sx={{
      '.tab-title': { p: 2 },
      '.tab-description': { p: 2 },
    }}>
      <Typography variant="h2" className="tab-title">Why this result?</Typography>
      <Typography paragraph className="tab-title">
        Dug considers many factors when determining which results to send you.
        Below is a breakdown of the justification for this concept appearing amongst your results.
      </Typography>
      <Box component="pre" sx={{
        fontSize: '75%',
        backgroundColor: '#333',
        color: '#ddd',
        whiteSpace: 'pre-wrap',
        p: 1, m: 0,
      }}>{JSON.stringify(scoreData, null, 2)}</Box>
    </Box>
  )
}