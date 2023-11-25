import React from "react";
import styles from "./Grid.module.css";
import { useEventsPage } from "../../../../../../state/context/ClientEventsPage";
import Card from "../Card/Card";

const EventsGrid = ({ excludeIds, maxCount }) => {
  const { eventsList } = useEventsPage();
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {eventsList
          ?.filter((event) => !excludeIds?.includes(event._id))
          .slice(0, maxCount)
          .map((event) => (
            <Card key={event._id} event={event} />
          ))}
      </div>
    </div>
  );
};

export default EventsGrid;
