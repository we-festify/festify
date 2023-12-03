import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import EventsPageProvider from "../../../../state/context/ClientEventsPage";
import { Route, Routes } from "react-router-dom";
import EventsPage from "./EventsPage";
import EventDetails from "./EventDetails";
import FixedBackdrop from "../../../../components/FixedBackdrop/FixedBackdrop";

const EventsIndex = () => {
  return (
    <FixedBackdrop>
      <Navbar />
      <EventsPageProvider>
        <Routes>
          <Route path="/" element={<EventsPage />} />
          <Route path="/timeline" element={<EventsPage />} />
          <Route path="/:id" element={<EventDetails />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </EventsPageProvider>
    </FixedBackdrop>
  );
};

export default EventsIndex;
