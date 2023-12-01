import React from "react";
import styles from "./Events.module.css";
import Header from "./components/Header/Header";
import CategoriesSidebar from "./components/Sidebar/Sidebar";
import EventsGrid from "./components/Grid/Grid";
import { useMediaQuery } from "./../../../../hooks/useMediaQuery";

const EventsPage = () => {
  const isPortrait = useMediaQuery("(orientation: portrait)");
  return (
    <div className={styles.page}>
      <Header />
      {isPortrait && <CategoriesSidebar />}
      <div className={styles.content}>
        {!isPortrait && <CategoriesSidebar />}
        <EventsGrid />
      </div>
    </div>
  );
};

export default EventsPage;
