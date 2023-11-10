import '@/styles/globals.css'
import { StoreProvider } from '@/utiles/Store'

export default function App({ Component, pageProps }) {
  return (<StoreProvider>
     <Component {...pageProps} />
  </StoreProvider>)
}
