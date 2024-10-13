// POST: Create a Category
export const createCategory = async (name) => {
    if (!name) {
        throw new Error('Name field is required..');
    }

    try {
        const response = await fetch('/api/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create category');
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error creating category:', error);
    }
};

// GET: Fetch All Categories
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

export const fetchOneCategory = async (categoryId) => {
    try {
        const response = await fetch(`/api/categories/${categoryId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch category');
        }

        const data = await response.json();
        return data.category;
    } catch (error) {
        console.error('Error fetching category: ', error);
        throw error;
    }
};

export const deleteCategory = async (categoryId) => {
    try {
        const response = await fetch(`/api/categories?id=${categoryId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete category');
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};

export const UpdateCategory = async (categoryId, updateCategory) => {
    try {
        const response = await fetch(`/api/categories/${categoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: updateCategory }),

        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update category');
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};
