import { createTheme } from '@mui/material'
import { grey } from '@mui/material/colors'

export const defaultTheme = createTheme({
  palette: {
    background: {
      sidebar: '#233044',
      default: '#F7F9FC'
    }
  },
}, {
  header: {
    color: grey[500],
    background: '#FFF',
  }
})

declare module '@mui/material/styles' {
  interface TypeBackground {
    sidebar?: string;
  }
  interface Theme {
    header?: {
      color?: string;
      background?: string;
    };
  }
}
