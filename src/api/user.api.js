import { callAPI } from "./axios.instance";

const USER_API_ROUTES = {
  GET_ALL_USERS: '/v1/Auth/users/paging',
};
export const userAPI = {
  getAllUsers: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `${USER_API_ROUTES.GET_ALL_USERS}?${queryParams}` : USER_API_ROUTES.GET_ALL_USERS;
    return callAPI('GET', url);
  }
};