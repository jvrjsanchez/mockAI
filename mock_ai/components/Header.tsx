import Link from 'next/link';
import Image from 'next/image';

import CustomButton from './CustomButton';

const Header = () => {
    return (
        <header className='w-full absolute z-10'>
            <a>
                <Image src='/mockAILogo.jpeg' alt='logo' width={100} height={50} />
            </a>
            <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4'>
                <Link href='/' className='flex justify-center items-center'>Home</Link>
                <Link href='/about' className='flex justify-center items-center'>About</Link>
                <Link href='/interview' className='flex justify-center items-center'>Start Interview</Link>
                <CustomButton title='Sign In' btnType='button' containerStyles='bg-white text-primary-blue rounded-full min-w-[130px]' />
            </nav>
        </header>
    )
}

export default Header;