import React from "react";
import styles from "./Events.module.css";
import Card from "../../components/Card/Card";
import Details from "./components/Details";
import { useLocation } from "react-router-dom";
import Tabs from "../../../../components/AdminCommons/Tabs/Tabs";
import ParticipationTable from "./components/ParticipationTable";

const EventDetails = () => {
  const location = useLocation();
  const eventId = location.pathname.split("/").pop();

  return (
    <div className={styles.page}>
      <Tabs
        items={[
          {
            label: "Details",
            component: (
              <Card>
                <div className={styles.eventCard}>
                  <h4 className={styles.title}>Event Details</h4>
                  <p className={styles.subtitle}>
                    Here you can see the details of the event.
                  </p>
                  <Details eventId={eventId} />
                </div>
              </Card>
            ),
          },
          {
            label: "Participants",
            component: (
              <Card>
                <div className={styles.eventCard}>
                  <ParticipationTable eventId={eventId} />
                </div>
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
};

export default EventDetails;
