import { fetchData } from '../database/postgres.js';
// barcha contactlarni olish
export async function getAllContracts(req, res) {
    try {
        const contracts = await fetchData("SELECT * FROM contract ORDER BY id;");
        res.send({
            message: "Success",
            data: contracts
        });
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving contracts",
            error: error.message
        });
    }
}
// get contract id boyicha
export async function getContractById(req, res) {
    try {
        const { id } = req.params;
        const contract = await fetchData("SELECT * FROM contract WHERE id = $1;", id);

        if (contract.length === 0) {
            return res.status(404).send({
                message: "Contract not found"
            });
        }

        res.send({
            message: "Success",
            data: contract
        });
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving contract",
            error: error.message
        });
    }
}
// contract yaratish 
export async function createContract(req, res) {
    try {
        const { order_id, customer_id, contract_date, monthly_payment, contract_type_id, contract_status, starting_payment_perc } = req.body;

        const newContract = await fetchData(
            "INSERT INTO contract (order_id, customer_id, contract_date, monthly_payment, contract_type_id, contract_status, starting_payment_perc) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
            order_id, customer_id, contract_date, monthly_payment, contract_type_id, contract_status, starting_payment_perc
        );

        res.status(201).send({
            message: "Contract created",
            data: newContract
        });
    } catch (error) {
        res.status(500).send({
            message: "Error creating contract",
            error: error.message
        });
    }
}
// contract yangilash
export async function updateContract(req, res) {
    try {
        const { order_id, customer_id, contract_date, monthly_payment, contract_type_id, contract_status, starting_payment_perc } = req.body;
        const { id } = req.params;

        const updatedContract = await fetchData(
            "UPDATE contract SET order_id = $1, customer_id = $2, contract_date = $3, monthly_payment = $4, contract_type_id = $5, contract_status = $6, starting_payment_perc = $7 WHERE id = $8 RETURNING *;",
            order_id, customer_id, contract_date, monthly_payment, contract_type_id, contract_status, starting_payment_perc, id
        );

        if (updatedContract.length === 0) {
            return res.status(404).send({
                message: "Contract not found"
            });
        }

        res.send({
            message: "Contract updated",
            data: updatedContract
        });
    } catch (error) {
        res.status(500).send({
            message: "Error updating contract",
            error: error.message
        });
    }
}
// contractni ochirish
export async function deleteContract(req, res) {
    try {
        const { id } = req.params;

        const deletedContract = await fetchData(
            "DELETE FROM contract WHERE id = $1 RETURNING *;",
            id
        );

        if (deletedContract.length === 0) {
            return res.status(404).send({
                message: "Contract not found"
            });
        }

        res.send({
            message: "Contract deleted",
            data: deletedContract
        });
    } catch (error) {
        res.status(500).send({
            message: "Error deleting contract",
            error: error.message
        });
    }
}
