import React from "react";
import styles from "./Details.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetEventByIdQuery } from "../../../../../../state/redux/events/eventsApi";
import { formatDateTime } from "../../../../../../utils/time";
import { MdChevronLeft } from "react-icons/md";
import { viewTransition } from "../../../../../../utils/view_transition";
import useModal from "../../../../../../hooks/useModal/useModal";
import Registration from "../Registration/Registration";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsVerified,
} from "../../../../../../state/redux/auth/authSlice";
import { useGetParticipationsBySelfQuery } from "../../../../../../state/redux/participants/participantsApi";

const Details = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isVerified = useSelector(selectIsVerified);
  const location = useLocation();
  const eventId = location.pathname.split("/").pop();
  const {
    data: { event } = {},
    isLoading,
    error,
  } = useGetEventByIdQuery(eventId);
  const navigate = useNavigate();
  const today = new Date();
  const [RegistrationModal, { open }] = useModal(Registration);
  const { data: { participations } = {} } = useGetParticipationsBySelfQuery();
  const isRegistered = participations?.some(
    (participation) => participation.event?._id === eventId
  );

  const handleRegister = (e) => {
    e.preventDefault();
    open();
  };

  const handleNavigateToRulebook = (e) => {
    e.preventDefault();
    if (event?.rulebook) {
      window.open(event?.rulebook, "_blank");
    }
  };

  const handleGoBack = () => {
    viewTransition(() => {
      const from = location.state?.from;
      navigate(from || "/events", { replace: true });
    });
  };

  const handleNavigateToLogin = () => {
    viewTransition(() => {
      navigate("/a/login", {
        state: { from: location.pathname },
      });
    });
  };

  const handleNavigateToProfile = () => {
    viewTransition(() => {
      navigate("/profile");
    });
  };

  return (
    <div
      className={styles.container}
      style={{
        "--hero-image-transition-name": `hero-card-transition-${eventId}`,
        "--hero-title-transition-name": `hero-title-transition-${eventId}`,
      }}
    >
      <RegistrationModal event={event} />
      <div className={styles.back} onClick={handleGoBack}>
        <MdChevronLeft /> Back
      </div>
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
                (new Date(item.time) < today ? styles.past : "")
              }
              key={item._id}
            >
              <p className={styles.desc}>{item.description}</p>
              <p className={styles.time}>
                {formatDateTime(item.time)} <span>({item.venue})</span>
              </p>
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
          <div className={styles.item + " " + styles.price}>
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
        <h2 className={styles.heading}>Tags</h2>
        <div className={styles.tags}>
          {event?.tags?.map((tag) => (
            <div className={styles.tag} key={tag}>
              {tag}
            </div>
          ))}
        </div>
        <div className={styles.actions}>
          {!isLoggedIn ? (
            <button
              className={styles.secondary}
              onClick={handleNavigateToLogin}
            >
              Login to Register
            </button>
          ) : !isVerified ? (
            <button
              className={styles.secondary}
              onClick={handleNavigateToProfile}
            >
              Verify Email to Register
            </button>
          ) : isRegistered ? (
            <button className={styles.registered} disabled>
              Registered
            </button>
          ) : new Date(event?.registrationsStart) > today ? (
            <button className={styles.secondary} disabled>
              Registration Not Started
            </button>
          ) : new Date(event?.registrationsEnd) < today ? (
            <button className={styles.secondary} disabled>
              Registration Closed
            </button>
          ) : (
            <button className={styles.secondary} onClick={handleRegister}>
              Register
            </button>
          )}
          {event?.rulebook && (
            <button
              className={styles.outline}
              onClick={handleNavigateToRulebook}
            >
              Rulebook
            </button>
          )}
        </div>
        {isRegistered && (
          <p className={styles.note}>
            You have already registered for this event. You can view your
            participation details in the{" "}
            <Link to="/profile" className={styles.link}>
              Profile
            </Link>{" "}
            section.
          </p>
        )}
      </div>
    </div>
  );
};

export default Details;
