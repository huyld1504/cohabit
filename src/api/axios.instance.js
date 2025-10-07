import axios from "axios";
import queryString from 'query-string';
import { API_CONSTANTS } from "../constants/api.constant.js";
import { getToken, removeToken } from "../utils/token.store.util.js";

const baseURL = API_CONSTANTS.API_URL;

const axiosInstance = axios.create({
    baseURL: baseURL,
    paramsSerializer: {
        serialize: params => queryString.stringify(params)
    },
    withCredentials: true
});

axiosInstance.interceptors.request.use(async (config) => {
    const { token } = await getToken();
    return {
        ...config,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
}, (error) => {
    return Promise.reject(error?.response);
});

axiosInstance.interceptors.response.use((response) => {
    if (response?.data) return response.data;
    return response;
},
    async (error) => {
        // Only redirect on 401 if user is already logged in (has token)
        if (error?.response?.status === 401) {
            const { token } = await getToken();
            if (token) {
                // User has token but got 401 - redirect to login
                await removeToken();
                window.location.href = '/login';
            }
            // If no token, just return error (don't redirect during login attempt)
        }
        //refresh token here
        return Promise.reject(error?.response);
    }
);

const callAPI = (method, url, params) => {
    return axiosInstance({
        method,
        url,
        data: params,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const callAPIWithFormData = async (method, url, params) => {
    return axiosInstance({
        method,
        url,
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export {
    callAPI,
    callAPIWithFormData,
    axiosInstance
};