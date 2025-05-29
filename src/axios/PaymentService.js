import axios from "axios";

const API_URL = "http://localhost:9111/api/payments";


export async function createPayment(data,token) {

    const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + token
    };

    return await axios.post(`${API_URL}/create-payment`, data, {headers});
}

export async function getBalance(freelancerId,token) {

    const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + token
    };

    return await axios.get(`${API_URL}/balance/${freelancerId}`,  {headers});
}

export async function getTransactionHistory(freelancerId, token) {

    const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + token
    };

    return await axios.get(`${API_URL}/transaction/history/${freelancerId}`,  {headers});
}

export async function getCustomerTransactionHistory(customerId, token) {

    const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + token
    };

    return await axios.get(`${API_URL}/transaction/history/customer/${customerId}`,  {headers});
}

export async function createPayout(data,token) {

    const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + token
    };

    return await axios.post(`${API_URL}/create-payout`, data, {headers});
}