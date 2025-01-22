import { AppProps } from 'next/app';
import "tailwindcss/tailwind.css";
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
  <Layout {...pageProps}/>
  <Component {...pageProps} />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" />
</>
}

export default MyApp;