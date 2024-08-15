import { useLocation } from "react-router-dom";
import { useGetEventByIdQuery } from "../../../../../../state/redux/events/eventsApi";
import { viewTransition } from "../../../../../../utils/view_transition";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsVerified,
} from "../../../../../../state/redux/auth/authSlice";
import Button from "../../../../atoms/Button";
import { useGetEntryPassesBySelfQuery } from "../../../../../../state/redux/entryPass/entryPassApi";

const PurchaseEntryPassButton = ({ onClick }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isVerified = useSelector(selectIsVerified);
  const location = useLocation();
  const eventId = location.pathname.split("/").pop();
  const { data: { event } = {} } = useGetEventByIdQuery(eventId);
  const today = new Date();
  const { data: { entryPasses } = {} } = useGetEntryPassesBySelfQuery();
  const hasEntryPass = entryPasses?.some(
    (entryPass) =>
      entryPass.event === eventId || entryPass.event?._id === eventId
  );

  const handlePurchaseEntryPass = (e) => {
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
        ) : new Date(event?.entryPassDistributionStart) > today ? (
          <span className="text-muted-foreground">
            Entry Pass Distribution Not Started
          </span>
        ) : new Date(event?.entryPassDistributionEnd) < today ? (
          <span className="text-muted-foreground">
            Entry Pass Distribution Ended
          </span>
        ) : (
          <Button variant="secondary" onClick={handlePurchaseEntryPass}>
            Get Entry Pass
          </Button>
        ))}
    </>
  );
};

export default PurchaseEntryPassButton;
