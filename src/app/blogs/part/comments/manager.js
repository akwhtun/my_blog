export const fetchBlogPartComments = async (blogId) => {
    try {
        const response = await fetch(`/api/comments?id=${blogId}`, {
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
        return data.comments;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
};



export const createComment = async (formData) => {
    try {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch blogs');
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        throw error;
    }
};


export const fetchComment = async (id) => {
    try {
        const response = await fetch(`/api/comments/${id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch comment');
        }

        const comment = await response.json();
        return comment;
    } catch (error) {
        console.error('Error fetching comment:', error);
        throw error;
    }
};

export const updateComment = async (id, newComment) => {
    try {
        const response = await fetch(`/api/comments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Important for JSON requests
            },
            body: JSON.stringify({
                comment: newComment, // Convert this to a JSON string
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update comment');
        }

        const res = await response.json();
        return res.message;
    } catch (error) {
        console.error('Error updateing comment:', error);
        throw error;
    }
};

export const deleteComment = async (id) => {
    try {
        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete comment');
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};