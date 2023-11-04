import React, { createContext, useContext, useEffect, useState } from "react";
import { useGetAllEventsQuery } from "../redux/events/eventsApi";

const EventsPageContext = createContext();

export const useEventsPage = () => useContext(EventsPageContext);

const EventsPageProvider = ({ children }) => {
  const { data: eventsData, isSuccess: eventsSuccess } = useGetAllEventsQuery();
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (eventsSuccess) {
      const { events } = eventsData;
      const types = [...new Set(events.map((event) => event.type))];
      setTypes(types);
    }
  }, [eventsSuccess]);

  const value = {
    types,
  };

  return (
    <EventsPageContext.Provider value={value}>
      {children}
    </EventsPageContext.Provider>
  );
};

export default EventsPageProvider;
