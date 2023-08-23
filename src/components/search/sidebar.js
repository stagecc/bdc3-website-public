import React from "react";
import { Stack } from "@mui/material";

//

export const Sidebar = ({ children }) => {
  return (
    <Stack gap={ 4 } sx={{
      position: 'sticky',
      top: 135,
      '.MuiCardContent-root': { p: 0 },
      '.MuiListSubheader-root': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        lineHeight: '36px',
      },
    }}>
      { children }
    </Stack>
  )
}