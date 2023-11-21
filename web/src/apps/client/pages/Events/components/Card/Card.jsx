import React, { useState } from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ event }) => {
  const { name, image, summary, minTeamSize } = event;
  const [badge, setBadge] = useState(minTeamSize > 1 ? "team" : null);

  return (
    <Link to={`/events/${event._id}`} className={styles.card}>
      <div className={styles.image}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.top}>
        {badge && (
          <div className={styles.badge + " " + styles[badge]}>{badge}</div>
        )}
      </div>
      <div className={styles.bottom}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.summary}>{summary}</p>
      </div>
    </Link>
  );
};

export default Card;
