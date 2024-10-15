"use client";
import React, { useState, useEffect } from 'react';
import { fetchBlogWithParts, deleteBlogPart } from "../manager"
import { useRouter, useSearchParams } from 'next/navigation';
const BlogManager = ({ params }) => {
    const { id } = params;
    const router = useRouter();
    const searchParams = useSearchParams();
    const message = searchParams.get('message');
    const [blog, setBlog] = useState([]);
    const [blogParts, setBlogParts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [deletingId, setDeletingId] = useState();

    const [msg, setMsg] = useState(message);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                setLoading(true);
                const fetchedBlogWithParts = await fetchBlogWithParts(id);
                setBlog(fetchedBlogWithParts.blog);
                setBlogParts(fetchedBlogWithParts.blogWithParts)
            } catch (error) {
                setMsg(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadBlogs();
    }, []);

    const handleDeleteBlogPart = async (partId) => {
        try {
            setDeletingId(partId);
            const msg = await deleteBlogPart(partId);
            const updatedFetchedBlogWithParts = await fetchBlogWithParts(id);
            setBlog(updatedFetchedBlogWithParts.blog);
            setBlogParts(updatedFetchedBlogWithParts.blogWithParts)

            setMsg(msg);
        } catch (error) {
            setMsg(error.message);
        }
    };

    // const handleEditBlogPart = async (id) => {
    //     router.push(`/blogs/edit/${id}`);
    // };

    // const handleViewBlogPart = async (id) => {
    //     router.push(`/blogs/edit/${id}`);
    // };

    if (loading) {
        return <div>Blog loading....</div>;
    }

    return (
        <div className="max-w-2xl mx-auto my-10 p-5 bg-white rounded-lg shadow-lg">
            <div className='flex flex-col'>
                <h2 className="text-2xl font-semibold text-pink-600 mb-5 text-center"> Blog Title : {blog.title}</h2>
                <div className='flex flex-col items-start justify-around'>
                    <p className="text-gray-600">
                        {blog.content}
                    </p>
                    <p className="text-sm text-gray-500">By {blog.author}</p>

                </div>
            </div>
            <h2 className="text-2xl font-semibold text-pink-600 mb-5 text-center">All Blogs Parts</h2>



            {/* Show total blog count */}
            <p className="text-gray-700 mb-5 text-center">Total Blog Part: {blogParts.length}</p>

            {msg && <p className="text-red-500 mb-4">{msg}</p>}

            <div className="space-y-4">
                {blogParts.map((blog) => (
                    <div key={blog._id} className="p-4 border rounded-lg shadow-md bg-gray-50">
                        <h3 className="text-xl font-semibold text-gray-800">{blog.part}</h3>

                        {/* Truncate the blog content */}
                        <p className="text-gray-600">
                            {blog.content.length > 100
                                ? blog.content.slice(0, 100) + "..."
                                : blog.content}

                        </p>


                        {/* Resize image */}
                        <img
                            src={`/uploads/part/${blog.imageUrl}`}
                            alt={blog.title}
                            className="w-full h-48 object-cover my-2 rounded-lg"
                        />

                        <p className="text-sm text-gray-400">
                            Published on: {new Date(blog.created_date).toLocaleDateString()}
                        </p>

                        <div className="flex space-x-4 mt-4">

                            <a
                                href={`/blogs/view/${blog._id}`}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
                                View
                            </a>
                            <button
                                onClick={() => handleEditBlog(blog._id)}
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteBlogPart(blog._id)}
                                disabled={deletingId === blog._id}
                                className={`text-white p-2 rounded-lg ${deletingId === blog._id
                                    ? 'bg-pink-300 cursor-not-allowed'
                                    : 'bg-red-600 hover:bg-red-500'
                                    } rounded-lg`}
                            >
                                {deletingId === blog._id ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogManager;
