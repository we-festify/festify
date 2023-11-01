import { createSlice } from "@reduxjs/toolkit";
import { getPermissions } from "./configActions";

const initialState = {
  permissions: {},
  configLoading: false,
  configError: null,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setPermissions(state, action) {
      state.permissions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPermissions.pending, (state, action) => {
        state.configLoading = true;
      })
      .addCase(getPermissions.fulfilled, (state, action) => {
        state.configLoading = false;
        state.permissions = action.payload;
      })
      .addCase(getPermissions.rejected, (state, action) => {
        state.configLoading = false;
        state.configError = action.error.message;
      });
  },
});

export const { setPermissions } = configSlice.actions;

export const selectPermissions = (state) => state.config.permissions;
export const selectConfigLoading = (state) => state.config.configLoading;
export const selectConfigError = (state) => state.config.configError;

export default configSlice.reducer;
