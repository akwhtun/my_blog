"use client";
import React, { useState, useEffect } from 'react';
import { createCategory, deleteCategory, fetchCategories } from './manager';
import { useRouter, useSearchParams } from 'next/navigation';

const CategoryManager = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const message = searchParams.get('message');
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [createLoading, setCreateLoading] = useState(false);
    const [deletingCategoryId, setDeletingCategoryId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(message);
    useEffect(() => {
        const loadCategories = async () => {
            try {
                setLoading(true);
                const fetchedCategories = await fetchCategories();
                setCategories(fetchedCategories);
            } catch (error) {
                setMsg(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadCategories();
    }, []);

    const handleCreateCategory = async () => {
        try {
            setCreateLoading(true);
            const msg = await createCategory(newCategory);
            const updatedCategories = await fetchCategories();
            setCategories(updatedCategories);
            setNewCategory('');
            setMsg(msg);
        } catch (error) {
            setMsg(error.message);
        } finally {
            setCreateLoading(false);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            // setDeleteLoading(true);
            setDeletingCategoryId(categoryId);
            const msg = await deleteCategory(categoryId);
            const updatedCategories = await fetchCategories();
            setCategories(updatedCategories);
            setMsg(msg);
        } catch (error) {
            setMsg(error.message);
        } finally {
            // setDeleteLoading(false);
        }
    };

    const handleEditCategory = async (categoryId) => {
        router.push(`/categories/edit/${categoryId}`);
    }
    if (loading) {
        return (
            <div>
                Category loading....
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto my-10 p-5 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-pink-600 mb-5 text-center">
                Category Manager
            </h2>

            <div className="flex mb-4">
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New Category"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                />
                <button
                    onClick={handleCreateCategory}
                    disabled={createLoading}
                    className={`ml-3 p-2 text-white rounded-lg ${createLoading
                        ? 'bg-pink-300 cursor-not-allowed'
                        : 'bg-pink-600 hover:bg-pink-500'
                        }`}
                >
                    {createLoading ? 'Creating...' : 'Create Category'}
                </button>
            </div>

            {msg && <p className="text-red-500 mb-4">{msg}</p>}


            <ul className="space-y-3">
                {categories.map((category) => (
                    <li
                        key={category._id}
                        className="flex justify-around items-center bg-pink-100 p-3 rounded-lg shadow-md"
                    >
                        <span className="text-lg">{category.name}</span>
                        <button
                            onClick={() => handleDeleteCategory(category._id)}
                            disabled={deletingCategoryId === category._id}
                            className={`text-white p-2 rounded-lg ${deletingCategoryId === category._id
                                ? 'bg-pink-300 cursor-not-allowed'
                                : 'bg-red-600 hover:bg-red-500'
                                }`}
                        >
                            {deletingCategoryId === category._id ? 'Deleting...' : 'Delete'}
                        </button>
                        <button
                            onClick={() => handleEditCategory(category._id)}

                        >
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryManager;