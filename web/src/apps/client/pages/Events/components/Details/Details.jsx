import styles from "./Details.module.css";
import { Link, useLocation } from "react-router-dom";
import { useGetEventByIdQuery } from "../../../../../../state/redux/events/eventsApi";
import { formatDateTime } from "../../../../../../utils/time";
import useModal from "../../../../../../hooks/useModal/useModal";
import Registration from "../Registration/Registration";
import { useGetParticipationsBySelfQuery } from "../../../../../../state/redux/participants/participantsApi";
import Button from "../../../../atoms/Button";
import Timeline from "../../../../components/Timeline/Timeline";
import DetailsSkeleton from "./DetailsSkeleton";
import PurchaseEntryPass from "../PurchaseEntryPass/PurchaseEntryPass";
import { useGetEntryPassesBySelfQuery } from "../../../../../../state/redux/entryPass/entryPassApi";
import Image from "../../../../../../components/Image";
import EventRegistrationButton from "./EventRegistrationButton";
import PurchaseEntryPassButton from "./PurchaseEntryPassButton";
import { useMediaQuery } from "../../../../../../hooks/useMediaQuery";
import SubscribeEventNotificationsButton from "./SubscribeEventNotificationsButton";

const Details = () => {
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const location = useLocation();
  const eventId = location.pathname.split("/").pop();
  const { data: { event } = {}, isLoading } = useGetEventByIdQuery(eventId);
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

  const handleNavigateToRulebook = (e) => {
    e.preventDefault();
    if (event?.rulebookUrl) {
      window.open(event?.rulebookUrl, "_blank");
    }
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

      <div className={!isPortrait ? styles.section : ""}>
        <div className={styles.image}>
          <Image
            src={event?.image}
            alt={event?.name}
            blurHash={event?.imageBlurHash}
          />
          <div className={styles.info}>
            <h2 className={styles.name}>{event?.name}</h2>
            <SubscribeEventNotificationsButton key={eventId} />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.tags}>
          {event?.tags?.map((tag) => (
            <div className={styles.tag} key={tag}>
              #{tag}
            </div>
          ))}
        </div>
        <div className={styles.details}>
          <h2 className={styles.heading}>About</h2>
          <p className={styles.text}>{event?.summary}</p>
          <h2 className={styles.heading}>Important dates</h2>
          <div className={styles.other}>
            <div className={styles.item}>
              <p className={styles.key}>Starts</p>
              <p className={styles.value}>
                {formatDateTime(event?.startTime, {
                  skipYear: true,
                })}
              </p>
            </div>
            <div className={styles.item}>
              <p className={styles.key}>Ends</p>
              <p className={styles.value}>
                {formatDateTime(event?.endTime, {
                  skipYear: true,
                })}
              </p>
            </div>
            {event?.isRegistrationRequired && (
              <>
                <div className={styles.item}>
                  <p className={styles.key}>Registration Starts</p>
                  <p className={styles.value}>
                    {formatDateTime(event?.registrationsStart, {
                      skipYear: true,
                    })}
                  </p>
                </div>
                <div className={styles.item}>
                  <p className={styles.key}>Registration Ends</p>
                  <p className={styles.value}>
                    {formatDateTime(event?.registrationsEnd, {
                      skipYear: true,
                    })}
                  </p>
                </div>
              </>
            )}
            {event?.isEntryPassRequired && (
              <>
                <div className={styles.item}>
                  <p className={styles.key}>Entry Pass Distribution Starts</p>
                  <p className={styles.value}>
                    {formatDateTime(event?.entryPassDistributionStart, {
                      skipYear: true,
                    })}
                  </p>
                </div>
                <div className={styles.item}>
                  <p className={styles.key}>Entry Pass Distribution Ends</p>
                  <p className={styles.value}>
                    {formatDateTime(event?.entryPassDistributionEnd, {
                      skipYear: true,
                    })}
                  </p>
                </div>
              </>
            )}
          </div>
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
                    Entry Fees{" "}
                    {event?.entryPassPriceInINR > 0 ? "(in INR)" : ""}
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
          <div className={styles.actions}>
            {event?.isRegistrationRequired && (
              <EventRegistrationButton onClick={openRegistrationModal} />
            )}
            {event?.isEntryPassRequired && (
              <PurchaseEntryPassButton onClick={openPurchaseEntryPassModal} />
            )}
            {event?.rulebook && (
              <Button variant="link" onClick={handleNavigateToRulebook}>
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
    </div>
  );
};

export default Details;
