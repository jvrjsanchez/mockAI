'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0/client'

const Header = () => {
  const { user, error, isLoading } = useUser()

  return (
    <header className='w-full absolute z-10'>
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 py-4 px-6'>
        <Link href='/' className='flex justify-center items-center'>
          <Image src='/mockAILogo.jpeg' alt='mockAI' width={118} height={18} />
        </Link>
        <Link href='/tips' title='Tips' className='mr-4'>Tips</Link>
        {isLoading
          ? (
          <div>Loading...</div>
            )
          : error
            ? (
          <div>Error: {error.message} </div>
              )
            : user
              ? (
          <div className='flex items-center'>
            <Link href='/user_account' title='User Account' style={{ margin: '10px' }} className='mr-4'>{user.name}</Link>
            <a title='Log Out' href='/api/auth/logout' className='ml-4'>
              Log Out
            </a>
          </div>
                )
              : (
          <a title='Sign In' href='/api/auth/login'>
            Sign In
          </a>
                )}
      </nav>
    </header>
  )
}

export default Header
