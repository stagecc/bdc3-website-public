import React from "react";
import { Stack } from "@mui/material";
import { CollectionPreview } from "../../components/search";

//

export const Sidebar = () => {
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
      <CollectionPreview />
    </Stack>
  )
}
