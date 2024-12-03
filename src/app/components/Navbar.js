"use client";
import Link from 'next/link';
import { useState } from 'react';
import BackgroundMusic from './BackgroundMusic';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import withAuth from 'next-auth/middleware';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMusicOn, setIsMusicOn] = useState(false);

    const { data: session, status } = useSession();




    const toggleMusic = () => {
        setIsMusicOn((prev) => !prev);
    };

    return (
        <nav className="bg-gradient-to-r from-purple-300 via-violet-300 to-violet-400 fixed top-0 left-0 w-full p-5 shadow-lg z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <div className="border-4 border-violet-600 rounded-full p-1 mr-2">
                        <Link href="/about" className="text-white text-lg hover:underline hover:text-rose-100 transition duration-300">
                            ?
                        </Link>
                    </div>
                </div>
                <div className="text-white text-2xl font-bold">
                    <Link href="/">
                        <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
                    </Link>
                </div>

                <div className="flex items-center">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                        {isOpen ? (
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="mt-4">
                    <Link href="/" className="block text-white text-lg py-2 hover:underline hover:text-rose-100 transition duration-300">
                        Home
                    </Link>
                    <Link href="/about" className="block text-white text-lg py-2 hover:underline hover:text-rose-100 transition duration-300">
                        About
                    </Link>
                    <Link href="/blogs" className="block text-white text-lg py-2 hover:underline hover:text-rose-100 transition duration-300">
                        Blogs
                    </Link>
                    {
                        session ? (<button
                            onClick={() => signOut()}
                            className={`lg:mt-1 mt-3 flex items-center px-4 py-2 border  rounded-md shadow-sm text-sm font-medium bg-violet-600 text-white`}
                        >
                            {session.user.name}
                        </button>) : (
                            <button
                                onClick={() => signIn('google')}
                                className={`lg:mt-1 mt-3 flex items-center px-4 py-2 border  rounded-md shadow-sm text-sm font-medium bg-violet-600 text-white`}
                            >
                                <img
                                    src="https://developers.google.com/identity/images/g-logo.png"
                                    alt="Google logo"
                                    className="w-5 h-5 mr-2"
                                />
                                Sign in with Google
                            </button>
                        )
                    }
                </div>
            )}
        </nav>

    );
};

export default Navbar;
