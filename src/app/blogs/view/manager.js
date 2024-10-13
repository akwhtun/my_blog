export const createBlog = async (category_id, title, content, author, imageUrl) => {
    if (!category_id || !title || !content || !author || !imageUrl) {
        throw new Error('All fields need to fill..');
    }

    try {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category_id, title, content, author, imageUrl }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create blog');
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error creating blog:', error);
    }
};

export const fetchBlogs = async () => {
    try {
        const response = await fetch('/api/blogs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch blogs');
        }

        const data = await response.json();
        return data.categories;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
};

export const fetchOneBlog = async (blogId) => {
    try {
        const response = await fetch(`/api/categories/${blogId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch blog');
        }

        const data = await response.json();
        return data.blog;
    } catch (error) {
        console.error('Error fetching blog: ', error);
        throw error;
    }
};

export const deleteBlog = async (blogId) => {
    try {
        const response = await fetch(`/api/blogs?id=${blogId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete blog');
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error deleting blog:', error);
        throw error;
    }
};

export const UpdateCategory = async (blogId, updateCategoryId, updateTitle, updateContent, updateAuthor, updateImageUrl) => {
    try {
        const response = await fetch(`/api/blogs/${blogId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ categoryId: updateCategoryId, title: updateTitle, content: updateContent, author: updateAuthor, imageUrl: updateImageUrl }),

        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update blog');
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error updating blog:', error);
        throw error;
    }
};
