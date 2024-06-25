'use client'
import type { Metadata } from 'next'
import type { AppProps } from 'next/app'
import './globals.css'
//import { Auth0Provider } from '@auth0/auth0-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'mockAI',
  description: 'A behavioral mock interview API powered by AI.'
}

export default function RootLayout ({
  Component, pageProps
}: AppProps) {
  return (
    // <Auth0Provider
    //   domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
    //   clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
    //   redirectUri={typeof window !== 'undefined' ? window.location.origin : ''}
    // >
      <html lang="en">
        <body className='relative'>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </body>
      </html>
    //</Auth0Provider>
  )
}
