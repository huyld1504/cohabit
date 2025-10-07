import { callAPI } from "./axios.instance";

const PROFILE_API_BASE = {
  GET_PROFILE: '/Profile',
  UPDATE_PROFILE: '/Profile',
  CHANGE_PASSWORD: '/Profile/ChangePassword',
};

export const profileApi = {
  getProfile: async () => callAPI('GET', PROFILE_API_BASE.GET_PROFILE),
  updateProfile: async (profileData) => callAPI('PUT', PROFILE_API_BASE.UPDATE_PROFILE, profileData),
  changePassword: async (passwordData) => callAPI('POST', PROFILE_API_BASE.CHANGE_PASSWORD, passwordData),
}