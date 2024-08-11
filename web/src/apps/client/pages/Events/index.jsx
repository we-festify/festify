import Navbar from "../../components/Navbar/Navbar";
import EventsPageProvider from "../../../../state/context/ClientEventsPage";
import { Route, Routes } from "react-router-dom";
import EventsPage from "./EventsPage";
import FixedBackdrop from "../../../../components/FixedBackdrop/FixedBackdrop";
import EventDetailsLayout from "./components/EventDetailsLayout/EventDetailsLayout";
import BannersProvider from "../../../../state/context/Banners";

const EventsIndex = () => {
  return (
    <FixedBackdrop>
      <Navbar />
      <BannersProvider>
        <EventsPageProvider>
          <Routes>
            <Route path="/" element={<EventsPage />} />
            <Route path="/timeline" element={<EventsPage />} />
            <Route path="/:id" element={<EventDetailsLayout />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </EventsPageProvider>
      </BannersProvider>
    </FixedBackdrop>
  );
};

export default EventsIndex;
