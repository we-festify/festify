import { createSlice } from "@reduxjs/toolkit";
import { login, register, refresh, logout } from "./authActions";

const initialState = {
  user: {},
  accessToken: null,
  isAdmin: false,
  isOrganiser: false,
  authLoading: false,
  authError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.authLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authLoading = false;
        const { accessToken, user } = action.payload;
        localStorage.setItem("festify-access-token", accessToken);
        state.isOrganiser = user.role === "organiser";
        state.isAdmin = user.role === "admin";
        state.user = user;
        state.accessToken = accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = action.error.message;
      })
      .addCase(register.pending, (state, action) => {
        state.authLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.authLoading = false;
        const { accessToken, user } = action.payload;
        localStorage.setItem("festify-access-token", accessToken);
        state.isOrganiser = user.role === "organiser";
        state.isAdmin = user.role === "admin";
        state.user = user;
        state.accessToken = accessToken;
      })
      .addCase(register.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = action.error.message;
      })
      .addCase(refresh.pending, (state, action) => {
        state.authLoading = true;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.authLoading = false;
        const { accessToken, user } = action.payload;
        localStorage.setItem("festify-access-token", accessToken);
        state.isOrganiser = user.role === "organiser";
        state.isAdmin = user.role === "admin";
        state.user = user;
        state.accessToken = accessToken;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = action.error.message;
        state.user = {};
        state.accessToken = null;
        state.isAdmin = false;
        state.isOrganiser = false;
      })
      .addCase(logout.pending, (state, action) => {
        state.authLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.authLoading = false;
        localStorage.removeItem("festify-access-token");
        state.user = {};
        state.accessToken = null;
        state.isAdmin = false;
        state.isOrganiser = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.authLoading = false;
        state.authError = action.error.message;
      });
  },
});

export const selectAccessToken = (state) => state.auth.accessToken;
export const selectAuthLoading = (state) => state.auth.authLoading;
export const selectAuthError = (state) => state.auth.authError;
export const selectUser = (state) => state.auth.user;
export const selectIsAdmin = (state) => state.auth.isAdmin;
export const selectIsOrganiser = (state) => state.auth.isOrganiser;
export default authSlice.reducer;
