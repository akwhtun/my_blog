"use client";

import Image from 'next/image';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { fetchOneBlogPart, fetchOneBlogParts } from '../../view/manager';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
export default function BlogPart({ id }) {
    const router = useRouter();
    let partCount = 1;
    const searchParams = useSearchParams();
    const blogId = searchParams.get('blogId');
    const blogTitle = searchParams.get('blogTitle');
    const blogPartId = id;
    const [loading, setLoading] = useState(false);
    const [blogPart, setBlogPart] = useState([]);
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        const loadBlogPart = async () => {
            try {
                setLoading(true);
                const part = await fetchOneBlogPart(blogPartId);
                setBlogPart(part);
            } catch (error) {
                console.error("Error loading blog part:", error);
            } finally {
                setLoading(false);
            }
        };
        const loadBlogArticleParts = async () => {
            try {
                setLoading(true);
                const parts = await fetchOneBlogParts(blogId);
                setBlog(parts);
            } catch (error) {
                console.error("Error loading blog part:", error);
            } finally {
                setLoading(false);
            }
        };

        loadBlogPart();
        loadBlogArticleParts();
    }, []);

    return (
        <div className="relative w-full h-screen bg-violet-200 overflow-hidden">
            <Image
                src={`/uploads/part/${blogPart.imageUrl}`}
                alt="Romantic Banner"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="absolute w-full h-full object-cover brightness-75 opacity-80"
            />

            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="w-12 h-12 border-4 border-t-transparent border-violet-500 rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="absolute inset-0 px-4 flex flex-col items-center mt-24">
                    <p className="text-xl mb-2 text-gray-900 leading-relaxed font-serif blog">
                        {blogTitle}
                    </p>
                    <div className="bg-white bg-opacity-30 backdrop-blur-lg border border-violet-300 shadow-lg rounded-xl lg:w-4/12 md:w-8/12 sm:w-9/12 w-full p-5 text-center animate-fade-in-slow overflow-scroll blog">
                        <div className="flex items-center mb-5">

                            <ArrowLeftIcon
                                className="w-6 h-6 text-violet-600 cursor-pointer hover:text-violet-400"
                                onClick={() => router.back()}
                            />
                            <p className="text-xl ms-4 text-gray-900 leading-relaxed font-serif">
                                {blogPart.part}
                            </p>
                        </div>
                        <p className="text-lg text-gray-800 leading-relaxed font-serif mb-4">
                            {blogPart.content}
                        </p>
                        <p className="text-right font-serif text-xl text-violet-600 mb-4">
                            {blogPart.status === 0 ? "To be continued..." : "End"}
                        </p>
                        <p className="text-sm text-gray-600">
                            Published on: {new Date(blogPart.created_date).toLocaleDateString()}
                        </p>


                        <div className='flex flex-col justify-center border-4 border-violet-500 px-2 py-1 mt-2 blog'>
                            <p className="text-md my-2 text-gray-900">
                                {blogTitle}
                            </p>
                            <div className='flex flex-col'>
                                {blog.map((part) => (
                                    <Link href={`/blogs/part/${part._id}?blogId=${blogId}&blogTitle=${blogTitle}`} className={`text-md mb-2 blog ${part._id == blogPartId ? 'text-violet-600' : 'text-black'}`}>
                                        Part {partCount++} - {part.part}
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>


                </div>
            )}
        </div>
    );
}
