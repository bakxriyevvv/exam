import { Router } from "express";
import { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct } from "../controllers/products.controller.js";

export const productRoutes = Router();

productRoutes.get('/products', getAllProducts);
productRoutes.get('/products/:id', getProductById);
productRoutes.post('/products/add', createProduct);
productRoutes.delete('/products/delete/:id', deleteProduct);
productRoutes.put('/products/update/:id', updateProduct);
