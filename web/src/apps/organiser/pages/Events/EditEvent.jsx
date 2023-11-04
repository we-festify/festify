import React, { useEffect, useState } from "react";
import styles from "./Events.module.css";
import Card from "../../components/Card/Card";
import {
  useGetEventByIdQuery,
  useUpdateEventMutation,
} from "../../../../state/redux/events/eventsApi";
import EventForm from "./components/EventForm";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useLocation } from "react-router-dom";

const EditEvent = () => {
  const location = useLocation();
  const eventId = location.pathname.split("/").pop();
  const {
    data: initialEventData,
    isLoading: initialEventLoading,
    isSuccess: initialEventSuccess,
  } = useGetEventByIdQuery(eventId);
  const [updateEvent, { error, isLoading }] = useUpdateEventMutation();
  const [event, setEvent] = useState(initialEventData?.event);

  const handleSubmit = () => {
    updateEvent(event);
  };

  useEffect(() => {
    if (initialEventSuccess) {
      setEvent(initialEventData?.event);
    }
  }, [initialEventSuccess]);

  return (
    <div className={styles.page}>
      <Card>
        <div className={styles.createEventCard}>
          <h4 className={styles.title}>Event Details</h4>
          <p className={styles.subtitle}>
            Enter the details of the event you want to edit.
          </p>
          {event && (
            <EventForm
              defaultValue={event}
              onSubmit={handleSubmit}
              onChange={(event) => setEvent(event)}
            />
          )}
        </div>
      </Card>
      <LoadingSpinner
        isLoading={isLoading || initialEventLoading}
        fullScreen={true}
      />
    </div>
  );
};

export default EditEvent;
