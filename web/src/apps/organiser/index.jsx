import OrganiserSidebarProvider from "../../state/context/OrganiserSidebar";
import Layout from "./components/Layout/Layout";
import ToastProvider from "./components/Toast";

const OrganiserPanelIndex = () => {
  return (
    <OrganiserSidebarProvider>
      <ToastProvider>
        <Layout />
      </ToastProvider>
    </OrganiserSidebarProvider>
  );
};

export default OrganiserPanelIndex;
