import React from "react";
import styles from "./EventDetailsLayout.module.css";
import Details from "../Details/Details";
import EventsGrid from "../Grid/Grid";
import { useLocation } from "react-router-dom";

const EventDetailsLayout = () => {
  const location = useLocation();
  const eventId = location.pathname.split("/").pop();
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.left}>
            <Details />
          </div>
          <div className={styles.right}>
            <h2 className={styles.title}>More Events</h2>
            <EventsGrid excludeIds={[eventId]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsLayout;
