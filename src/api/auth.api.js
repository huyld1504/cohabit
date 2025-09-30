import {callAPI} from "./axios.instance.js";

export const authAPI = {
    login: async (credentials) => await callAPI('POST', '/auth/login', credentials),
    register: async (credentials) => await callAPI('POST', '/auth/register', credentials)
}