import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head';
import { AppProps } from 'next/app'

import theme from '../theme'
import favico from '../favicon_96x96.png'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head>
        <title>MamaFoods - Merchant Interface</title>
        <link rel="icon" href={favico.src} />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
