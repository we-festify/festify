import { createAsyncThunk } from "@reduxjs/toolkit";
import EventService from "../../../services/event";

export const getAllEvents = createAsyncThunk(
  "events/getAllEvents",
  async () => {
    try {
      const data = await EventService.getAllEvents();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const getEventsByType = createAsyncThunk(
  "events/getEventsByType",
  async (type) => {
    try {
      const data = await EventService.getEventsByType(type);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const eventsActions = {
  getAllEvents,
  getEventsByType,
};
export default eventsActions;
