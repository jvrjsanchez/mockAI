"use client"
import { useUser } from "@auth0/nextjs-auth0/client"
import Link from "next/link"

const UserAccount = () => {
    const { user, error, isLoading } = useUser()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    if (!user) {
        return (
          <div className="hero">
            <div className="flex-1 pt-36 padding-x">
              <h1 className="text-2xl font-bold">
                mockAI User Account Page
              </h1>
              <p className="text-lg mt-4">
                Sorry, but you must be signed in to view your account.
              </p>
              <button className="bg-primary-blue text-white mt-10 rounded-full">
                <a href="/api/auth/login">
                  Sign In to Start Your Interview
                </a>
              </button>
            </div>
          </div>
        );
    } else {
        return (
            <div className="hero">
                <div className="flex-1 pt-36 padding-x">
                    <h1 className="text-2xl font-bold">
                        mockAI User Account Page
                    </h1>
                </div>
                <div className="flex-1 bg-white pt-36 padding-x rounded-lg shadow-md">
                    <>
                        <img src={user.picture} alt={user.name} className="rounded-full h-24 w-24 mx-auto" />
                        <h1 className="text-2xl font-bold text-center mt-4">{user.name}</h1>
                        <p className="text-lg text-center mt-2">{user.email}</p>
                        <div className="flex flex-col space-y-4">
                            <Link href="/interview" className="bg-primary-blue text-white rounded-full py-2 text-center">Start Your Interview</Link>
                            <a href="/api/auth/logout" className="bg-primary-blue text-white rounded-full py-2 text-center">Sign Out</a>
                        </div>
                    </>
                </div>
            </div>
        )
    }
}
export default UserAccount