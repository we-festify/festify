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

export const getEvent = createAsyncThunk("events/getEvent", async (id) => {
  try {
    const data = await EventService.getEvent(id);
    return data;
  } catch (error) {
    throw error;
  }
});

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

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (event) => {
    try {
      const data = await EventService.createEvent(event);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ id, updatedEvent }) => {
    try {
      const data = await EventService.updateEvent(id, updatedEvent);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id) => {
    try {
      const data = await EventService.deleteEvent(id);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const eventsActions = {
  getAllEvents,
  getEvent,
  getEventsByType,
  createEvent,
  updateEvent,
  deleteEvent,
};
export default eventsActions;
