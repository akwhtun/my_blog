"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchOneBlogPart, fetchOneBlogParts } from '../../view/manager';
import { signIn } from 'next-auth/react';
import { fetchBlogPartComments } from '../comments/manager';
import { deleteComment } from '../comments/manager';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
export default function BlogPart({ id }) {
    const router = useRouter();
    let partCount = 1;
    const searchParams = useSearchParams();
    const blogId = searchParams.get('blogId');
    const blogTitle = searchParams.get('blogTitle');
    const blogPartId = id;
    const [loading, setLoading] = useState(false);
    const [commentLoading, setCommentLoading] = useState(false)
    const [comments, setComments] = useState([]);
    const [blogPart, setBlogPart] = useState([]);
    const [blog, setBlog] = useState([]);
    const [msg, setMsg] = useState();
    const [deleteLoadingId, setDeleteLoadingId] = useState(false)


    const { data: session } = useSession();

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

        const loadPartComments = async () => {
            try {
                setCommentLoading(true);
                const partComments = await fetchBlogPartComments(blogPartId);
                setComments(partComments);
            } catch (error) {
                console.error("Error loading part comments:", error);
            } finally {
                setCommentLoading(false);
            }
        };

        loadBlogPart();
        loadPartComments();
        loadBlogArticleParts();

    }, []);


    const handleDelete = async (commentId) => {
        try {
            setDeleteLoadingId(commentId);

            const responseMsg = await deleteComment(commentId);
            setMsg(responseMsg)

            const updatedComment = await fetchBlogPartComments(blogPartId);
            setComments(updatedComment);

        } catch (error) {
            setMsg("Error deleting part comments:", error);
        }
    }



    return (
        <div className="relative w-full h-screen bg-violet-200 overflow-hidden">
            <Image
                src={blogPart.imageUrl}
                alt="Romantic Banner"
                layout="fill"
                objectFit="cover"
                quality={100}
                className="absolute w-full h-full object-cover brightness-75 opacity-90"
            />

            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="w-12 h-12 border-4 border-t-transparent border-violet-500 rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="absolute inset-0 px-4 flex flex-col items-center mt-24">
                    <Link href={`/blogs/read/${blogId}`} className='cursor-pointer'>
                        <button className="w-28 h-7 bg-gray-700 text-white text-center rounded-md  hover:bg-gray-600 transition">
                            Back
                        </button>
                    </Link>
                    <p className="text-xl mb-2 text-white leading-relaxed font-serif blog">
                        {blogTitle}
                    </p>
                    <div className="bg-white bg-opacity-50 backdrop-blur-lg border border-violet-300 shadow-lg rounded-xl lg:w-4/12 md:w-8/12 sm:w-9/12 w-full p-5 text-center animate-fade-in-slow overflow-scroll blog">
                        <div className="flex items-center mb-5">


                            <p className="text-xl ms-4 text-violet-900 leading-relaxed font-serif">
                                {blogPart.part}
                            </p>
                        </div>
                        <p className="text-lg text-gray-800 leading-relaxed font-serif mb-4">
                            {blogPart.content}
                        </p>


                        <div className="relative w-full h-56 mb-6 rounded-sm overflow-hidden shadow-xl mx-auto">
                            <Image
                                src={blogPart.imageUrl} // Replace with your image URL
                                alt="User Avatar"
                                layout="fill" // Ensures the image fills the container
                                objectFit="contain" // Makes sure the whole image is visible without cropping
                            />
                        </div>



                        <p className="text-right font-serif text-xl text-violet-600">
                            {blogPart.status === 0 ? "To be continued..." : "End"}
                        </p>

                        <p className="text-sm text-start text-gray-600">
                            Published on: {new Date(blogPart.created_date).toLocaleDateString()}
                        </p>

                        <div className="flex items-center justify-between my-3">

                            {session?.user ? (<Link href={`/blogs/part/comments/add?userId=${session.user.id}&blogId=${blogId}&partId=${blogPartId}&title=${comments[0]?.part.part}`} className='cursor-pointer'>
                                <button className="cursor-pointer bg-gray-900 border-3 border-gray-200 text-white  px-2 md:px-3 rounded-md md:text-lg text-sm">
                                    Add Your Comment
                                </button>
                            </Link>) : (<button onClick={() => signIn("google")} className=" cursor-pointer bg-gray-900 border-3 border-gray-200 text-white  px-2 md:px-3  md:text-lg text-sm rounded-md">
                                Add Your Comment
                            </button>)}
                            <Link href={`/blogs/part/comments?partId=${blogPartId}&blogId=${blogId}`}>
                                <button className=" bg-gray-200 border-3  px-2 md:px-3 rounded-md md:text-lg  text-sm">
                                    {comments.length > 0
                                        ? `${comments.length} ${comments.length > 1 ? "Comments" : "Comment"}`
                                        : "No Comment Yet"}
                                </button>
                            </Link>

                        </div>
                        {msg && <p className="text-violet-900">{msg}</p>}
                        {commentLoading ? (<div className="w-12 h-12 border-4 border-t-transparent border-violet-500 rounded-full animate-spin"></div>) : (<div>
                            {
                                comments.map((comment) => (
                                    <div
                                        key={comment._id}
                                        className="flex items-start gap-4 p-4 mb-4 rounded-lg bg-gray-50 bg-transparent border  border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        {/* Profile Image */}
                                        <img
                                            src={comment.user.imageUrl}
                                            alt={`${comment.user.name}'s profile`}
                                            className="w-12 h-12 rounded-full object-cover border border-gray-300"
                                        />

                                        {/* Comment Content */}
                                        <div className="flex flex-col items-start w-full">
                                            {/* User Info */}
                                            <div className="flex justify-between items-center w-full">
                                                <p className="text-gray-900 font-medium">{comment.user.name}</p>
                                                <p className="text-sm font-bold text-gray-500">{new Date(comment.created_date).toLocaleDateString()}</p>
                                            </div>

                                            <div className="w-full">
                                                <p className="text-sm text-start text-gray-600 italic">{comment.user.email}</p>
                                                {/* Comment Content */}
                                                <p className="text-violet-900 text-start mt-2">{comment.content}</p>
                                            </div>


                                            {session?.user.id === comment.user._id ? (<div className="flex gap-3 mt-3">

                                                <button
                                                    disabled={deleteLoadingId === comment._id}
                                                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                                    onClick={() => handleDelete(comment._id)}
                                                >
                                                    {deleteLoadingId === comment._id ? 'Deleting...' : 'Delete'}
                                                </button>
                                                <Link href={`/blogs/part/comments/edit?id=${comment._id}`}
                                                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"

                                                >
                                                    Edit
                                                </Link>
                                            </div>) : (<div></div>)}
                                        </div>
                                    </div>

                                ))
                            }</div>
                        )}




                        <div className='flex flex-col justify-center border-4 border-violet-500 px-2 py-1 mt-2 blog'>
                            <p className="text-md my-2 text-gray-900">
                                {blogTitle}
                            </p>
                            <div className='flex flex-col'>
                                {blog.map((part, id) => (
                                    <Link key={id} href={`/blogs/part/${part._id}?blogId=${blogId}&blogTitle=${blogTitle}`} className={`text-md mb-2 blog ${part._id == blogPartId ? 'text-violet-600' : 'text-black'}`}>
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
