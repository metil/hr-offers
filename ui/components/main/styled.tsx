import { AppBar, Drawer as MuiDrawer, styled } from "@mui/material";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      background: theme.palette.background.sidebar,
      color: theme.palette.common.white,
      ['& svg']:{
        color: theme.palette.common.white,
      },
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
      ['& .hr-offers-logo']:{
        overflow: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }
    },
  }),
);

const AppBarStyled = styled(AppBar)`
  background: ${(props) => props.theme.header?.background};
  color: ${(props) => props.theme.header?.color};
`
export { Drawer, AppBarStyled }
