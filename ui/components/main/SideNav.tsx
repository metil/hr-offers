import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import React from "react";

export const SideNav = () => (
  <List component="nav" aria-label="main navigation links">
    <ListItemButton component={Link} href={'/candidates'}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Candidates" />
    </ListItemButton>
    <ListItemButton component={Link} href={'/jobs'}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Open positions" />
    </ListItemButton>
    <ListItemButton component={Link} href={'/offers'}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Offers" />
    </ListItemButton>
  </List>
)
