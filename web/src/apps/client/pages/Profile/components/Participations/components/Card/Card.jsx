import styles from "./Card.module.css";
import { useNavigate } from "react-router-dom";
import { IoMdShare } from "react-icons/io";
import { AiOutlineQrcode } from "react-icons/ai";
import { viewTransition } from "../../../../../../../../utils/view_transition";
import useModal from "../../../../../../../../hooks/useModal/useModal";
import ParticipationDetails from "../ParticipationDetails/ParticipationDetails";
import EntryPassDetails from "../EntryPassDetails/EntryPassDetails";
import { toast } from "../../../../../../components/Toast";

const Card = ({ participation, entryPass }) => {
  const navigate = useNavigate();
  const [ParticipationDetailsModal, { open: openParticipationDetails }] =
    useModal(ParticipationDetails);
  const [EntryPassDetailsModal, { open: openEntryPassDetails }] =
    useModal(EntryPassDetails);

  let event = participation?.event;
  if (!event) event = entryPass?.event;

  if (!event) return null;

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

  const handleViewParticipationDetails = () => {
    openParticipationDetails();
  };

  const handleViewEntryPassDetails = () => {
    openEntryPassDetails();
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
      <ParticipationDetailsModal participation={participation} />
      <EntryPassDetailsModal entryPass={entryPass} />
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
          {participation?.isTeam && (
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
          {participation && (
            <div
              className={styles.action}
              onClick={handleViewParticipationDetails}
            >
              Participation details
            </div>
          )}
          {entryPass && (
            <div className={styles.action} onClick={handleViewEntryPassDetails}>
              <AiOutlineQrcode />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
