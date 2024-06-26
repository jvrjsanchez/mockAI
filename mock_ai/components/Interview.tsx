'use client'
import React, { useState } from 'react'

const Interview = () => {
  const [transcript, setTranscript] = useState('');

  const handleStart = async () => {
  }

  return (
    <div className='hero'>
      <div className='flex-1 pt-36 padding-x'>
        <h1 className='text-2xl font-bold'>Interview Meeting Room</h1>
        <button
          onClick={handleStart}
          className='bg-primary-blue text-white mt-10 rounded-full'>
            Begin Interview
          </button>
          <p>Transcript: {transcript}</p>

          <button className='bg-primary-blue text-white mt-10 rounded-full'>
            <a href='/results'>View Results</a>
          </button>
      </div>
    </div>
  )
}

export default Interview
