import axios from "axios";

const API_URL = "http://localhost:9111/api/chats";

export async function getChat(firstUserId, secondUserId, token) {
    const headers = {
        Authorization: "Bearer " + token
    };
    return await axios.get(`${API_URL}/${firstUserId}/${secondUserId}`, {headers})
}

export async function sendMessage(data, token) {
    const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + token
    };
    return await axios.post(`${API_URL}/message`, data,{headers})
}