import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth.slice";
import userSlice from "./features/user.slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    // Add other reducers here
  }
});

export default store;