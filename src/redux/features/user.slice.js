import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  loading: true, // Add loading state
  rentHistory: [],
  favoriteList: [],
};

const userSlice = createSlice({
  initialState: initialState,
  name: 'user',
  reducers: {
    setUserProfile(state, action) {
      state.profile = action.payload.profile || action.payload;
      state.loading = false; // Set loading to false when profile is loaded
    },
    setRentHistory(state, action) {
      state.rentHistory = action.payload.rentHistory || action.payload;
    },
    setFavoriteList(state, action) {
      state.favoriteList = action.payload.favoriteList || action.payload;
    },
    setProfileLoading(state, action) {
      state.loading = action.payload;
    },
    clearUserData(state) {
      state.profile = null;
      state.loading = true;
      state.rentHistory = [];
      state.favoriteList = [];
    }
  }
});

export const { setUserProfile, setRentHistory, setFavoriteList, setProfileLoading, clearUserData } = userSlice.actions;
export default userSlice;