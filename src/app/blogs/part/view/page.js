"use client";
import React, { useState, useEffect } from 'react';
import { fetchOneBlogPart } from "../../view/manager"
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useSearchParams, useRouter } from 'next/navigation';

const BlogPartManager = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const partId = searchParams.get('id');
    const [blogPart, setBlogPart] = useState([]);
    const [loading, setLoading] = useState(false);

    const [msg, setMsg] = useState();

    useEffect(() => {
        const loadBlogPart = async () => {
            try {
                setLoading(true);
                const part = await fetchOneBlogPart(partId);
                setBlogPart(part)
            } catch (error) {
                setMsg(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadBlogPart();
    }, []);


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
                <h2 className="text-2xl font-semibold text-violet-600 ml-2">Blog Part</h2>
            </div>


            {/* Show total blog count */}
            <p className="text-gray-700 mb-5 text-center">  {blogPart.part}</p>

            {msg && <p className="text-red-500 mb-4">{msg}</p>}

            <div className="space-y-4">

                <div className="p-4 border rounded-lg shadow-md bg-gray-50">

                    <p className="text-gray-600">
                        {blogPart.content}


                    </p>


                    {/* Resize image */}
                    <img
                        src={`/uploads/part/${blogPart.imageUrl}`}
                        alt={blogPart.title}
                        className="w-full h-80 object-cover my-2 rounded-lg"
                    />


                    <p className="text-sm text-gray-400">
                        Published on: {new Date(blogPart.created_date).toLocaleDateString()}
                    </p>

                    <p className="text-sm text-gray-400">
                        {blogPart.status == 0 ? "To be contined..." : "The end"}
                    </p>


                </div>

            </div>
        </div>
    );
};

export default BlogPartManager;
