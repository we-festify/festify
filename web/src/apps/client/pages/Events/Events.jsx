import React from "react";
import styles from "./Events.module.css";
import MorphBackgroundDark from "./../../../../components/MorphBackgroundDark/MorphBackgroundDark";
import Navbar from "../../components/Navbar/Navbar";
import EventsPageProvider from "../../../../state/context/EventsPage";

const Events = () => {
  return (
    <MorphBackgroundDark>
      <Navbar />
      <EventsPageProvider>
        <div className={styles.events}>
          <h1>Events</h1>
        </div>
      </EventsPageProvider>
    </MorphBackgroundDark>
  );
};

export default Events;
