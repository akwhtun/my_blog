"use client"
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-pink-300 via-rose-300 to-red-400 fixed top-0 left-0 w-full p-5 shadow-lg z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/about" className="text-white text-lg hover:underline hover:text-rose-100 transition duration-300">
                    ?
                </Link>
                <div className="text-white text-2xl font-bold">
                    <Link href="/">💖 My Love Story</Link>
                </div>



                <div className="">
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
                <div className=" mt-4">
                    <Link href="/" className="block text-white text-lg py-2 hover:underline hover:text-rose-100 transition duration-300">
                        Home
                    </Link>
                    <Link href="/journey" className="block text-white text-lg py-2 hover:underline hover:text-rose-100 transition duration-300">
                        Our Journey
                    </Link>
                    <Link href="/notes" className="block text-white text-lg py-2 hover:underline hover:text-rose-100 transition duration-300">
                        Love Notes
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
