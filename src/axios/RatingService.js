import axios from "axios";
import Qs from "qs";

const API_URL = "http://localhost:9111/api/ratings";


export async function getAllRatingByUserId(userId, page = 0, size = 10) {
    return await axios.get(`${API_URL}/${userId}`);
}

export async function saveRating(data, token) {
    const headers = {
        Accept: "application/json",
        Authorization: "Bearer "+token
    };
    return await axios.post(`${API_URL}`, data, {headers})
}