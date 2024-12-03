"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { createBlog } from './manager';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchCategories } from "../../categories/view/manager";

// Wrap your BlogManager component with Suspense
const BlogManager = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const message = searchParams.get('message');

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [createLoading, setCreateLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(message);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                setLoading(true);
                const fetchedCategories = await fetchCategories();
                setCategories(fetchedCategories);
            } catch (error) {
                setMsg(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadCategories();
    }, []);

    const handleCreateBlog = async () => {
        try {
            setCreateLoading(true);
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('author', author);
            formData.append('categoryId', categoryId);
            formData.append('image', imageUrl);

            const responseMsg = await createBlog(formData);
            router.push(`/blogs/view?message=${responseMsg}`);
        } catch (error) {
            setMsg(error.message);
        } finally {
            setCreateLoading(false);
        }
    };

    const handleImageChange = (e) => {
        setImageUrl(e.target.files[0]);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-12 h-12 border-4 border-t-transparent border-violet-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto my-10 p-5 bg-white rounded-lg shadow-lg">
            <div className="flex items-center mb-5">
                <ArrowLeftIcon
                    className="w-6 h-6 text-violet-600 cursor-pointer hover:text-violet-400"
                    onClick={() => router.back()}
                />
                <h2 className="text-2xl ms-4 font-semibold text-violet-600 text-center">
                    Blog Manager
                </h2>
            </div>

            <div className="flex flex-col mb-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="New Title"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 mb-2"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="New Content"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 mb-2"
                    rows="5"
                />
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="New Author"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 mb-2"
                />
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 mb-2"
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 mb-2"
                />
            </div>

            <button
                onClick={handleCreateBlog}
                disabled={createLoading}
                className={`ml-3 p-2 text-white rounded-lg ${createLoading
                    ? 'bg-violet-300 cursor-not-allowed'
                    : 'bg-violet-600 hover:bg-violet-500'
                    }`}
            >
                {createLoading ? 'Creating...' : 'Create Blog'}
            </button>

            {msg && <p className="text-red-500 mt-4">{msg}</p>}
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
