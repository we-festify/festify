import React from "react";
import styles from "./Card.module.css";
import { Link, useNavigate } from "react-router-dom";
import { formatDate, formatDateTime } from "../../../../../../../../utils/time";
import { IoMdShare } from "react-icons/io";
import { toast } from "react-toastify";
import { useMediaQuery } from "./../../../../../../../../hooks/useMediaQuery";
import { viewTransition } from "../../../../../../../../utils/view_transition";
import useModal from "../../../../../../../../hooks/useModal/useModal";
import DetailsModal from "../DetailsModal/DetailsModal";

const Card = ({ participation }) => {
  const { event, members } = participation;
  const leader = members.find((member) => member._id === participation.leader);
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const navigate = useNavigate();
  const [ParticipationDetailsModal, { open }] = useModal(DetailsModal, {
    participation,
  });

  const handleShareEvent = () => {
    if (navigator.share) {
      navigator
        .share({
          title: event.name,
          text: event.summary,
          url: `${window.location.origin}/events/${event._id}`,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard
        .writeText(`${window.location.origin}/events/${event._id}`)
        .then(() => {
          toast.success("Link copied to clipboard");
        });
    }
  };

  const handleViewDetails = () => {
    open();
  };

  const handleNavigateToEventDetails = () => {
    viewTransition(() => {
      navigate(`/events/${event._id}`, {
        state: { from: window.location.pathname },
      });
    });
  };

  return (
    <div className={styles.container}>
      <ParticipationDetailsModal />
      <div
        className={styles.imageCard}
        onClick={handleNavigateToEventDetails}
        style={{
          "--hero-card-transition-name": `hero-card-transition-${event._id}`,
          "--hero-title-transition-name": `hero-title-transition-${event._id}`,
        }}
      >
        <div className={styles.image}>
          <img src={event.image} alt={event.name} />
        </div>
        <div className={styles.top}>
          {participation.isTeam && (
            <div className={styles.badge + " " + styles.team}>team</div>
          )}
        </div>
        <div className={styles.bottom}>
          <h3 className={styles.name}>{event.name}</h3>
          <p className={styles.summary}>
            {event.summary?.trim().length > 100
              ? event.summary?.trim().slice(0, 100) + "..."
              : event.summary}
          </p>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.actions}>
          <div className={styles.action} onClick={handleShareEvent}>
            <IoMdShare />
          </div>
          <div className={styles.action} onClick={handleViewDetails}>
            View participation details
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
