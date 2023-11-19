import React, { useState } from "react";
import styles from "./Card.module.css";

const Card = ({ event }) => {
  const { name, image, summary, timeline } = event;
  const [badge, setBadge] = useState("upcoming");

  if (timeline) {
    const startDate = new Date(timeline[0].time);
    const endDate = new Date(timeline[timeline.length - 1].time);
    const current = new Date();
    setBadge(
      current < startDate
        ? "upcoming"
        : current > endDate
        ? "completed"
        : "ongoing"
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.top}>
        <div className={styles.badge + " " + styles[badge]}>{badge}</div>
      </div>
      <div className={styles.bottom}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.summary}>{summary}</p>
      </div>
    </div>
  );
};

export default Card;
