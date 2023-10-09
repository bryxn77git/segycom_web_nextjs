import { useEffect } from 'react';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { mainTheme } from '../themes';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AuthProvider, UiProvider } from '../context';
import { SessionProvider } from "next-auth/react"
import { CartProvider } from '../context/cart/CartProvider';
import { SWRConfig } from 'swr';
import { segycomWebApi } from '../api';

const incrementarContador = async () => {
  try {
    await segycomWebApi.put('/admin/visits');
      
  } catch (error) {
      console.log(error)
  }
  
}

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    incrementarContador()
  }, [])

  return (
    <SessionProvider>
    <ThemeProvider theme={ mainTheme }>
      <SWRConfig 
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
        >
          <AuthProvider>
            <UiProvider>
              <CartProvider>
                <CssBaseline />
                <Component {...pageProps} />
              </CartProvider>
            </UiProvider>
          </AuthProvider>
        </SWRConfig>
    </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
