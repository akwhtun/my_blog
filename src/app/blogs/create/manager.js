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
