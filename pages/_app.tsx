import type { AppProps } from 'next/app'
import { AuthProvider } from "@/ui/contexts/AuthContext";
import { IconButton, ThemeProvider } from "@mui/material";
import { closeSnackbar, SnackbarProvider } from "notistack";
import React from "react";
import { Close } from "@mui/icons-material";
import ApolloProviderCTX from "@/ui/contexts/ApolloContext";
import { defaultTheme } from "@/ui/theme";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider theme={defaultTheme}>
        <SnackbarProvider
          preventDuplicate
          hideIconVariant
          action={(snackbarId) => (
            <IconButton onClick={() => closeSnackbar(snackbarId)}>
              <Close sx={{ color: '#fff' }} />
            </IconButton>
          )}
        >
          <ApolloProviderCTX>
            <Component {...pageProps} />
          </ApolloProviderCTX>
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
