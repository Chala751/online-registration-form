// pages/_app.js
import '../globals.css'
import { Toaster } from 'sonner'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster richColors position="top-center" />
      <Component {...pageProps} />
    </>
  )
}
