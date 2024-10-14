export const fetchOneBlog = async (blogId) => {
    try {
        const response = await fetch(`/api/blogs/${blogId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch blog');
        }

        const data = await response.json();
        return data.article;
    } catch (error) {
        console.error('Error fetching blog: ', error);
        throw error;
    }
};

export const UpdateBlog = async (id, formData) => {

    const blogId = id;

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

            const response = await fetch(`/api/blogs/${blogId}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update blog');
            }

            const data = await response.json();
            return data.message;
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    }

};

export const fetchCategories = async () => {
    try {
        const response = await fetch('/api/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch categories');
        }

        const data = await response.json();
        return data.categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};