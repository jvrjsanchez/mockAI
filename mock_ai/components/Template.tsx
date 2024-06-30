'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'

const Template = () => {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  console.log(user)

  if (error) return <div>Error: {error.message}</div>

  return (
    <div className='hero'>
      <div className='flex-1 pt-36 padding-x'>
        <h1 className='hero__title'>
          Interview confidently with the help of AI!
        </h1>

        <p className='hero__subtitle'>
          We help you prepare for your interviews by providing you with the most common questions asked by top companies.
        </p>

        {user ? (
            <a href='/interview'
              title="Start Your Interview"
              className='bg-primary-blue text-white mt-10 rounded-full'>
              Start Your Interview
            </a>
        ) : (
        <a
          href='/api/auth/login'
          title="Start Your Interview"
          className='bg-primary-blue text-white mt-10 rounded-full'
        >Sign In to Start Your Interview
        </a>
        )}
      </div>
      <div className='hero__image-container'>
        <div className='hero__image'>
          <Image src="/PngItem_1500512.png" alt="interview" fill className='object-contain' />
        </div>
      </div>
    </div>
  )
}

export default Template
