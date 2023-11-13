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
      sublinks: [
        {
          text: "Add User",
          path: "/admin/users/add",
        },
      ],
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
      if (link.sublinks) {
        const newSublinks = link.sublinks.map((sublink) => {
          if (sublink.path === location.pathname) {
            return { ...sublink, active: true };
          }
          return { ...sublink, active: false };
        });
        if (link.path === location.pathname) {
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
    <AdminSidebarContext.Provider value={value}>
      {children}
    </AdminSidebarContext.Provider>
  );
};

export default AdminSidebarProvider;
