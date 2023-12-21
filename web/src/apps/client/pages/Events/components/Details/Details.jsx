import React from "react";
import styles from "./Details.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetEventByIdQuery } from "../../../../../../state/redux/events/eventsApi";
import { formatDateTime } from "../../../../../../utils/time";
import { viewTransition } from "../../../../../../utils/view_transition";
import useModal from "../../../../../../hooks/useModal/useModal";
import Registration from "../Registration/Registration";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsVerified,
} from "../../../../../../state/redux/auth/authSlice";
import { useGetParticipationsBySelfQuery } from "../../../../../../state/redux/participants/participantsApi";
import Button from "../../../../atoms/Button";
import Timeline from "../../../../components/Timeline/Timeline";
import DetailsSkeleton from "./DetailsSkeleton";
import PurchaseEntryPass from "../PurchaseEntryPass/PurchaseEntryPass";
import { useGetEntryPassesBySelfQuery } from "../../../../../../state/redux/entryPass/entryPassApi";
import Image from "../../../../../../components/Image";

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
  const [RegistrationModal, { open: openRegistrationModal }] =
    useModal(Registration);
  const [PurchaseEntryPassModal, { open: openPurchaseEntryPassModal }] =
    useModal(PurchaseEntryPass);
  const { data: { participations } = {} } = useGetParticipationsBySelfQuery();
  const isRegistered = participations?.some(
    (participation) => participation.event?._id === eventId
  );
  const { data: { entryPasses } = {} } = useGetEntryPassesBySelfQuery();
  const hasEntryPass = entryPasses?.some(
    (entryPass) =>
      entryPass.event === eventId || entryPass.event?._id === eventId
  );

  const handleRegister = (e) => {
    e.preventDefault();
    openRegistrationModal();
  };

  const handlePurchaseEntryPass = (e) => {
    e.preventDefault();
    openPurchaseEntryPassModal();
  };

  const handleNavigateToRulebook = (e) => {
    e.preventDefault();
    if (event?.rulebook) {
      window.open(event?.rulebook, "_blank");
    }
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

  if (isLoading) {
    return <DetailsSkeleton />;
  }

  return (
    <div
      className={styles.container}
      style={{
        "--hero-image-transition-name": `hero-card-transition-${eventId}`,
        "--hero-title-transition-name": `hero-title-transition-${eventId}`,
      }}
    >
      <RegistrationModal event={event} />
      <PurchaseEntryPassModal event={event} />
      <div className={styles.image}>
        <Image
          src={event?.image}
          alt={event?.name}
          blurHash={event?.imageBlurHash}
        />
        <div className={styles.info}>
          <h2 className={styles.name}>{event?.name}</h2>
        </div>
      </div>
      <div className={styles.details}>
        <h2 className={styles.heading}>About</h2>
        <p className={styles.text}>{event?.summary}</p>
        {event?.isRegistrationRequired && (
          <>
            <h2 className={styles.heading}>Registration date & time</h2>
            <p className={styles.text}>
              <span>Starts: </span>
              {formatDateTime(event?.registrationsStart)}
              <br />
              <span>Ends: </span>
              {formatDateTime(event?.registrationsEnd)}
            </p>
          </>
        )}
        {event?.isEntryPassRequired && (
          <>
            <h2 className={styles.heading}>Entry Pass Distribution</h2>
            <p className={styles.text}>
              <span>Starts: </span>
              {formatDateTime(event?.entryPassDistributionStart)}
              <br />
              <span>Ends: </span>
              {formatDateTime(event?.entryPassDistributionEnd)}
            </p>
          </>
        )}
        <h2 className={styles.heading}>Details</h2>
        <p className={styles.text}>{event?.description}</p>
        <h2 className={styles.heading}>Timeline</h2>
        <Timeline
          timeline={event?.timeline?.map((item) => ({
            time: item.time,
            title: item.description,
            subtitle: item.venue,
          }))}
        />
        <h2 className={styles.heading}>Other Details</h2>
        <div className={styles.other}>
          {event?.isRegistrationRequired && (
            <>
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
                  Registration Fees{" "}
                  {event?.registrationFeesInINR > 0 ? "(in INR)" : ""}
                </p>
                <p className={styles.value}>
                  {event?.registrationFeesInINR > 0
                    ? `₹ ${event?.registrationFeesInINR}`
                    : "Free"}
                </p>
              </div>
            </>
          )}
          {event?.isEntryPassRequired && (
            <>
              <div className={styles.item}>
                <p className={styles.key}>Total Entry Passes</p>
                <p className={styles.value}>
                  {event?.totalEntryPasses === 0
                    ? "Enough"
                    : event?.totalEntryPasses}
                </p>
              </div>
              <div className={styles.item + " " + styles.price}>
                <p className={styles.key}>
                  Entry Fees {event?.entryPassPriceInINR > 0 ? "(in INR)" : ""}
                </p>
                <p className={styles.value}>
                  {event?.entryPassPriceInINR > 0
                    ? `₹ ${event?.entryPassPriceInINR}`
                    : "Free"}
                </p>
              </div>
            </>
          )}
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
          {event?.isRegistrationRequired &&
            (!isLoggedIn ? (
              <Button variant="secondary" onClick={handleNavigateToLogin}>
                Login to Register
              </Button>
            ) : !isVerified ? (
              <Button variant="secondary" onClick={handleNavigateToProfile}>
                Verify Email
              </Button>
            ) : isRegistered ? (
              <Button variant="success" disabled>
                Registered
              </Button>
            ) : new Date(event?.registrationsStart) > today ? (
              <Button variant="secondary" disabled>
                Registration Not Started
              </Button>
            ) : new Date(event?.registrationsEnd) < today ? (
              <Button variant="secondary" disabled>
                Registration Ended
              </Button>
            ) : (
              <Button variant="secondary" onClick={handleRegister}>
                Register
              </Button>
            ))}
          {event?.isEntryPassRequired &&
            (!isLoggedIn ? (
              <Button variant="secondary" onClick={handleNavigateToLogin}>
                Login to Get Pass
              </Button>
            ) : !isVerified ? (
              <Button variant="secondary" onClick={handleNavigateToProfile}>
                Verify Email
              </Button>
            ) : hasEntryPass ? (
              <Button variant="success" disabled>
                Entry Pass Purchased
              </Button>
            ) : new Date(event?.entryPassDistributionStart) >
              today ? null : new Date(event?.entryPassDistributionEnd) <
              today ? null : (
              <Button variant="secondary" onClick={handlePurchaseEntryPass}>
                Get Entry Pass
              </Button>
            ))}
          {event?.rulebook && (
            <Button
              variant="outline-secondary"
              onClick={handleNavigateToRulebook}
            >
              Rulebook
            </Button>
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
        {hasEntryPass && (
          <p className={styles.note}>
            You have already purchased an entry pass for this event. You can
            view your entry pass details in the{" "}
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
