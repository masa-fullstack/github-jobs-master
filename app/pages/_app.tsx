import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { ThemeProvider as MaterialUIThemeProvider } from '@material-ui/core/styles'
import { StylesProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../src/theme'
import 'tailwindcss/tailwind.css'
import { InputProvider } from '../components/hooks/inputContext'
import { SearchProvider } from '../components/hooks/searchContext'
import { PageProvider } from '../components/hooks/pageContext'

const CustomApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  useEffect(() => {
    const jssStyles: Element | null = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <StylesProvider injectFirst>
      <MaterialUIThemeProvider theme={theme}>
        <StyledComponentsThemeProvider theme={theme}>
          <SearchProvider>
            <InputProvider>
              <PageProvider>
                <CssBaseline />
                <Component {...pageProps} />
              </PageProvider>
            </InputProvider>
          </SearchProvider>
        </StyledComponentsThemeProvider>
      </MaterialUIThemeProvider>
    </StylesProvider>
  )
}

export default CustomApp
