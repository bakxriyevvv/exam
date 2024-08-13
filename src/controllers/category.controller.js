import { fetchData } from '../database/postgres.js';

export async function getAllCategory(req, res) {
        const parentCategories = await fetchData(
            "SELECT * FROM category WHERE category_id is NULL;"
        );

        for (const c of parentCategories) {
            const subCategories = await fetchData(
                "SELECT * FROM category WHERE category_id = $1 RETURNING *;",
                c.id
            );
            c.subCategories = subCategories;
        }

        res.send({
            message: "Success",
            data: parentCategories
        });
    }

export async function createCategory(req, res) {
    try {
        const { name, image_url ,category_id } = req.body;

        const newCategory = await fetchData(
            "INSERT INTO category (name, image_url, category_id) VALUES ($1, $2, $3) RETURNING *;",
            name, image_url, category_id
        );

        res.status(201).send({
            message: "Category created",
            data: newCategory
        });
    } catch (error) {
        res.status(500).send({
            message: "Error creating category",
            error: error.message
        });
    }
}

export async function updateCategory(req, res) {
    try {
        const { name, category_id } = req.body;
        const { id } = req.params;

        const updatedCategory = await fetchData(
            "UPDATE category SET name = $1, category_id = $2 WHERE id = $3 RETURNING *; ",
            name, category_id, id
        );

        if (updatedCategory.length === 0) {
            return res.status(404).send({
                message: "Category not found"
            });
        }

        res.send({
            message: "Category updated",
            data: updatedCategory
        });
    } catch (error) {
        res.status(500).send({
            message: "Error updating category",
            error: error.message
        });
    }
}

export async function deleteCategory(req, res) {
    try {
        const { id } = req.params;

        const deletedCategory = await fetchData(
            "DELETE FROM category WHERE id = $1 RETURNING *;",
            id
        );

        if (deletedCategory.length === 0) {
            return res.status(404).send({
                message: "Category not found"
            });
        }

        res.send({
            message: "Category deleted",
            data: deletedCategory
        });
    } catch (error) {
        res.status(500).send({
            message: "Error deleting category",
            error: error.message
        });
    }
}
