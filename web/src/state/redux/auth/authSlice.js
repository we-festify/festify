import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  isAdmin: false,
  isLoggedIn: false,
  isOrganiser: false,
  isVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { accessToken, user } = action.payload;
      state.isOrganiser = user.role === "organiser" && user.organisation;
      state.isAdmin = user.role === "admin";
      state.user = user;
      state.accessToken = accessToken;
      state.isLoggedIn = true;
      state.isVerified = user.isVerified;
    },
    clearCredentials(state, action) {
      state.user = null;
      state.accessToken = null;
      state.isAdmin = false;
      state.isOrganiser = false;
      state.isLoggedIn = false;
      state.isVerified = false;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const selectAccessToken = (state) => state.auth.accessToken;
export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsAdmin = (state) => state.auth.isAdmin;
export const selectIsOrganiser = (state) => state.auth.isOrganiser;
export const selectIsVerified = (state) => state.auth.isVerified;

export const { setCredentials, clearCredentials, setUser } = authSlice.actions;

export default authSlice.reducer;
