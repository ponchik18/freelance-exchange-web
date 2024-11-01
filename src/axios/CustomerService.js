import axios from "axios";

const API_URL = "http://localhost:9111/api/customers";

export async function getAllCustomers(page = 0, size = 10) {
    return await axios.get(`${API_URL}?pageNumber=${page}&elementsPerPage=${size}`)
}

export async function getCustomerById(customerId) {
    return await axios.get(`${API_URL}/${customerId}`)
}

export async function updateCustomer(data, userId, token) {
    const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + token
    };
    return await axios.put(`${API_URL}/${userId}`, data, {headers})
}