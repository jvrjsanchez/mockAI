import VoiceRecorder from './VoiceRecorder'

const Interview = () => {
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

export default Interview
