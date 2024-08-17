import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdHotelClass } from "react-icons/md";
import { BsQrCodeScan } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";

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
      sublinks: [
        {
          text: "Add Event",
          path: "/organiser/events/create",
        },
        {
          text: "Event Details",
          path: "/organiser/events/details",
        },
      ],
    },
    {
      text: "Notifications",
      path: "/organiser/notifications",
      icon: <IoMdNotifications />,
    },
    {
      text: "QR Scanner",
      path: "/organiser/scanner",
      icon: <BsQrCodeScan />,
    },
  ]);
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    const newLinks = links.map((link) => {
      if (link.sublinks) {
        let hasSublinkActive = false;
        const newSublinks = link.sublinks.map((sublink) => {
          if (sublink.path === location.pathname) {
            hasSublinkActive = true;
            return { ...sublink, active: true };
          }
          return { ...sublink, active: false };
        });
        if (link.path === location.pathname || hasSublinkActive) {
          return { ...link, active: true, sublinks: newSublinks };
        }
        return { ...link, active: false, sublinks: newSublinks };
      }
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
