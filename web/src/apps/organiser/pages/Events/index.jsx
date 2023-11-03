import React from "react";
import { Route, Routes } from "react-router-dom";
import EventsList from "./EventsList";
import CreateEvent from "./CreateEvent";

const EventsIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<EventsList />} />
      <Route path="/create" element={<CreateEvent />} />
    </Routes>
  );
};

export default EventsIndex;
