import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdHotelClass } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";

const ClientNavbarContext = createContext();

export const useClientNavbar = () => useContext(ClientNavbarContext);

export const ClientNavbarProvider = ({ children }) => {
  const location = useLocation();
  const [links, setLinks] = useState([
    {
      text: "Home",
      path: "/",
      icon: <AiFillHome />,
    },
    {
      text: "Events",
      path: "/events",
      icon: <MdHotelClass />,
      featureFlag: "EVENTS_PAGE",
    },
    {
      text: "Sponsors",
      path: "/sponsors",
      icon: <FaHandshake />,
      featureFlag: "SPONSORS_PAGE",
    },
    {
      text: "Location",
      path: "/location",
      icon: <MdLocationPin />,
      featureFlag: "LOCATION_PAGE",
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
    // update links
    setLinks(newLinks);
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const value = {
    links,
    activeLink,
  };

  return (
    <ClientNavbarContext.Provider value={value}>
      {children}
    </ClientNavbarContext.Provider>
  );
};

export default ClientNavbarProvider;
