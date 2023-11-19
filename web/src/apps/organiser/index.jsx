import React from "react";
import OrganiserSidebarProvider from "../../state/context/OrganiserSidebar";
import Layout from "./components/Layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrganiserPanelIndex = () => {
  return (
    <OrganiserSidebarProvider>
      <Layout />
      <ToastContainer />
    </OrganiserSidebarProvider>
  );
};

export default OrganiserPanelIndex;
