import React from "react";
import styles from "./Layout.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/Dashboard/Dashboard";
import EventsIndex from "../../pages/Events";

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events/*" element={<EventsIndex />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
