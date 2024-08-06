import { useState } from "react";
import styles from "./Events.module.css";
import Card from "../../components/Card/Card";
import Details from "./components/Details";
import { useParams, useNavigate } from "react-router-dom";
import Tabs from "../../../../components/AdminCommons/Tabs/Tabs";
import ParticipationTable from "./components/ParticipationTable";
import { useGetEventsByOrganisationIdQuery } from "../../../../state/redux/events/eventsApi";
import { selectUser } from "../../../../state/redux/auth/authSlice";
import { useSelector } from "react-redux";
import { viewTransition } from "../../../../utils/view_transition";
import AnnouncementForm from "./components/AnnouncementForm";

const EventDetails = () => {
  const { eventId } = useParams();
  const { organisation } = useSelector(selectUser);
  const [activeTab, setActiveTab] = useState(0);
  const {
    data: { events } = {},
    isLoading,
    error,
  } = useGetEventsByOrganisationIdQuery(organisation);
  const navigate = useNavigate();

  const tabs = [
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
    {
      label: "Statistics",
      component: (
        <Card>
          <div className={styles.eventCard}>
            <h4 className={styles.title}>Event Statistics</h4>
            <p className={styles.subtitle}>
              Here you can see the statistics of the event.
            </p>
          </div>
        </Card>
      ),
    },
    {
      label: "Announcements",
      component: (
        <Card>
          <div className={styles.eventCard}>
            <h4 className={styles.title}>Announcements</h4>
            <p className={styles.subtitle}>
              Here you can post announcements regarding the event.
            </p>
            <AnnouncementForm
              defaultValue={{
                title: "",
                description: "",
              }}
            />
          </div>
        </Card>
      ),
    },
  ];

  const handleChangeEvent = (e) => {
    const id = e.target.value;
    if (!id) return;
    viewTransition(() => {
      navigate(`/organiser/events/details/${id}`);
    });
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {isLoading && <p className={styles.loading}>Loading...</p>}
        {error && <p className={styles.error}>{JSON.stringify(error)}</p>}
        {events && !events.length && (
          <select className={styles.selectEvent}>
            <option>No events found</option>
          </select>
        )}
        {events && events.length && (
          <select
            className={styles.selectEvent}
            value={eventId || ""}
            onChange={handleChangeEvent}
          >
            <option value="">Select an event</option>
            {events.map((event) => (
              <option key={event._id} value={event._id}>
                {event.name}
              </option>
            ))}
          </select>
        )}
        {eventId && (
          <>
            <Tabs
              tabs={tabs}
              activeIndex={activeTab}
              onTabChange={(index) => setActiveTab(index)}
            />
            {tabs[activeTab].component}
          </>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
