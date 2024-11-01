import axios from "axios";

const API_URL = "http://localhost:9111/api/proposals";

export async function createProposal(data, token) {
    const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + token
    };
    return await axios.post(`${API_URL}`, data, {headers})
}

export async function rejectProposal(proposalId, token) {
    const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + token
    };
    return await axios.patch(`${API_URL}/reject/${proposalId}`, {}, {headers})
}

export async function approveProposal(proposalId, token) {
    const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + token
    };
    return await axios.patch(`${API_URL}/accept/${proposalId}`, {}, {headers})
}