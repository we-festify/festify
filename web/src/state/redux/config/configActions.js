import { createAsyncThunk } from "@reduxjs/toolkit";
import ConfigService from "../../../services/config";

export const getPermissions = createAsyncThunk(
  "config/getPermissions",
  async () => {
    try {
      const data = await ConfigService.getPermissions();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const configActions = {
  getPermissions,
};

export default configActions;
