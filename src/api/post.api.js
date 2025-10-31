import { callAPI, callAPIWithFormData } from "./axios.instance.js";
import { API_CONSTANTS } from "../constants/api.constant.js";

const POST_API_ROUTES = {
    CREATE_POST: '/Post',
    GET_POSTS: '/Post',
    GET_ADMIN_POST: '/Post/admin',
    GET_USER_POSTS: '/Post/user/all',
    GET_PUBLIC_USER_POST: '/Post/user/public',
    HIDDEN_POST: (postId) => `Post/user/${postId}/hidden`,
    UPDATE_STATUS_POST: (postId, status) => `Post/user/${postId}/${status}`,
    GET_POST_DETAIL: (postId) => `Post/${postId}`,
    UPDATE_POST: (postId) => `Post/${postId}`,
    UPDATE_FURNITURE: (postId) => `Post/furniture/${postId}`,
    SEARCH_POSTS: (params) => {
        return `/Post/search?${params}`;
    }
};

export const postApi = {
    createPost: async (postData) => callAPIWithFormData('POST', POST_API_ROUTES.CREATE_POST, postData),
    getPosts: async () => {
        return callAPI('GET', POST_API_ROUTES.GET_POSTS);
    },
    getAdminPost: async (params) => callAPI('GET', POST_API_ROUTES.GET_ADMIN_POST, params),
    getAllUserPost: async (params) => callAPI('GET', POST_API_ROUTES.GET_USER_POSTS, params),
    getPublicUserPost: async (params) => callAPI('GET', POST_API_ROUTES.GET_PUBLIC_USER_POST, params),
    hidePost: async (postId) => callAPI('PATCH', POST_API_ROUTES.HIDDEN_POST(postId)),
    updateStatusPost: async (postId, status) => callAPI('PATCH', POST_API_ROUTES.UPDATE_STATUS_POST(postId, status)),
    getPostDetail: async (postId) => callAPI('GET', POST_API_ROUTES.GET_POST_DETAIL(postId)),
    updatePost: async (postId, postData) => callAPIWithFormData('PUT', POST_API_ROUTES.UPDATE_POST(postId), postData),
    updatePostInfo: async (postId, postInfo) => callAPI('PUT', POST_API_ROUTES.UPDATE_POST(postId), postInfo),
    updateFurniture: async (postId, furnitureData) => callAPIWithFormData('PATCH', POST_API_ROUTES.UPDATE_FURNITURE(postId), furnitureData),
    searchPost: async (params) => {
        const paramsURL = new URLSearchParams(params).toString();
        return callAPI('GET', POST_API_ROUTES.SEARCH_POSTS(paramsURL));
    }
};