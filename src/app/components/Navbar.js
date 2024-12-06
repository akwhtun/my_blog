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

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };



    // console.log(session?.user.id);

    const toggleMusic = () => {
        setIsMusicOn((prev) => !prev);
    };

    return (
        <nav className="bg-gradient-to-r from-purple-300 via-violet-300 to-violet-400 fixed top-0 left-0 w-full p-5 shadow-lg z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">

                    {session?.user ? (
                        <div className="relative">
                            <button
                                className="flex items-center space-x-2"
                                onClick={toggleDropdown}
                            >
                                <img
                                    src={session.user.image}
                                    alt="User profile"
                                    className="w-8 h-8 rounded-full border-2 border-white"
                                />
                                <span className="hidden md:inline-block font-medium">
                                    {session.user.name}
                                </span>
                                <svg
                                    className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute left-0  mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-gray-800">
                                    <a
                                        href="/auth/profile"
                                        className="block px-4 py-2 hover:bg-violet-100"
                                    >
                                        Profile
                                    </a>
                                    {session.user.isAdmin ? (<a
                                        href="/admin"
                                        className="block px-4 py-2 hover:bg-violet-100"
                                    >
                                        Dashboard
                                    </a>) : ("")}

                                    <button
                                        onClick={() => signOut()}
                                        className="block w-full text-left px-4 py-2 hover:bg-violet-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="border-4 border-violet-600 rounded-full p-1 mr-2">
                            <Link href="/about" className="text-white text-lg hover:underline hover:text-rose-100 transition duration-300">
                                ?
                            </Link>
                        </div>
                    )}


                </div>
                <div className="flex items-center justify-center">
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
                        session ? (<div></div>) : (
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
