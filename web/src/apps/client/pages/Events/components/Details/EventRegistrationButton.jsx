import { useLocation } from "react-router-dom";
import { useGetEventByIdQuery } from "../../../../../../state/redux/events/eventsApi";
import { viewTransition } from "../../../../../../utils/view_transition";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsVerified,
} from "../../../../../../state/redux/auth/authSlice";
import { useGetParticipationsBySelfQuery } from "../../../../../../state/redux/participants/participantsApi";
import Button from "../../../../atoms/Button";

const EventRegistrationButton = ({ onClick }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isVerified = useSelector(selectIsVerified);
  const location = useLocation();
  const eventId = location.pathname.split("/").pop();
  const { data: { event } = {} } = useGetEventByIdQuery(eventId);
  const today = new Date();
  const { data: { participations } = {} } = useGetParticipationsBySelfQuery();
  const isRegistered = participations?.some(
    (participation) => participation.event?._id === eventId
  );

  const handleRegister = (e) => {
    e.preventDefault();
    if (onClick instanceof Function) onClick();
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
    <>
      {event?.isRegistrationRequired &&
        (!isLoggedIn ? (
          <Button variant="secondary" onClick={handleNavigateToLogin}>
            Login to Participate
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
            Registrations Not Started
          </Button>
        ) : new Date(event?.registrationsEnd) < today ? (
          <Button variant="secondary" disabled>
            Registration Ended
          </Button>
        ) : (
          <Button variant="secondary" onClick={handleRegister}>
            Participate
          </Button>
        ))}
    </>
  );
};

export default EventRegistrationButton;
