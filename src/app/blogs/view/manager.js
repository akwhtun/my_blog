
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
        return data.blogs;
    } catch (error) {
        console.error('Error fetching blogs:', error);
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


