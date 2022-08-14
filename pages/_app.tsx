import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { mainTheme } from '../themes';
import { SessionProvider } from "next-auth/react"
import { CartProvider, UiProvider } from '../context';
import { SWRConfig } from 'swr';
import { AuthProvider } from '../context/auth/AuthProvider';
import { ProductProvider } from '../context/product';

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <ThemeProvider theme={ mainTheme }>
    <SessionProvider>
      <SWRConfig 
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
        >
        <AuthProvider>
        <UiProvider>
          <ProductProvider>
            <CartProvider>
                  <CssBaseline />
                  <Component {...pageProps} />
            </CartProvider>
          </ProductProvider>
        </UiProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
    </ThemeProvider>
  )
}

export default MyApp;
