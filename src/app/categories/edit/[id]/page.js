"use client";
import { useState, useEffect } from "react";
import { fetchOneCategory, UpdateCategory } from "../../view/manager";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
const CategoryManager = ({ params }) => {
    const { id } = params;
    const router = useRouter();

    const [oldCategory, setOldCategory] = useState('');
    const [updatedCategory, setUpdatedCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const loadCategory = async () => {
            try {
                setLoading(true);
                const fetchedCategory = await fetchOneCategory(id);
                setOldCategory(fetchedCategory);
            } catch (error) {
                setMsg(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadCategory();
    }, [id]);

    const handleUpdateCategory = async () => {

        try {
            if (!updatedCategory) {
                setMsg("Name field is required");
                return;
            }
            setUpdateLoading(true);
            const updated = await UpdateCategory(id, updatedCategory);
            setOldCategory(updated);
            setMsg(updated);
            router.push(`/categories/view?message=${updated}`);
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
        )
    }

    return (
        <div className="max-w-2xl mx-auto my-10 p-5 bg-white rounded-lg shadow-lg">

            <div className="flex items-center mb-5">

                <ArrowLeftIcon
                    className="w-6 h-6 text-violet-600 cursor-pointer hover:text-violet-400"
                    onClick={() => router.back()}
                />
                <h2 className="text-2xl font-semibold text-violet-600 ms-5 text-center">
                    Update Category
                </h2>
            </div>

            {msg && <p className="mb-4 text-center text-red-500">{msg}</p>}

            <div className="flex mb-4">
                <input
                    type="text"
                    value={updatedCategory || oldCategory.name || ''}
                    onChange={(e) => setUpdatedCategory(e.target.value)}
                    placeholder="New Update Category"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500"
                />
                <button
                    onClick={handleUpdateCategory}
                    disabled={updateLoading}
                    className={`ml-3 p-2 text-white rounded-lg ${updateLoading
                        ? 'bg-violet-300 cursor-not-allowed'
                        : 'bg-violet-600 hover:bg-violet-500'
                        }`}
                >
                    {updateLoading ? 'Updating...' : 'Update Category'}
                </button>
            </div>
        </div>
    );
};

export default CategoryManager;
