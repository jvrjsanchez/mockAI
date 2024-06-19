import Link from 'next/link'
import Image from 'next/image'

import CustomButton from './CustomButton'

const Header = () => {
  return (
        <header className='w-full absolute z-10'>
            <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 py-4 px-6'>
                <Link href='/' className='flex justify-center items-center'>
                    <Image src='/mockAILogo.jpeg' alt='mockAI' width={118} height={18} />
                </Link>

                <CustomButton title='Sign In' containerStyles='text-white bg-primary-blue rounded-full min-w-[130px]' />
            </nav>
        </header>
  )
}

export default Header
