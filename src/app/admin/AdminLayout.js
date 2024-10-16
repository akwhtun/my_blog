// components/AdminLayout.js
import Link from 'next/link';

const AdminLayout = ({ children }) => {
    return (
        <div className="flex">
            <nav className="bg-gray-800 text-white w-1/4 h-screen p-5">
                <h2 className="text-xl font-bold mb-5">Admin Dashboard</h2>
                <ul>
                    <li className="mb-3">
                        <Link href="/admin/categories" className="hover:text-gray-400">Manage Categories</Link>
                    </li>
                    <li className="mb-3">
                        <Link href="/admin/blogs" className="hover:text-gray-400">Manage Blogs</Link>
                    </li>
                </ul>
            </nav>
            <main className="flex-1 p-5">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
