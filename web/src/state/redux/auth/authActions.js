import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../../services/auth";

export const login = createAsyncThunk("auth/login", async (user) => {
  try {
    const data = await AuthService.login(user);
    return data;
  } catch (error) {
    throw error;
  }
});

export const register = createAsyncThunk("auth/register", async (user) => {
  try {
    const data = await AuthService.register(user);
    return data;
  } catch (error) {
    throw error;
  }
});

export const refresh = createAsyncThunk("auth/refresh", async () => {
  try {
    const data = await AuthService.refresh();
    return data;
  } catch (error) {
    throw error;
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const data = await AuthService.logout();
    return data;
  } catch (error) {
    throw error;
  }
});

const authActions = {
  login,
  register,
  refresh,
  logout,
};

export default authActions;
