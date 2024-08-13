import express from 'express';
import { getAllContracts, getContractById, createContract, updateContract, deleteContract } from '../controllers/contract.controller.js';

export const contractRoutes = express.Router();

contractRoutes.get('/contracts', getAllContracts);

contractRoutes.get('/contracts/:id', getContractById);

contractRoutes.post('/contracts', createContract);

contractRoutes.put('/contracts/:id', updateContract);

contractRoutes.delete('/contracts:id', deleteContract);

