import axios from "axios";

const API_URL = "http://localhost:9111/api/resumes";

export async function createResume(data, token) {
    const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + token
    };
    return await axios.post(`${API_URL}`, data, {headers})
}