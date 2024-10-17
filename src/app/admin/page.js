"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const Page = () => {
    const router = useRouter();
    const authData = JSON.parse(sessionStorage.getItem("authData"));

    if (!authData) {
        router.push('/');
    }

    const logout = () => {
        sessionStorage.clear();
        router.push('/');
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
