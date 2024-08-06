import styles from "./Grid.module.css";
import { useEventsPage } from "../../../../../../state/context/ClientEventsPage";
import Card from "../Card/Card";
import GridSkeleton from "./GridSkeleton";

const EventsGrid = ({ excludeIds, maxCount }) => {
  const { eventsList, eventsLoading, eventsError } = useEventsPage();

  if (eventsLoading) return <GridSkeleton />;

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
      {eventsError && (
        <div className={styles.error}>
          {eventsError.data?.message ||
            eventsError.message ||
            "Error loading events"}
        </div>
      )}
    </div>
  );
};

export default EventsGrid;
