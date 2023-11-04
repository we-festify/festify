import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RiOrganizationChart } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";

const AdminSidebarContext = createContext();

export const useAdminSidebar = () => useContext(AdminSidebarContext);

const AdminSidebarProvider = ({ children }) => {
  const location = useLocation();
  const [links, setLinks] = useState([
    {
      text: "Dashboard",
      path: "/admin",
      icon: <AiFillHome />,
    },
    {
      text: "Users",
      path: "/admin/users",
      icon: <FaUsers />,
    },
    {
      text: "Organisations",
      path: "/admin/organisations",
      icon: <RiOrganizationChart />,
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
    <AdminSidebarContext.Provider value={value}>
      {children}
    </AdminSidebarContext.Provider>
  );
};

export default AdminSidebarProvider;
