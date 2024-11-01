import axios from "axios";
import {headerAuth} from "../helpers/authHeader";

const API_URL = "http://localhost:9111/api/users";

export async function registerUser(data) {
    return await axios.post(`${API_URL}`, data);
}

export async function getUserData(token) {
    const headers = {
        Accept: "application/json",
        Authorization: "Bearer "+token
    };
    return await axios.get(`${API_URL}`, {headers})
}