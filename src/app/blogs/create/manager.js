export const createBlog = async (formData) => {

    let isValid = true;
    formData.forEach((value, key) => {
        if (key === 'image') {


            if (value == "null" || value.size == 0 || value == "" || value == "undefined") {

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



            const response = await fetch('/api/blogs', {
                method: 'POST',
                body: formData,
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
    }
};

