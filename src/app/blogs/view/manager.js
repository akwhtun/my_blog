
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


export const fetchBlogWithParts = async (articleId) => {
    try {
        const response = await fetch(`/api/blogs/parts?article_id=${articleId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch blog and parts');
        }

        const data = await response.json();
        return data; // Assuming the entire blog with parts is returned
    } catch (error) {
        console.error('Error fetching blog with parts:', error);
        throw error;
    }
};

export const deleteBlogPart = async (blogPartId) => {
    try {
        const response = await fetch(`/api/parts?id=${blogPartId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete blog part');
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error deleting blog part:', error);
        throw error;
    }
};




