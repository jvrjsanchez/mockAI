import Link from 'next/link'
import Image from 'next/image'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@/components/ui/button'

import { House } from 'lucide-react'

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()
  return (
        <header className='relative text-center z-10'>
            <Link href='/' className='flex justify-center items-center'>
                <Image src='/mockAILogo.jpeg' alt='mockAI' width={118} height={18} />
            </Link>
            <nav className='flex justify-between'>
                <div className='absolute -top-5 right-5 flex space-x-2'>
                    <Link href='/'>
                        <House className='w-8 h-8 lg:w-10 lg:h-10 mx-auto text-blue-500 mt-10 border border-blue-500 p-2 rounded-md hover:opacity-50 cursor-pointer' />
                    </Link>
                    <div>
                        {!isAuthenticated ? (
                            <Button onClick={() => loginWithRedirect()} variant='outline' size='sm' className='mt-10'>Sign-In to Interview</Button>
                        ) : (
                            <Button onClick={() => logout({})} variant='outline' size='sm' className='mt-10'>Sign Out</Button>
                        )}
                    </div>
                </div>
            </nav>
        </header>
  )
}

export default Header
