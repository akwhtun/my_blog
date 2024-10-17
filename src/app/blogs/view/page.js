"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { fetchBlogs, deleteBlog } from './manager';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
const BlogManager = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const message = searchParams.get('message');
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deletingBlogId, setDeletingBlogId] = useState(false);
    const [msg, setMsg] = useState(message);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                setLoading(true);
                const fetchedBlogs = await fetchBlogs();
                setBlogs(fetchedBlogs);
            } catch (error) {
                setMsg(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadBlogs();
    }, []);

    const handleDeleteBlog = async (id) => {
        try {
            setDeletingBlogId(id);
            const msg = await deleteBlog(id);
            const updateBlod = await fetchBlogs();
            setBlogs(updateBlod);
            setMsg(msg);
        } catch (error) {
            setMsg(error.message);
        }
    };

    const handleEditBlog = async (id) => {
        router.push(`/blogs/edit/${id}`);
    };

    if (loading) {
        return (<div className="flex justify-center items-center min-h-screen">
            <div className="w-12 h-12 border-4 border-t-transparent border-violet-500 rounded-full animate-spin"></div>
        </div>);
    }

    return (
        <div className="max-w-2xl mx-auto my-10 p-5 bg-white rounded-lg shadow-lg">
            <Link href={'/admin'}>
                Go Admin
            </Link>
            <h2 className="text-2xl font-semibold text-violet-600 mb-5 text-center">All Blogs</h2>

            <Link href={'/blogs/create'}>
                Create Blog
            </Link>

            {/* Show total blog count */}
            <p className="text-gray-700 mb-5 text-center">Total Blogs: {blogs.length}</p>

            {msg && <p className="text-red-500 mb-4">{msg}</p>}

            <div className="space-y-4">
                {blogs.map((blog) => (
                    <div key={blog._id} className="p-4 border rounded-lg shadow-md bg-gray-50">
                        <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>

                        {/* Truncate the blog content */}
                        <p className="text-gray-600">
                            {blog.content.length > 100
                                ? blog.content.slice(0, 100) + "..."
                                : blog.content}

                        </p>

                        <p className="text-sm text-gray-500">By {blog.author}</p>

                        {/* Resize image */}
                        <img
                            src={`/uploads/article/${blog.imageUrl}`}
                            alt={blog.title}
                            className="w-full h-48 object-cover my-2 rounded-lg"
                        />

                        <p className="text-sm text-gray-400">
                            Published on: {new Date(blog.created_date).toLocaleDateString()}
                        </p>

                        <div className="flex space-x-4 mt-4">
                            <a
                                href={`/blogs/write/parts/?blogId=${blog._id}`}
                                className="px-4 py-2 bg-violet-500 text-white rounded-lg"
                            >
                                Write Blog Part
                            </a>
                            <a
                                href={`/blogs/view/${blog._id}`}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
                                All Parts
                            </a>
                            <button
                                onClick={() => handleEditBlog(blog._id)}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteBlog(blog._id)}
                                disabled={deletingBlogId === blog._id}
                                className={`text-white p-2 rounded-lg ${deletingBlogId === blog._id
                                    ? 'bg-violet-300 cursor-not-allowed'
                                    : 'bg-red-600 hover:bg-red-500'
                                    } rounded-lg`}
                            >
                                {deletingBlogId === blog._id ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const BlogManagerWithSuspense = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BlogManager />
        </Suspense>
    );
};


export default BlogManagerWithSuspense;
