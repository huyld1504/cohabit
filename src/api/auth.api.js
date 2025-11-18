import { callAPI } from "./axios.instance.js";
import { getToken } from "../utils/token.store.util.js";

const authAPIRoute = {
    login: '/v1/Auth/login',
    register: '/v1/Auth/register',
    refreshToken: '/v1/Auth/refresh-token',
    logout: '/v1/Auth/logout',
    sendOTP: '/v1/Auth/send-otp',
    verifyOTP: '/v1/Auth/verify-otp',
    changePassword: '/v1/Auth/change-password',
    forgotPassword: '/v1/Auth/forgot-password',
    revoke: '/v1/Auth/revoke',
    roleAssign: '/v1/Auth/role/assign',
};

export const authAPI = {
    login: async (credentials) => await callAPI('POST', authAPIRoute.login, credentials),
    register: async (credentials) => await callAPI('POST', authAPIRoute.register, credentials),
    refreshToken: async () => await callAPI('POST', authAPIRoute.refreshToken),
    logout: async () => {
        // Get tokens using utility function
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        // Try different approaches to send tokens
        const { axiosInstance } = await import('./axios.instance.js');

        const requestConfig = {
            method: 'POST',
            url: authAPIRoute.logout,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        // Try multiple ways to send tokens
        if (token && refreshToken) {
            requestConfig.headers['Cookie'] = `token=${token}; refreshToken=${refreshToken}`;

            requestConfig.headers['X-Access-Token'] = token;
            requestConfig.headers['X-Refresh-Token'] = refreshToken;

            requestConfig.data = {
                token: token,
                refreshToken: refreshToken
            };
        }

        console.log('Request config:', requestConfig);
        return axiosInstance(requestConfig);
    },
    sendOTP: async (data) => {
        const params = new URLSearchParams({
            email: data.email,
            phoneNumber: data.phoneNumber
        });
        const urlWithParams = `${authAPIRoute.sendOTP}?${params.toString()}`;
        return callAPI('POST', urlWithParams);
    },
    verifyOTP: async (data) => await callAPI('POST', authAPIRoute.verifyOTP, data),
    changePassword: async (data) => await callAPI('POST', authAPIRoute.changePassword, data),
    forgotPassword: async (data) => await callAPI('POST', authAPIRoute.forgotPassword, data),
    revoke: async (params) => await callAPI('PATCH', authAPIRoute.revoke + params.toString()),
    roleAssign: async (data) => await callAPI('PATCH', authAPIRoute.roleAssign, data),
};