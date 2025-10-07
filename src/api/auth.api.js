import {callAPI} from "./axios.instance.js";

const authAPIRoute = {
    login: '/Auth/login',
    register: '/Auth/register',
    refreshToken: '/Auth/refresh-token',
    logout: '/Auth/logout',
    sendOTP: '/Auth/send-otp',
    verifyOTP: '/Auth/verify-otp',
    changePassword: '/Auth/change-password',
    forgotPassword: '/Auth/forgot-password',
    revoke: '/Auth/revoke',
    roleAssign: '/Auth/role/assign',
}

export const authAPI = {
    login: async (credentials) => await callAPI('POST', authAPIRoute.login, credentials),
    register: async (credentials) => await callAPI('POST', authAPIRoute.register, credentials),
    refreshToken: async () => await callAPI('POST', authAPIRoute.refreshToken),
    logout: async () => await callAPI('POST', authAPIRoute.logout),
    sendOTP: async (params, data) => await callAPI('POST', authAPIRoute.sendOTP + params.toString(), data),
    verifyOTP: async (data) => await callAPI('POST', authAPIRoute.verifyOTP, data),
    changePassword: async (data) => await callAPI('POST', authAPIRoute.changePassword, data),
    forgotPassword: async (data) => await callAPI('POST', authAPIRoute.forgotPassword, data),
    revoke: async (params) => await callAPI('PATCH', authAPIRoute.revoke + params.toString()),
    roleAssign: async (data) => await callAPI('PATCH', authAPIRoute.roleAssign, data),
}