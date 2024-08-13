import { Router } from "express";
import { getAllOrderItems, getOrderItemById, createOrderItem, deleteOrderItem, updateOrderItem } from "../controllers/order_item.controller.js";

export const orderItemsRoutes = Router();

orderItemsRoutes.get('/order-items', getAllOrderItems);
orderItemsRoutes.get('/order-items/:id', getOrderItemById);
orderItemsRoutes.post('/order-items/add', createOrderItem);
orderItemsRoutes.delete('/order-items/delete/:id', deleteOrderItem);
orderItemsRoutes.put('/order-items/update/:id', updateOrderItem);
