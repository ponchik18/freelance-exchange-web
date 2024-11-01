import axios from "axios";

const API_URL = "http://localhost:9111/api/skills";

export async function getAllSkillsNotForFreelancer(userId) {
    return await axios.get(`${API_URL}/not-selected/freelancer/${userId}`)
}

export async function getAllSkills() {
    return await axios.get(`${API_URL}`)
}

export async function addSkill(data, token) {
    const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + token
    };
    return await axios.post(`${API_URL}`, data,{headers})
}

export async function getAllSkillsForFreelancer(freelancerId) {
    return await axios.get(`${API_URL}/freelancer/${freelancerId}`)
}

export async function addSkillToFreelancer(userId, skillId, token) {
    const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + token
    };
    return await axios.post(`${API_URL}/freelancer/${userId}/${skillId}`, {},{headers})
}

export async function deleteSkillToFreelancer(userId, skillId, token) {
    const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + token
    };
    return await axios.delete(`${API_URL}/freelancer/${userId}/${skillId}`, {headers})
}