import React from "react";
import styles from "./Details.module.css";
import { useLocation } from "react-router-dom";
import { useGetEventByIdQuery } from "../../../../../../state/redux/events/eventsApi";
import { formatDateTime } from "../../../../../../utils/time";

const Details = () => {
  const location = useLocation();
  const eventId = location.pathname.split("/").pop();
  const {
    data: { event } = {},
    isLoading,
    error,
  } = useGetEventByIdQuery(eventId);
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={event?.image} alt={event?.name} />
        <div className={styles.info}>
          <h2 className={styles.name}>{event?.name}</h2>
        </div>
      </div>
      <div className={styles.details}>
        <h2 className={styles.heading}>About</h2>
        <p className={styles.text}>{event?.summary}</p>
        <h2 className={styles.heading}>Registration date & time</h2>
        <p className={styles.text}>
          <span>Starts: </span>
          {formatDateTime(event?.registrationsStart)}
          <br />
          <span>Ends: </span>
          {formatDateTime(event?.registrationsEnd)}
        </p>
        <h2 className={styles.heading}>Details</h2>
        <p className={styles.text}>{event?.description}</p>
        <h2 className={styles.heading}>Timeline</h2>
        <div className={styles.timeline}>
          {event?.timeline?.map((item) => (
            <div
              className={
                styles.item +
                " " +
                (new Date(item.time) < new Date() ? styles.past : "")
              }
              key={item._id}
            >
              <p className={styles.desc}>{item.description}</p>
              <p className={styles.time}>{formatDateTime(item.time)}</p>
            </div>
          ))}
        </div>
        <h2 className={styles.heading}>Other Details</h2>
        <div className={styles.other}>
          <div className={styles.item}>
            <p className={styles.key}>Min Team Size</p>
            <p className={styles.value}>{event?.minTeamSize}</p>
          </div>
          <div className={styles.item}>
            <p className={styles.key}>Max Team Size</p>
            <p className={styles.value}>{event?.maxTeamSize}</p>
          </div>
          <div className={styles.item}>
            <p className={styles.key}>
              Entry Charges {event?.feesInINR > 0 ? "(in INR)" : ""}
            </p>
            <p className={styles.value}>
              {event?.feesInINR > 0 ? `₹ ${event?.feesInINR}` : "Free"}
            </p>
          </div>
          <div className={styles.item}>
            <p className={styles.key}>Venue</p>
            <p className={styles.value}>{event?.venue}</p>
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.secondary}>Register</button>
          {event?.rulebook && (
            <button
              className={styles.outline}
              onClick={() => window.open(event?.rulebook, "_blank")}
            >
              Rulebook
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
