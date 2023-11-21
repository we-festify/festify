import React, { useEffect, useState } from "react";
import styles from "./Events.module.css";
import Card from "../../components/Card/Card";
import {
  useGetEventByIdQuery,
  useUpdateEventMutation,
} from "../../../../state/redux/events/eventsApi";
import Form from "./components/Form";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const EditEvent = () => {
  const location = useLocation();
  const eventId = location.pathname.split("/").pop();
  const {
    data: { event: initialEvent } = {},
    isLoading: initialEventLoading,
    isSuccess: initialEventSuccess,
  } = useGetEventByIdQuery(eventId);
  const [updateEvent, { error }] = useUpdateEventMutation();
  const [event, setEvent] = useState(initialEvent);

  const handleSubmit = () => {
    toast.promise(updateEvent(event), {
      pending: "Updating event...",
      success: "Event updated successfully.",
      error: "Error updating event.",
    });
  };

  useEffect(() => {
    if (initialEventSuccess) {
      setEvent(initialEvent);
    }
  }, [initialEventSuccess, initialEvent]);

  return (
    <div className={styles.page}>
      <Card>
        <div className={styles.eventCard}>
          <h4 className={styles.title}>Event Details</h4>
          <p className={styles.subtitle}>
            Enter the details of the event you want to edit.
            {error && <p className={styles.error}>{error?.data?.message}</p>}
          </p>
          <Form
            key={event?._id}
            defaultValue={event}
            onChange={setEvent}
            onSubmit={handleSubmit}
          />
        </div>
      </Card>
      <LoadingSpinner isLoading={initialEventLoading} fullScreen={true} />
    </div>
  );
};

export default EditEvent;
