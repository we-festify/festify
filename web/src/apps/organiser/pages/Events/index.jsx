import { Route, Routes } from "react-router-dom";
import EventsList from "./EventsList";
import CreateEvent from "./CreateEvent";
import EditEvent from "./EditEvent";
import EventDetails from "./EventDetails";

const EventsIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<EventsList />} />
      <Route path="/create" element={<CreateEvent />} />
      <Route path="/edit/:id" element={<EditEvent />} />
      <Route path="/details" element={<EventDetails />}>
        <Route path=":eventId" element={<EventDetails />} />
      </Route>
    </Routes>
  );
};

export default EventsIndex;
