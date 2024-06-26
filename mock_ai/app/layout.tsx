import type { Metadata } from 'next'
import './globals.css'
import { Header, Footer } from '@/components'
import React from 'react'
import { UserProvider } from '@auth0/nextjs-auth0/client'

export const metadata: Metadata = {
  title: 'mockAI',
  description: 'A behavioral mock interview API powered by AI.'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <UserProvider>
        <body className='relative'>
          <Header />
          {children}
          <Footer />
        </body>
      </UserProvider>
      </html>
  )
}
