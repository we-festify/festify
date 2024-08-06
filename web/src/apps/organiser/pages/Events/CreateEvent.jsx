import { useEffect, useState } from "react";
import styles from "./Events.module.css";
import Card from "../../components/Card/Card";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../state/redux/auth/authSlice";
import { useCreateEventMutation } from "../../../../state/redux/events/eventsApi";
import EventForm from "./components/EventForm";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "../../components/Toast";

const CreateEvent = () => {
  const user = useSelector(selectUser);
  const organisationId = user.organisation;
  const [event, setEvent] = useState({
    organisation: organisationId,
    timeline: [],
  });
  const [createEvent, { error, isSuccess, isLoading }] =
    useCreateEventMutation();

  const handleSubmit = () => {
    toast.promise(createEvent(event), {
      loading: "Creating event...",
      success: "Event created successfully!",
      error: "Error creating event.",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setEvent({
        organisation: organisationId,
        timeline: [],
      });
    }
  }, [isSuccess, organisationId]);

  return (
    <div className={styles.page}>
      <Card>
        <div className={styles.eventCard}>
          <h4 className={styles.title}>Event Details</h4>
          <p className={styles.subtitle}>
            Enter the details of the event you want to create.
            {error && <p className={styles.error}>{error?.data?.message}</p>}
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
