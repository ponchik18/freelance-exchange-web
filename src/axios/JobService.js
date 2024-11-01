import axios from "axios";
import Qs from "qs";

const API_URL = "http://localhost:9111/api/jobs";

const paramsSerializer = (params) => {
    const parts = [];

    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((val) => {
                parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
            });
        } else {
            parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }
    });

    return parts.join('&');
};

export async function getAllJobs(params={}, page = 0, size = 10) {
    params.pageNumber = page;
    params.elementsPerPage = size;

    return await axios.get(`${API_URL}`, {
        params: params,
        paramsSerializer: paramsSerializer
    });
}

export async function getAllJobsForCustomer(userId) {
    return await axios.get(`${API_URL}/customer/${userId}`)
}

export async function uploadJob(data, token) {
    const headers = {
        Accept: "application/json",
        Authorization: "Bearer "+token
    };
    return await axios.post(`${API_URL}`, data, {headers})
}

export async function getJobById(jobId) {
    return await axios.get(`${API_URL}/${jobId}`)
}

export async function startJob(jobId, token) {
    const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + token
    };
    return await axios.put(`${API_URL}/start/${jobId}`, {}, {headers})
}

export async function finishJob(jobId,data, token) {
    const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + token
    };
    return await axios.put(`${API_URL}/finish/${jobId}`, data, {headers})
}