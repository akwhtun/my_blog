export const createPart = async (formData) => {

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

            const response = await fetch('/api/parts', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create part');
            }

            const data = await response.json();
            return data.message;
        } catch (error) {
            console.error('Error creating part:', error);
        }
    }
};

