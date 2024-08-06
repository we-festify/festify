import Layout from "./components/Layout/Layout";
import AdminSidebarProvider from "../../state/context/AdminSidebar";
import ToastProvider from "./components/Toast";

const AdminPanelIndex = () => {
  return (
    <AdminSidebarProvider>
      <ToastProvider>
        <Layout />
      </ToastProvider>
    </AdminSidebarProvider>
  );
};

export default AdminPanelIndex;
