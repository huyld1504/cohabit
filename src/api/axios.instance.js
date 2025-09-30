import axios from "axios";
import queryString from 'query-string';
import {API_CONSTANTS} from "../constants/api.constant.js";
import {getToken, removeToken} from "../utils/token.store.util.js";

const baseURL = API_CONSTANTS.API_URL || 'http://localhost:8080';
const {token} = getToken();
const axiosInstance = axios.create({
    baseURL,
    paramsSerializer: {
        serialize: params => queryString.stringify(params)
    },
    withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
    return {
        ...config,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
        if (response?.data) return response.data;
        return response;
    },
    async (error) => {
        if (error?.response?.status === 401) {
            await removeToken();
            window.location.href = '/login';
        }
        //refresh token here
        return Promise.reject(error);
    }
);

const callAPI = (method, url, params) => {
    return axiosInstance({
        method,
        url,
        params: params,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const callAPIWithFormData = async (method, url, params) => {
    return axiosInstance({
        method,
        url,
        params: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export {
    callAPI,
    callAPIWithFormData,
    axiosInstance
}