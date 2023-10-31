import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdHotelClass } from "react-icons/md";

const OrganiserSidebarContext = createContext();

export const useOrganiserSidebar = () => useContext(OrganiserSidebarContext);

const OrganiserSidebarProvider = ({ children }) => {
  const location = useLocation();
  const [links, setLinks] = useState([
    {
      text: "Dashboard",
      path: "/organiser",
      icon: <AiFillHome />,
    },
    {
      text: "Events",
      path: "/organiser/events",
      icon: <MdHotelClass />,
    },
  ]);
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    const newLinks = links.map((link) => {
      if (link.path === location.pathname) {
        return { ...link, active: true };
      }
      return { ...link, active: false };
    });

    setLinks(newLinks);
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const value = {
    links,
    activeLink,
  };

  return (
    <OrganiserSidebarContext.Provider value={value}>
      {children}
    </OrganiserSidebarContext.Provider>
  );
};

export default OrganiserSidebarProvider;
