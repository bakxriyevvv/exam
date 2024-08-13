import { Router } from "express";
import { getAllOrders, getOrderById, createOrder, deleteOrder, updateOrder } from "../controllers/orders.controller.js";

export const orderRoutes = Router();

orderRoutes.get('/orders', getAllOrders);
orderRoutes.get('/orders/:id', getOrderById);
orderRoutes.post('/orders/add', createOrder);
orderRoutes.delete('/orders/delete/:id', deleteOrder);
orderRoutes.put('/orders/update/:id', updateOrder);
