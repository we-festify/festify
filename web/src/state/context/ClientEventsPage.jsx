import React, { createContext, useContext, useEffect, useState } from "react";
import { useGetAllEventsQuery } from "../redux/events/eventsApi";
import { useSearchParams } from "react-router-dom";

const EventsPageContext = createContext();

export const useEventsPage = () => useContext(EventsPageContext);

const EventsPageProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: { events } = {}, isSuccess: eventsSuccess } =
    useGetAllEventsQuery();
  const [eventsList, setEventsList] = useState([]);
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suggestedEvents, setSuggestedEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (eventsSuccess) {
      const types = [...new Set(events.map((event) => event.type))];
      const categories = [...new Set(events.map((event) => event.category))];
      setTypes(types);
      setCategories(categories);
      setEventsList(events);
      setSuggestedEvents(events.slice(0, 5));
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
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("All");
    }
  }, [searchParams]);

  useEffect(() => {
    if (!events) return;
    if (selectedCategory === "All") {
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
