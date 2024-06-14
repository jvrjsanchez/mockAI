import Link from 'next/link';
import Image from 'next/image';

import CustomButton from './CustomButton';

const NavBar = () => {
  return (
    <header className='w-full absolute z-10'>
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4'>
        <Link href='/' className='flex justify-center items-center'>
          <a>
            <Image src='/logo.png' alt='logo' width={150} height={50} />
          </a>
        </Link>

        <CustomButton title='Sign In' btnType='button' containerStyles='bg-white text-primary-blue rounded-full min-w-[130px]' />
      </nav>
    </header>
  )
}

export default NavBar