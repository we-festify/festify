import styles from "./../Events.module.css";
import { useGetEventByIdQuery } from "../../../../../state/redux/events/eventsApi";

const Details = ({ eventId }) => {
  const {
    data: { event } = {},
    isLoading,
    error,
  } = useGetEventByIdQuery(eventId);

  if (isLoading) return <p className={styles.loading}>Loading...</p>;

  if (error) return <p className={styles.error}>{JSON.stringify(error)}</p>;

  return (
    <div className={styles.details}>
      {Object.entries(event).map(([key, value]) => {
        return (
          <p key={key} className={styles.detail}>
            {key}
            <span>
              {typeof value === "string" ? value : JSON.stringify(value)}
            </span>
          </p>
        );
      })}
    </div>
  );
};

export default Details;
