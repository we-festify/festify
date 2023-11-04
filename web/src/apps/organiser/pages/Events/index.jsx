import React from "react";
import { Route, Routes } from "react-router-dom";
import EventsList from "./EventsList";
import CreateEvent from "./CreateEvent";
import EditEvent from "./EditEvent";

const EventsIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<EventsList />} />
      <Route path="/create" element={<CreateEvent />} />
      <Route path="/edit/:id" element={<EditEvent />} />
    </Routes>
  );
};

export default EventsIndex;
