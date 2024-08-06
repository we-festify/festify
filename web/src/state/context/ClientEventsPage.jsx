import { createContext, useContext, useEffect, useState } from "react";
import { useGetAllEventsQuery } from "../redux/events/eventsApi";
import { useLocation, useNavigate } from "react-router-dom";
import { viewTransition } from "../../utils/view_transition";

const EventsPageContext = createContext();

export const useEventsPage = () => useContext(EventsPageContext);

const EventsPageProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    data: { events } = {},
    isSuccess: eventsSuccess,
    isLoading: eventsLoading,
    error: eventsError,
  } = useGetAllEventsQuery(`
  {
    events [{
      _id,
      name,
      image,
      summary,
      type,
      category,
      startTime,
      endTime,
      minTeamSize,
      imageBlurHash
    }]
  }
`);
  const [eventsList, setEventsList] = useState([]);
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suggestedEvents, setSuggestedEvents] = useState([]);
  const selectedCategory =
    new URLSearchParams(location.search).get("category") || "all";

  useEffect(() => {
    if (eventsSuccess) {
      const types = [...new Set(events.map((event) => event.type))];
      const categories = [...new Set(events.map((event) => event.category))];
      setTypes(types);
      setCategories(categories);
      setEventsList(events);
    }
  }, [eventsSuccess, events]);

  const searchByQuery = (query) => {
    if (query) {
      const filteredEvents = eventsList.filter((event) =>
        event.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestedEvents(filteredEvents.slice(0, 5));
    } else {
      setSuggestedEvents([]);
    }
  };

  const changeCategory = (category) => {
    viewTransition(() => {
      const params = new URLSearchParams(location.search);
      params.set("category", category);
      navigate(`?${params.toString()}`);
    });
  };

  useEffect(() => {
    if (!events) return;
    if (selectedCategory === "all") {
      setEventsList(events);
    } else {
      const filteredEvents = events.filter(
        (event) => event.category === selectedCategory
      );
      setEventsList(filteredEvents);
    }
  }, [selectedCategory, events]);

  const value = {
    types,
    categories,
    eventsList,
    eventsLoading,
    eventsError,
    suggestions: suggestedEvents.map((event) => ({
      id: event._id,
      name: event.name,
    })),
    searchByQuery,
    selectedCategory,
    changeCategory,
  };

  return (
    <EventsPageContext.Provider value={value}>
      {children}
    </EventsPageContext.Provider>
  );
};

export default EventsPageProvider;
