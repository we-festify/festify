import { createSlice } from "@reduxjs/toolkit";
import { getAllEvents, getEventsByType } from "./eventsActions";

const initialState = {
  events: [],
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
      });
  },
});

export const selectEvents = (state) => state.events.events;
export const selectEventsLoading = (state) => state.events.eventsLoading;
export const selectEventsError = (state) => state.events.eventsError;

export default eventsSlice.reducer;
