import React from "react";
import OrganiserSidebarProvider from "../../state/context/OrganiserSidebar";
import Layout from "./components/Layout/Layout";

const OrganiserPanelIndex = () => {
  return (
    <OrganiserSidebarProvider>
      <Layout />
    </OrganiserSidebarProvider>
  );
};

export default OrganiserPanelIndex;
