"use client"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchComment, updateComment } from "../manager";
import Link from "next/link";
export default function EditCommentForm() {
    const router = useRouter()
    const searchParams = useSearchParams();
    const commentId = searchParams.get("id")
    const [loading, setLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [data, setData] = useState([]);
    const [comment, setComment] = useState('');
    const [msg, setMsg] = useState();

    useEffect(() => {
        const loadComment = async () => {
            try {
                setLoading(true);
                const resultComment = await fetchComment(commentId);
                setData(resultComment.comment)
                setComment(resultComment.comment.content);

            } catch (error) {
                console.error("Error loading comments", error);
            } finally {
                setLoading(false);
            }
        };

        loadComment();
    }, [])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setUpdateLoading(true)

            const responseMsg = await updateComment(commentId, comment);
            router.push(`/blogs/part/comments?partId=${data.part_id}&$blogId=${data.article_id}&message=${responseMsg}`);
        } catch (error) {
            setMsg(error.message)
        } finally {
            setUpdateLoading(false);
        }
    }





    if (loading) return (<div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-t-transparent border-violet-500 rounded-full animate-spin"></div>
    </div>)


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-violet-500 to-violet-700 p-5">
            <div className="w-full max-w-lg bg-white h-screen rounded-lg shadow-lg p-6 mt-20">
                {msg && <p className="text-violet-500 my-4 ">{msg}</p>}
                <Link className="flex justify-center my-2" href={`/blogs/part/comments?partId=${data.part_id}&blogId=${data.article_id}`}>
                    <button className=" w-28 h-7 bg-gray-700 text-white text-center rounded-md  hover:bg-gray-600 transition">
                        Back
                    </button>
                </Link>

                <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    Edit Comment
                </h1>


                {/* Comment Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Comment Field */}
                    <div>
                        <label
                            htmlFor="comment"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Update Your  Comment
                        </label>
                        <textarea
                            id="comment"
                            name="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={5}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                            placeholder="Update your comment..."
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-violet-600 text-white py-2 rounded-md hover:bg-violet-500 transition"
                    >

                        {updateLoading ? 'Updating...' : 'Update Comment'}
                    </button>


                </form>
            </div>
        </div>
    );
}
