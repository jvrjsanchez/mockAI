import type { Metadata } from 'next'
import './globals.css'
import { Header, Footer } from '@/components'
import React from 'react'

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
      <body className='relative'>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
