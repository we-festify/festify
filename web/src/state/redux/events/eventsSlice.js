import { createSlice } from "@reduxjs/toolkit";
import {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByType,
} from "./eventsActions";

const initialState = {
  event: {}, // single event
  events: [], // array of events
  eventsLoading: false,
  eventsError: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEvents.pending, (state, action) => {
        state.eventsLoading = true;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.eventsLoading = false;
        state.events = action.payload;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.eventsLoading = false;
        state.eventsError = action.error.message;
      })
      .addCase(getEvent.pending, (state, action) => {
        state.eventsLoading = true;
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.eventsLoading = false;
        state.event = action.payload;
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.eventsLoading = false;
        state.eventsError = action.error.message;
      })
      .addCase(getEventsByType.pending, (state, action) => {
        state.eventsLoading = true;
      })
      .addCase(getEventsByType.fulfilled, (state, action) => {
        state.eventsLoading = false;
        state.events = action.payload;
      })
      .addCase(getEventsByType.rejected, (state, action) => {
        state.eventsLoading = false;
        state.eventsError = action.error.message;
      })
      .addCase(createEvent.pending, (state, action) => {
        state.eventsLoading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.eventsLoading = false;
        state.events = action.payload;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.eventsLoading = false;
        state.eventsError = action.error.message;
      })
      .addCase(updateEvent.pending, (state, action) => {
        state.eventsLoading = true;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.eventsLoading = false;
        state.events = action.payload;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.eventsLoading = false;
        state.eventsError = action.error.message;
      })
      .addCase(deleteEvent.pending, (state, action) => {
        state.eventsLoading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.eventsLoading = false;
        state.events = action.payload;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.eventsLoading = false;
        state.eventsError = action.error.message;
      });
  },
});

export const selectEvents = (state) => state.events.events;
export const selectEventsLoading = (state) => state.events.eventsLoading;
export const selectEventsError = (state) => state.events.eventsError;

export default eventsSlice.reducer;
