import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RiOrganizationChart } from "react-icons/ri";
import { FaUsers, FaRegHandshake } from "react-icons/fa";
import { MdKey, MdLocationPin } from "react-icons/md";

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
          path: "/admin/users/create",
        },
      ],
    },
    {
      text: "Organisations",
      path: "/admin/organisations",
      icon: <RiOrganizationChart />,
      sublinks: [
        {
          text: "Create",
          path: "/admin/organisations/create",
        },
      ],
    },
    {
      text: "Sponsors",
      path: "/admin/sponsors",
      icon: <FaRegHandshake />,
      sublinks: [
        {
          text: "Create",
          path: "/admin/sponsors/create",
        },
      ],
    },
    {
      text: "Location",
      path: "/admin/location",
      icon: <MdLocationPin />,
      sublinks: [
        {
          text: "Create",
          path: "/admin/location/markers/create",
        },
      ],
    },
    {
      text: "Permissions",
      path: "/admin/permissions",
      icon: <MdKey />,
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
        if (hasSublinkActive || link.path === location.pathname) {
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
