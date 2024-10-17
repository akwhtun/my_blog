"use client";
import { useState, useEffect, Suspense } from "react";
import { fetchOneBlogPart, UpdateBlogPart } from "../../view/manager";  // Assuming you have these functions in your manager
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useSearchParams, useRouter } from 'next/navigation';
const BlogPartManager = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const partId = searchParams.get('id');

    const [oldBlogPart, setOldBlogPart] = useState({});
    const [updatedBlogPart, setUpdatedBlogPart] = useState({});
    const [loading, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const loadBlogPart = async () => {
            try {
                setLoading(true);
                const fetchedBlogPart = await fetchOneBlogPart(partId);
                setOldBlogPart(fetchedBlogPart);
                setUpdatedBlogPart(fetchedBlogPart);
            } catch (error) {
                setMsg(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadBlogPart();


    }, []);

    const handleUpdateBlogPart = async () => {
        // console.log(updatedBlog);

        try {
            setUpdateLoading(true);
            const formData = new FormData();
            formData.append('part', updatedBlogPart.part);
            formData.append('content', updatedBlogPart.content);
            formData.append('image', updatedBlogPart.imageUrl);
            formData.append('status', updatedBlogPart.status);
            const responseMsg = await UpdateBlogPart(partId, formData);
            router.push(`/blogs/view/${updatedBlogPart.article_id}?message=${responseMsg}`);

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
                <h2 className="text-2xl font-semibold text-violet-600 ml-2">Blog Part</h2>
            </div>


            {msg && <p className="mb-4 text-center text-red-500">{msg}</p>}

            <div className="mb-4">
                <input
                    type="text"
                    value={updatedBlogPart.part !== undefined ? updatedBlogPart.part : oldBlogPart.part || ''}
                    onChange={(e) => setUpdatedBlogPart({ ...updatedBlogPart, part: e.target.value })}

                    placeholder="Blog Part"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500"
                />
            </div>

            <div className="mb-4">
                <textarea
                    value={updatedBlogPart.content !== undefined ? updatedBlogPart.content : oldBlogPart.content || ''}
                    onChange={(e) => setUpdatedBlogPart({ ...updatedBlogPart, content: e.target.value })}
                    placeholder="Blog Content"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 h-40"
                />
            </div>

            <select
                value={updatedBlogPart.status !== undefined ? updatedBlogPart.status : oldBlogPart.status || ''}
                onChange={(e) => setUpdatedBlogPart({ ...updatedBlogPart, status: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500 mb-2"
            >
                <option value="">Select status</option>
                <option value="0">To be continued ...</option>
                <option value="1">End</option>
            </select>

            {/* Blog Image Upload */}
            <div className="mb-4">
                <input
                    type="file"
                    // value={oldBlog.imageUrl}
                    onChange={(e) => setUpdatedBlogPart({ ...updatedBlogPart, imageUrl: e.target.files[0] })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500"
                />
                {oldBlogPart.imageUrl && (
                    <img
                        src={`/uploads/part/${oldBlogPart.imageUrl}`}
                        alt={oldBlogPart.title}
                        className="w-full h-48 object-cover my-2 rounded-lg"
                    />
                )}
            </div>

            {/* Update Button */}
            <div className="flex">
                <button
                    onClick={handleUpdateBlogPart}
                    disabled={updateLoading}
                    className={`ml-3 p-2 text-white rounded-lg ${updateLoading
                        ? 'bg-violet-300 cursor-not-allowed'
                        : 'bg-violet-600 hover:bg-violet-500'
                        }`}
                >
                    {updateLoading ? 'Updating...' : 'Update Blog Part'}
                </button>
            </div>
        </div>

    );
};

const BlogPartManagerWithSuspense = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BlogPartManager />
        </Suspense>
    );
};

export default BlogPartManagerWithSuspense;
