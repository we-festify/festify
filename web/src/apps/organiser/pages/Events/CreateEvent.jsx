import React, { useEffect, useState } from "react";
import styles from "./Events.module.css";
import Card from "../../components/Card/Card";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../state/redux/auth/authSlice";
import { useCreateEventMutation } from "../../../../state/redux/events/eventsApi";
import EventForm from "./components/EventForm";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const CreateEvent = () => {
  const user = useSelector(selectUser);
  const organisationId = user.organisation;
  const [event, setEvent] = useState({
    name: "",
    type: "",
    venue: "",
    summary: "",
    description: "",
    image: "",
    organisation: organisationId,
    timeline: [],
  });
  const [createEvent, { error, isSuccess, isLoading }] =
    useCreateEventMutation();

  const handleSubmit = () => {
    console.log(event);
    createEvent(event);
  };

  useEffect(() => {
    if (isSuccess) {
      setEvent({
        name: "",
        type: "",
        venue: "",
        summary: "",
        description: "",
        image: "",
        organisation: organisationId,
        timeline: [],
      });
    }
  }, [isSuccess]);

  return (
    <div className={styles.page}>
      <Card>
        <div className={styles.createEventCard}>
          <h4 className={styles.title}>Event Details</h4>
          <p className={styles.subtitle}>
            Enter the details of the event you want to create.
          </p>
          <EventForm
            defaultValue={event}
            onSubmit={handleSubmit}
            onChange={(event) => setEvent(event)}
          />
        </div>
      </Card>
      <LoadingSpinner isLoading={isLoading} fullScreen={true} />
    </div>
  );
};

export default CreateEvent;
