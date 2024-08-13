import { Router } from "express";
import { getAllPayments, getPaymentById, createPayment, deletePayment, updatePayment } from "../controllers/payments.controller.js";

export const paymentsRoutes = Router();

paymentsRoutes.get('/payments', getAllPayments);
paymentsRoutes.get('/payments/:id', getPaymentById);
paymentsRoutes.post('/payments/add', createPayment);
paymentsRoutes.delete('/payments/delete/:id', deletePayment);
paymentsRoutes.put('/payments/update/:id', updatePayment);
