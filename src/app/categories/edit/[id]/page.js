"use client";
import { useState, useEffect } from "react";
import { fetchOneCategory, UpdateCategory } from "../../view/manager";
import { useRouter } from "next/navigation";
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

    return (
        <div className="max-w-2xl mx-auto my-10 p-5 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-pink-600 mb-5 text-center">
                Update Category
            </h2>

            {msg && <p className="mb-4 text-center text-red-500">{msg}</p>}

            <div className="flex mb-4">
                <input
                    type="text"
                    value={updatedCategory || oldCategory.name || ''}  // Use old category name if not updated yet
                    onChange={(e) => setUpdatedCategory(e.target.value)}
                    placeholder="New Update Category"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                />
                <button
                    onClick={handleUpdateCategory}
                    disabled={updateLoading}
                    className={`ml-3 p-2 text-white rounded-lg ${updateLoading
                        ? 'bg-pink-300 cursor-not-allowed'
                        : 'bg-pink-600 hover:bg-pink-500'
                        }`}
                >
                    {updateLoading ? 'Updating...' : 'Update Category'}
                </button>
            </div>
        </div>
    );
};

export default CategoryManager;
