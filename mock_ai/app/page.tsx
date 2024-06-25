'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
//import { useUser } from '@auth0/nextjs-auth0/client'

export default function Home () {
  // const { user, error, isLoading } = useUser()

  // if (isLoading) return <div>Loading...</div>
  // if (error) return <div>{error.message}</div>

  return (
    <main className="overflow-hidden">
      <div>
        <div className='flex-1 pt-36 padding-x'>
          <h1 className='font-bold'>
            Interview confidently with the help of AI!
          </h1>

          <p className='hero__subtitle'>
            We help you prepare for your interviews by providing you with the most common questions asked by top companies.
          </p>
          <Image src="/PngItem_1500512.png" alt="interview" width={1080} height={200} className='object-contain' />
          <Button asChild className='px-20 bg-blue-500 p-5 text-xl'>
            {/* {!user ? ( */}
              <Link href='/login'>Sign-In to Interview</Link>
            {/* ) : (
              <Link href='/interview'>Start Interviewing</Link>
            )} */}
          </Button>
        </div>
      </div>
    </main>
  )
}
