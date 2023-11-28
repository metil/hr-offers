import { Grid, IconButton, Toolbar } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import React from "react";
import { User } from "@/__generated__/graphql";

export const AppToolbar = ({ user, logout }: {user: Partial<User> | null, logout: ()=> void}) => (
  <Toolbar
    sx={{
      boxSizing: 'border-box',
      width: { xs: '100vw', md: `calc(100vw - 240px - 18px)` },
    }}
  >
    <Grid
      container
      alignItems='center'
      sx={{
        justifyContent: { xs: 'space-between', md: 'flex-end' },
      }}
    >
      <Grid item alignSelf='flex-end'>
        Hello, {user?.name}
        <IconButton onClick={logout} sx={{ mx:1 }}>
          <PowerSettingsNewIcon />
        </IconButton>
      </Grid>
    </Grid>
  </Toolbar>
)
