import React from "react";
import styles from "./EventDetailsLayout.module.css";
import Details from "../Details/Details";
import EventsGrid from "../Grid/Grid";

const EventDetailsLayout = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.left}>
            <Details />
          </div>
          <div className={styles.right}>
            <h2 className={styles.title}>More Events</h2>
            <EventsGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsLayout;
