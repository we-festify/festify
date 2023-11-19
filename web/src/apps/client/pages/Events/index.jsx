import React from "react";
import MorphBackgroundDark from "../../../../components/MorphBackgroundDark/MorphBackgroundDark";
import Navbar from "../../components/Navbar/Navbar";
import EventsPageProvider from "../../../../state/context/ClientEventsPage";
import { Route, Routes } from "react-router-dom";
import EventsPage from "./EventsPage";

const EventsIndex = () => {
  return (
    <MorphBackgroundDark>
      <Navbar />
      <EventsPageProvider>
        <Routes>
          <Route path="/" element={<EventsPage />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </EventsPageProvider>
    </MorphBackgroundDark>
  );
};

export default EventsIndex;
