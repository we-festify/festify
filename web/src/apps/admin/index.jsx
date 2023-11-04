import React from "react";
import Layout from "./components/Layout/Layout";
import AdminSidebarProvider from "../../state/context/AdminSidebar";

const AdminPanelIndex = () => {
  return (
    <AdminSidebarProvider>
      <Layout />
    </AdminSidebarProvider>
  );
};

export default AdminPanelIndex;
