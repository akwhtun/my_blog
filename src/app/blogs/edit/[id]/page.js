"use client";
import { useState, useEffect } from "react";
import { fetchOneBlog, UpdateBlog, fetchCategories } from "../manager";  // Assuming you have these functions in your manager
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
const BlogManager = ({ params }) => {
    const { id } = params;
    const router = useRouter();

    const [categories, setCategories] = useState([]);
    const [oldBlog, setOldBlog] = useState([]);
    const [updatedBlog, setUpdatedBlog] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const loadBlog = async () => {
            try {
                setLoading(true);
                const fetchedBlog = await fetchOneBlog(id);
                console.log("Fetched Blog:", fetchedBlog);  // Debugging
                fetchedBlog && setOldBlog(fetchedBlog);
                setUpdatedBlog(fetchedBlog);
            } catch (error) {
                setMsg(error.message);
            } finally {
                setLoading(false);
            }
        };


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

        loadBlog();
        loadCategories();

    }, [id]);



    const handleUpdateBlog = async () => {

        try {
            setUpdateLoading(true);
            const formData = new FormData();
            formData.append('title', updatedBlog.title);
            formData.append('content', updatedBlog.content);
            formData.append('author', updatedBlog.author);
            formData.append('categoryId', updatedBlog.category_id);
            formData.append('image', updatedBlog.imageUrl);


            const responseMsg = await UpdateBlog(id, formData);
            router.push(`/blogs/view?message=${responseMsg}`);

        } catch (error) {
            setMsg(error.message);
        } finally {
            setUpdateLoading(false);
        }
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
                <h2 className="text-2xl ms-4 font-semibold text-violet-600  text-center">
                    Update Blog
                </h2>
            </div>

            {msg && <p className="mb-4 text-center text-red-500">{msg}</p>}

            <div className="mb-4">
                <input
                    type="text"
                    value={updatedBlog.title !== undefined ? updatedBlog.title : oldBlog.title || ''}
                    onChange={(e) => setUpdatedBlog({ ...updatedBlog, title: e.target.value })}

                    placeholder="Blog Title"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500"
                />
            </div>

            <div className="mb-4">
                <textarea
                    value={updatedBlog.content !== undefined ? updatedBlog.content : oldBlog.content || ''}
                    onChange={(e) => setUpdatedBlog({ ...updatedBlog, content: e.target.value })}
                    placeholder="Blog Content"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 h-40"
                />
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    value={updatedBlog.author !== undefined ? updatedBlog.author : oldBlog.author || ''}
                    onChange={(e) => setUpdatedBlog({ ...updatedBlog, author: e.target.value })}
                    placeholder="Author"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500"
                />
            </div>

            <select
                value={updatedBlog.category_id !== undefined ? updatedBlog.category_id : oldBlog.category_id || ''}
                onChange={(e) => setUpdatedBlog({ ...updatedBlog, category_id: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 mb-2"
            >
                <option value="">Select Category</option>
                {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                ))}
            </select>



            {/* Blog Image Upload */}
            <div className="mb-4">
                <input
                    type="file"
                    // value={oldBlog.imageUrl}
                    onChange={(e) => setUpdatedBlog({ ...updatedBlog, imageUrl: e.target.files[0] })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500"
                />
                {oldBlog.imageUrl && (
                    <img
                        src={oldBlog.imageUrl} // Show current image if available
                        alt={oldBlog.title}
                        className="w-full h-48 object-cover my-2 rounded-lg"
                    />
                )}
            </div>

            {/* Update Button */}
            <div className="flex">
                <button
                    onClick={handleUpdateBlog}
                    disabled={updateLoading}
                    className={`ml-3 p-2 text-white rounded-lg ${updateLoading
                        ? 'bg-violet-300 cursor-not-allowed'
                        : 'bg-violet-600 hover:bg-violet-500'
                        }`}
                >
                    {updateLoading ? 'Updating...' : 'Update Blog'}
                </button>
            </div>
        </div>

    );
};


export default BlogManager;
