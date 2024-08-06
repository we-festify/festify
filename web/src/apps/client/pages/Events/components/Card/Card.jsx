import { useState } from "react";
import styles from "./Card.module.css";
import { useNavigate } from "react-router-dom";
import { viewTransition } from "../../../../../../utils/view_transition";
import Image from "../../../../../../components/Image";

const Card = ({ event = {} }) => {
  const { name, image, summary, minTeamSize, imageBlurHash } = event;
  const [badge, setBadge] = useState(minTeamSize > 1 ? "team" : null);
  const navigate = useNavigate();

  const handleNavigateToEventDetails = () => {
    viewTransition(() => {
      navigate(`/events/${event._id}`);
    });
  };

  return (
    <div
      className={styles.card}
      onClick={handleNavigateToEventDetails}
      style={{
        "--hero-card-transition-name": `hero-card-transition-${event._id}`,
        "--hero-title-transition-name": `hero-title-transition-${event._id}`,
      }}
    >
      <div className={styles.image}>
        <Image src={image} alt={name} blurHash={imageBlurHash} />
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
    </div>
  );
};

export default Card;
