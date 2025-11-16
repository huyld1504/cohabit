import { callAPI } from "./axios.instance";

const ORDER_API_BASE = {
  CREATE_ORDER: (postId) => `/Order?postId=${postId}`,
  GET_HISTORY_POST: '/Order/user',
  GET_OWNER_ORDERS: '/Order/owner'
};

export const orderApi = {
  createOrder: async (postId) => callAPI('POST', ORDER_API_BASE.CREATE_ORDER(postId)),
  getHistoryPosts: async () => callAPI('GET', ORDER_API_BASE.GET_HISTORY_POST),
  getOwnerOrders: async (currentPage = 1, pageSize = 10) => {
    const params = new URLSearchParams({
      currentPage: currentPage.toString(),
      pageSize: pageSize.toString()
    });
    return callAPI('GET', `${ORDER_API_BASE.GET_OWNER_ORDERS}?${params}`);
  }
};