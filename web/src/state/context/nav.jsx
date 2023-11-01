import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdHotelClass } from "react-icons/md";

const NavContext = React.createContext();

export const useNav = () => React.useContext(NavContext);

export const NavProvider = ({ children }) => {
  const location = useLocation();
  const [links, setLinks] = React.useState([
    {
      text: "Home",
      path: "/",
      icon: <AiFillHome />,
    },
    {
      text: "Events",
      path: "/events",
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
    // update links
    setLinks(newLinks);
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const value = {
    links,
    activeLink,
  };

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};

export default NavProvider;
