import { callAPI } from "./axios.instance";

const PAYMENT_API_ROUTES = {
  CREATE_PAYMENT: '/v1/Payment/create',
  GET_PAYMENT_BY_ID: (id) => `/v1/Payment/${id}`,
  GET_ALL_PAYMENTS: '/v1/Payment/all',
}

export const paymentAPI = {
  createPayment: async (paymentData) => callAPI('POST', PAYMENT_API_ROUTES.CREATE_PAYMENT, paymentData),
  getPaymentById: async (id) => callAPI('GET', PAYMENT_API_ROUTES.GET_PAYMENT_BY_ID(id)),
  getAllPayments: async () => callAPI('GET', PAYMENT_API_ROUTES.GET_ALL_PAYMENTS)
}