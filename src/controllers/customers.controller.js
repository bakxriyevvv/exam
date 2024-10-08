import { fetchData } from '../database/postgres.js';

// barcha customerlarni olish
export async function getAllCustomers(req, res) {
        const customers = await fetchData("SELECT * FROM customers;");
        res.send({
            message: "Success",
            data: customers
        });
}
// get customer id boyicha
export async function getCustomerById(req, res) {
        const { id } = req.params;
        const customer = await fetchData("SELECT * FROM customers WHERE id = $1;", id);
        if (customer.length === 0) {
            return res.status(404).send({
                message: "Customer not found"
            });
        }
        res.send({
            message: "Success",
            data: customer
        });
}
// customer yaratish
export async function createCustomer(req, res) {
        const { full_name, email,phone_number,password,image_url } = req.body;
        const newCustomer = await fetchData(
            "INSERT INTO customers (full_name, email, phone_number,password,image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
            full_name, email, phone_number,password,image_url
        );
        res.status(201).send({
            message: "Customer created",
            data: newCustomer
        });
}

// cutomerni yangilash
export async function updateCustomer(req, res) {
        const {  full_name, email,phone_number,password,image_url } = req.body;
        const { id } = req.params;
        const updatedCustomer = await fetchData(
            "UPDATE customers SET full_name = $1, email = $2, phone_number = $3,password = $4,image_url = $5 WHERE id = $6 RETURNING *;",
            full_name, email,phone_number,password,image_url, id
        );
        if (updatedCustomer.length === 0) {
            return res.status(404).send({
                message: "Customer not found"
            });
        }
        res.send({
            message: "Customer updated",
            data: updatedCustomer
        });
}
// customerni ochirish
export async function deleteCustomer(req, res) {
        const { id } = req.params;
        const deletedCustomer = await fetchData(
            "DELETE FROM customers WHERE id = $1 RETURNING *;",
            id
        );
        if (deletedCustomer.length === 0) {
            return res.status(404).send({
                message: "Customer not found"
            });
        }
        res.send({
            message: "Customer deleted",
            data: deletedCustomer
        });
}
