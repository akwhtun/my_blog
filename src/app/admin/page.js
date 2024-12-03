"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();
    const [authData, setAuthData] = useState(null);

    // Use useEffect to safely access sessionStorage in the client-side environment
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedAuthData = sessionStorage.getItem("authData");
            if (storedAuthData) {
                setAuthData(JSON.parse(storedAuthData));
            } else {
                router.push('/');
            }
        }
    }, [router]);

    const logout = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.clear();
            router.push('/');
        }
    };

    if (!authData) {
        return null; // Render nothing while authData is being fetched
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <button onClick={logout}>LogOut</button>
            <Link href={"/"}>Home</Link>
            <h1 className="text-4xl font-bold mb-10">Admin Dashboard</h1>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Category Management Link */}
                <Link href="/categories/view">
                    <p className="bg-violet-500 text-white text-2xl font-semibold py-10 px-20 rounded-lg hover:bg-violet-700 transition duration-300 text-center">
                        Manage Categories
                    </p>
                </Link>

                {/* Blog Management Link */}
                <Link href="/blogs/view">
                    <p className="bg-blue-500 text-white text-2xl font-semibold py-10 px-20 rounded-lg hover:bg-blue-700 transition duration-300 text-center">
                        Manage Blogs
                    </p>
                </Link>
            </div>
        </div>
    );
};

export default Page;
