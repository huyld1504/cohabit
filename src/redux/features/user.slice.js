import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  rentHistory: [],
  favoriteList: [],
};

const userSlice = createSlice({
  initialState: initialState,
  name: 'user',
  reducers: {
    setUserProfile(state, action) {
      state.profile = action.payload.profile || action.payload;
    },
    setRentHistory(state, action) {
      state.rentHistory = action.payload.rentHistory || action.payload;
    },
    setFavoriteList(state, action) {
      state.favoriteList = action.payload.favoriteList || action.payload;
    },
    clearUserData(state) {
      state.profile = {};
      state.rentHistory = [];
      state.favoriteList = [];
    }
  }
});

export const { setUserProfile, setRentHistory, setFavoriteList, clearUserData } = userSlice.actions;
export default userSlice;