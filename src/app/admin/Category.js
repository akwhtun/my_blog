import { useState } from 'react';
import AdminLayout from './AdminLayout';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');

    const addCategory = (e) => {
        e.preventDefault();
        if (categoryName) {
            setCategories([...categories, categoryName]);
            setCategoryName('');
        }
    };

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-5">Manage Categories</h1>
            <form onSubmit={addCategory} className="mb-5">
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="New Category"
                    className="border p-2 mr-2"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2">Add Category</button>
            </form>

            <h2 className="text-xl mb-3">Existing Categories:</h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index} className="mb-1">{category}</li>
                ))}
            </ul>
        </AdminLayout>
    );
};

export default Category;
