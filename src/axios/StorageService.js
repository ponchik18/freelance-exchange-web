import axios from "axios";

const API_URL = "http://localhost:9111/api/storage";


export async function getFile(path) {
    return await axios.get(`${API_URL}/download`, {
        params: {filePath: path},
        responseType: "blob",
    });
}