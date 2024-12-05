"use client"
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { createComment } from "../manager";
import Link from "next/link";
export default function AddCommentForm() {

    const router = useRouter();

    const [comment, setComment] = useState('');
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const blogId = searchParams.get('blogId');
    const partId = searchParams.get('partId');
    const userId = searchParams.get('userId');
    const title = searchParams.get('title');

    const [msg, setMsg] = useState();
    const [createLoading, setCreateLoading] = useState(false)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("blogId", blogId);
            formData.append("partId", partId);
            formData.append("comment", comment);

            setCreateLoading(true)

            // // Log FormData contents
            // for (let [key, value] of formData.entries()) {
            //     console.log(`${key}: ${value}`);
            // }
            const responseMsg = await createComment(formData);
            setMsg(responseMsg)
            router.push(`/blogs/part/comments?partId=67122a63a62ab212917f1f06&blogId=67122a2fa62ab212917f1f02&message=${responseMsg}`);
        } catch (error) {
            setMsg(error.message)
        } finally {
            setCreateLoading(false);
        }
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-violet-500 to-violet-700 p-5">
            <div className="w-full max-w-lg bg-white h-screen rounded-lg shadow-lg p-6 mt-20">
                {msg && <p className="text-violet-500 my-4 ">{msg}</p>}
                <Link className="flex justify-center" href={`/blogs/part/comments?partId=${partId}&blogId=${blogId}`}>
                    <button className=" w-28 h-7 bg-gray-700 text-white text-center rounded-md  hover:bg-gray-600 transition">
                        Back
                    </button>
                </Link>
                <h1 className="text-xl mt-3 font-bold text-gray-800 mb-4 text-center">
                    Title - {title}
                </h1>

                <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    Add a Comment for this blog part
                </h1>


                {/* Comment Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Comment Field */}
                    <div>
                        <label
                            htmlFor="comment"
                            className="block text-gray-700 font-medium mb-1"
                        >
                            Write Your  Comment
                        </label>
                        <textarea
                            id="comment"
                            name="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={5}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                            placeholder="Write your comment..."
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={createLoading}
                        className="w-full bg-violet-600 text-white py-2 rounded-md hover:bg-violet-500 transition ${createLoading
                            ? 'bg-violet-300 cursor-not-allowed'
                            : 'bg-violet-600 hover:bg-violet-500'
                            }"
                    >

                        {createLoading ? 'Submitting...' : 'Submit Comment'}
                    </button>


                </form>
            </div>
        </div>
    );
}
