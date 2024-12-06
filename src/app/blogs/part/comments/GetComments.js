
"use client"
import { useState } from "react";
import { useEffect } from "react";
import { fetchBlogPartComments } from "./manager";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { deleteComment } from "./manager";
export default function GetComments() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [deleteLoadingId, setDeleteLoadingId] = useState(false)
    const [comments, setComments] = useState([]);
    const [msg, setMsg] = useState();
    const searchParams = useSearchParams();
    const partId = searchParams.get('partId');
    const blogId = searchParams.get('blogId');

    const { data: session } = useSession();
    useEffect(() => {
        const loadPartComments = async () => {
            try {
                setLoading(true);
                const partComments = await fetchBlogPartComments(partId);
                setComments(partComments);
            } catch (error) {
                console.error("Error loading part comments:", error);
            } finally {
                setLoading(false);
            }
        };

        loadPartComments();
    }, [])


    useEffect(() => {
        const msge = searchParams.get("message");
        setMsg(msge);
    }, [searchParams]);

    const handleDelete = async (id) => {
        try {
            setDeleteLoadingId(id);

            const responseMsg = await deleteComment(id);
            setMsg(responseMsg)

            const updatedComment = await fetchBlogPartComments(partId);
            setComments(updatedComment);

        } catch (error) {
            setMsg("Error deleting part comments:", error);
        }
    }


    if (loading) return (<div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-t-transparent border-violet-500 rounded-full animate-spin"></div>
    </div>)

    return (

        <div className="relative w-full h-screen bg-violet-200 overflow-hidden eng blog">
            <div className="absolute inset-0 flex flex-col items-center text-center px-5 bg-white bg-opacity-50 backdrop-blur-lg border border-violet-300 shadow-lg rounded-xl overflow-auto h-full lg:w-4/12 md:w-8/12 sm:w-9/12 w-full mx-auto">
                <p className="mt-24 "></p>
                {msg && <p className="text-violet-900">{msg}</p>}

                <Link href={`/blogs/read/${blogId}`}>
                    <button className="w-28 h-7 bg-gray-700 text-white text-center rounded-md  hover:bg-gray-600 transition mt-3" >
                        Back
                    </button>
                </Link>

                <h1 className="text-gray-800 text-xl font-bold mt-5 mb-2 leading-tight tracking-wide">
                    Blog Part Title - {comments[0]?.part.part}
                </h1>

                {/* Comments Header */}
                <h2 className="text-gray-800 text-lg font-semibold mt-2 mb-4 leading-tight tracking-wide">
                    All Comments - {comments.length}
                </h2>


                {/* Comments List */}
                <div className="w-full px-4 py-5 bg-white shadow rounded-md">
                    {session?.user ? (<Link href={`/blogs/part/comments/add?userId=${session.user.id}&blogId=${blogId}&partId=${partId}&title=${comments[0]?.part.part}`} className='cursor-pointer'>
                        <button className="px-4 py-2 text-white bg-violet-800 text-center rounded-md mb-4  hover:bg-violet-600 transition">
                            Add Your Comment
                        </button>
                    </Link>) : (<button onClick={() => signIn("google")} className=" cursor-pointer px-4 py-2 text-white bg-violet-800 text-center rounded-md mb-4  hover:bg-violet-600 transition">
                        Add Your Comment
                    </button>)}
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div
                                key={comment._id}
                                className="flex items-start gap-4 p-4 mb-4 rounded-lg bg-gray-50 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
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
                    ) : (
                        <p className="text-gray-600 text-center">No comments yet. Be the first to comment!</p>
                    )}


                </div>

            </div>
        </div>
    );
}
