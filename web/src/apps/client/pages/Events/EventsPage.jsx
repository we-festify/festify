import React from "react";
import styles from "./Events.module.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import EventsGrid from "./components/Grid/Grid";

const EventsPage = () => {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <EventsGrid />
      </div>
    </div>
  );
};

export default EventsPage;
