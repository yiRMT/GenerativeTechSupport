import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery'
import { useMemo } from 'react'

const inter = Inter({
  display: 'swap',
  subsets: ["latin"],
})

export default function App({ Component, pageProps }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return ( 
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={inter.className}>
        <div className='mx-4'>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  )
}
