'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
import VoiceRecorder from './VoiceRecorder'

const Interview = () => {
  const { user, error, isLoading } = useUser()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!user) {
    return (
      <div className='hero'>
        <div className='flex-1 pt-36 padding-x'>
          <h1 className='text-2xl font-bold'>Interview Meeting Room</h1>
          <p className='text-lg mt-4'>Sorry, but you must be signed in to start your interview.</p>
          <button className='bg-primary-blue text-white mt-10 rounded-full'>
            <a href='/api/auth/login'>Sign In to Start Your Interview</a>
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div className='hero'>
        <div className='flex-1 pt-36 padding-x'>
          <h1 className='text-2xl font-bold'>Interview Meeting Room</h1>
          <VoiceRecorder />
          <button className='bg-primary-blue text-white mt-10 rounded-full'>
            <a href='/results'>View Results</a>
          </button>
        </div>
      </div>
    )
  }
}

export default Interview
