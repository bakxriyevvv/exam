import { Router } from "express";
import { getAllCategory, createCategory, deleteCategory, updateCategory } from "../controllers/category.controller.js";

export const categoryRoutes = Router();

categoryRoutes.get('/categories', getAllCategory);
categoryRoutes.post('/categories/add', createCategory);
categoryRoutes.delete('/categories/delete/:id', deleteCategory);
categoryRoutes.put('/categories/update/:id', updateCategory);
