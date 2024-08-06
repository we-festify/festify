import Navbar from "../../components/Navbar/Navbar";
import EventsPageProvider from "../../../../state/context/ClientEventsPage";
import { Route, Routes } from "react-router-dom";
import EventsPage from "./EventsPage";
import FixedBackdrop from "../../../../components/FixedBackdrop/FixedBackdrop";
import EventDetailsLayout from "./components/EventDetailsLayout/EventDetailsLayout";

const EventsIndex = () => {
  return (
    <FixedBackdrop>
      <Navbar />
      <EventsPageProvider>
        <Routes>
          <Route path="/" element={<EventsPage />} />
          <Route path="/timeline" element={<EventsPage />} />
          <Route path="/:id" element={<EventDetailsLayout />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </EventsPageProvider>
    </FixedBackdrop>
  );
};

export default EventsIndex;
