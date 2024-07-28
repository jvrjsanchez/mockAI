'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useState } from 'react'

const Header = () => {
  const { user, error, isLoading } = useUser()
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)

  const handleAccordionClick = () => {
    setIsAccordionOpen(!isAccordionOpen)
  }

  const closeAccordion = () => {
    setIsAccordionOpen(false)
  }

  return (
    <header className='w-full absolute z-10'>
      <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 py-4 px-6'>
        <Link href='/' className='flex justify-center items-center'>
          <Image src='/mockAILogo.jpeg' alt='mockAI' width={118} height={18} />
        </Link>
        <div className='relative'>
          <button
            onClick={handleAccordionClick}
            className='flex items-center justify-center'
          >
            Menu
          </button>
          {isAccordionOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg'>
              <ul>
                <li onClick={closeAccordion}>
                  <Link href='/tips' title='Tips' className='block px-4 py-2'>
                    Tips
                  </Link>
                </li>
                {isLoading
                  ? (
                  <li className='block px-4 py-2'>Loading...</li>
                    )
                  : error
                    ? (
                  <li className='block px-4 py-2'>Error: {error.message}</li>
                      )
                    : user
                      ? (
                  <>
                    <li onClick={closeAccordion}>
                      <Link href='/user_account' title='User Account' className='block px-4 py-2'>
                        {user.name}
                      </Link>
                    </li>
                    <li onClick={closeAccordion}>
                      <a title='Log Out' href='/api/auth/logout' className='block px-4 py-2'>
                        Log Out
                      </a>
                    </li>
                  </>
                        )
                      : (
                  <li onClick={closeAccordion}>
                    <a title='Sign In' href='/api/auth/login' className='block px-4 py-2'>
                      Sign In
                    </a>
                  </li>
                        )}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
