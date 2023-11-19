import React from "react";
import Layout from "./components/Layout/Layout";
import AdminSidebarProvider from "../../state/context/AdminSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPanelIndex = () => {
  return (
    <AdminSidebarProvider>
      <Layout />
      <ToastContainer />
    </AdminSidebarProvider>
  );
};

export default AdminPanelIndex;
