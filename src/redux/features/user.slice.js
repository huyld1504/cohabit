import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  rentHistory: [],
  favoriteList: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  initialState: initialState,
  name: 'user',
  reducers: {
    fetchUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.loading = false;
      state.profile = action.payload;
      state.error = null;
    },
    fetchUserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearUser(state) {
      state.profile = null;
      state.loading = false;
      state.error = null;
    }
  }
})

export const { fetchUserStart, fetchUserSuccess, fetchUserFailure, clearUser } = userSlice.actions;
export default userSlice;