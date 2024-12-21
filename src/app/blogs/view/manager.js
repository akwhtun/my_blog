
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

export const fetchOneBlogParts = async (id) => {
    try {
        const response = await fetch(`/api/blogs/${id}`, {
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
        return data.articleParts;
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




export const fetchOneBlogPart = async (blogPartId) => {
    try {
        const response = await fetch(`/api/parts/${blogPartId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch blog part');
        }

        const data = await response.json();
        return data.part;
    } catch (error) {
        console.error('Error fetching blog part:', error);
        throw error;
    }
};


export const UpdateBlogPart = async (id, formData) => {

    const partId = id;

    let isValid = true;
    formData.forEach((value, key) => {
        if (key === 'image') {


            if (value == "null" || value.size == 0 || value == "" || value == "undefined") {
                console.log("this is image", key, value);
                isValid = false;
            }
            else if (value.size > 5 * 1024 * 1024) {
                isValid = false;
            }
        }

        if (typeof value === 'string' && !value.trim()) {
            isValid = false;
        }
    });



    if (!isValid) {
        throw new Error('All fields need to fill..');

    } else {

        try {

            const response = await fetch(`/api/parts/${partId}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update blog part');
            }

            const data = await response.json();
            return data.message;
        } catch (error) {
            console.error('Error creating blog  part:', error);
        }
    }

};



