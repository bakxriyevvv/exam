import { Router } from "express";
import { getAllCustomers, getCustomerById, createCustomer, deleteCustomer, updateCustomer } from "../controllers/customers.controller.js";

export const customerRoutes = Router();

customerRoutes.get('/customers', getAllCustomers);
customerRoutes.get('/customers/:id', getCustomerById);
customerRoutes.post('/customers/add', createCustomer);
customerRoutes.delete('/customers/delete/:id', deleteCustomer);
customerRoutes.put('/customers/update/:id', updateCustomer);
