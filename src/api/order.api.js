import { callAPI } from "./axios.instance";

const ORDER_API_BASE = {
  CREATE_ORDER: (postId) => `/Order?postId=${postId}`
};

export const orderApi = {
  createOrder: async (postId) => callAPI('POST', ORDER_API_BASE.CREATE_ORDER(postId))
};