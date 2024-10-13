"use client";
import React, { useState, useEffect } from 'react';
import { createBlog } from './manager';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchCategories } from "../../categories/view/manager"
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
            console.log("form dAte", formData);

            const msg = await createBlog(formData);
            // setMsg(msg);
            console.log("message is" + msg);

        } catch (error) {
            setMsg(error.message);
        } finally {
            setCreateLoading(false);
        }
    };

    const handleImageChange = (e) => {
        setImageUrl(e.target.files[0]);  // Get the file from the input
    };

    if (loading) {
        return (
            <div>
                loading....
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto my-10 p-5 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-pink-600 mb-5 text-center">
                Blog Manager
            </h2>

            <div className="flex flex-col mb-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="New Title"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 mb-2"
                />
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="New Content"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 mb-2"
                />
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="New Author"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 mb-2"
                />


                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 mb-2"
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
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 mb-2"
                />
            </div>

            <button
                onClick={handleCreateBlog}
                disabled={createLoading}
                className={`ml-3 p-2 text-white rounded-lg ${createLoading
                    ? 'bg-pink-300 cursor-not-allowed'
                    : 'bg-pink-600 hover:bg-pink-500'
                    }`}
            >
                {createLoading ? 'Creating...' : 'Create Blog'}
            </button>

            {msg && <p className="text-red-500 mt-4">{msg}</p>}

        </div>
    );
};

export default BlogManager;
