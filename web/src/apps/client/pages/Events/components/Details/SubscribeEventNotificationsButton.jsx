import styles from "./Details.module.css";
import { useLocation } from "react-router-dom";
import { useGetEventByIdQuery } from "../../../../../../state/redux/events/eventsApi";

const SubscribeEventNotificationsButton = () => {
  const location = useLocation();
  const eventId = location.pathname.split("/").pop();
  const { data: { event } = {} } = useGetEventByIdQuery(eventId);

  return <div>SubscribeEventNotificationsButton</div>;
};

export default SubscribeEventNotificationsButton;
