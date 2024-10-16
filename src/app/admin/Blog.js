import { useState } from 'react';
import AdminLayout from './AdminLayout';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [blogTitle, setBlogTitle] = useState('');
    const [blogContent, setBlogContent] = useState('');


    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-5">Manage Blogs</h1>
            <form onSubmit={addBlog} className="mb-5">
                <input
                    type="text"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder="Blog Title"
                    className="border p-2 mr-2"
                    required
                />
                <textarea
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    placeholder="Blog Content"
                    className="border p-2 mr-2 w-full"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2">Add Blog</button>
            </form>

            <h2 className="text-xl mb-3">Existing Blogs:</h2>
            <ul>
                {blogs.map((blog, index) => (
                    <li key={index} className="mb-1">{blog.title}</li>
                ))}
            </ul>
        </AdminLayout>
    );
};

export default Blog;
