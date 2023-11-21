import React from "react";
import styles from "./Grid.module.css";
import { useEventsPage } from "../../../../../../state/context/ClientEventsPage";
import Card from "../Card/Card";

const EventsGrid = () => {
  const { eventsList } = useEventsPage();
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {eventsList?.map((event) => (
          <Card key={event._id} event={event} />
        ))}
        {eventsList?.map((event) => (
          <Card key={event._id} event={event} />
        ))}
        {eventsList?.map((event) => (
          <Card key={event._id} event={event} />
        ))}
        {eventsList?.map((event) => (
          <Card key={event._id} event={event} />
        ))}
        {eventsList?.map((event) => (
          <Card key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsGrid;
