"use client";
import React, { useState, Suspense } from 'react';
import { createPart } from './manager';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
const PartManager = () => {


    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('blogId');

    const [part, setPart] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [status, setStatus] = useState('');
    const [createLoading, setCreateLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState();





    const handleCreatePart = async () => {

        try {
            setCreateLoading(true);
            const formData = new FormData();
            formData.append('article_id', id);
            formData.append('part', part);
            formData.append('content', content);
            formData.append('image', imageUrl);
            formData.append('status', status)

            const responseMsg = await createPart(formData);
            router.push(`/blogs/view/${id}?message="Blog Part created"`);


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
        )
    }

    return (
        <div className="max-w-2xl mx-auto my-10 p-5 bg-white rounded-lg shadow-lg">

            <div className="flex items-center mb-5">

                <ArrowLeftIcon
                    className="w-6 h-6 text-violet-600 cursor-pointer hover:text-violet-400"
                    onClick={() => router.back()}
                />
                <h2 className="text-2xl ms-4 font-semibold text-violet-600 text-center">
                    Part Manager
                </h2>
            </div>


            <div className="flex flex-col mb-4">
                <input
                    type="text"
                    value={part}
                    onChange={(e) => setPart(e.target.value)}
                    placeholder="New Part"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 mb-2"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="New Content"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 mb-2"
                    rows="5"
                />


                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 mb-2"
                >
                    <option value="">Select status</option>
                    <option value="0">To be continued ...</option>
                    <option value="1">End</option>
                </select>


                <input
                    type="file"
                    name='image'
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 mb-2"
                />
            </div>

            <button
                onClick={handleCreatePart}
                disabled={createLoading}
                className={`ml-3 p-2 text-white rounded-lg ${createLoading
                    ? 'bg-violet-300 cursor-not-allowed'
                    : 'bg-violet-600 hover:bg-violet-500'
                    }`}
            >
                {createLoading ? 'Creating...' : 'Create Part'}
            </button>

            {msg && <p className="text-red-500 mt-4">{msg}</p>}

        </div>
    );
};

const PartManagerWithSuspense = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PartManager />
        </Suspense>
    );
};

export default PartManagerWithSuspense;

