import styles from "./Layout.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/Dashboard/Dashboard";
import EventsIndex from "../../pages/Events";
import Scanner from "../../pages/Scanner/Scanner";
import NotificationsIndex from "../../pages/Notifications";

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events/*" element={<EventsIndex />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/notifications/*" element={<NotificationsIndex />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
