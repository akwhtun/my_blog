"use client";
import React, { useState } from 'react';
import { createPart } from './manager';
import { useSearchParams } from 'next/navigation';

const PartManager = () => {


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
            setMsg(responseMsg)


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
            <div>
                loading....
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto my-10 p-5 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-pink-600 mb-5 text-center">
                Part Manager
            </h2>

            <div className="flex flex-col mb-4">
                <input
                    type="text"
                    value={part}
                    onChange={(e) => setPart(e.target.value)}
                    placeholder="New Part"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 mb-2"
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="New Content"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 mb-2"
                    rows="5"
                />


                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 mb-2"
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
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 mb-2"
                />
            </div>

            <button
                onClick={handleCreatePart}
                disabled={createLoading}
                className={`ml-3 p-2 text-white rounded-lg ${createLoading
                    ? 'bg-pink-300 cursor-not-allowed'
                    : 'bg-pink-600 hover:bg-pink-500'
                    }`}
            >
                {createLoading ? 'Creating...' : 'Create Part'}
            </button>

            {msg && <p className="text-red-500 mt-4">{msg}</p>}

        </div>
    );
};

export default PartManager;
