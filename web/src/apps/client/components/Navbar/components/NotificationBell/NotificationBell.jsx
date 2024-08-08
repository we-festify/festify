import styles from "./NotificationBell.module.css";
import { IoNotifications } from "react-icons/io5";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import NotificationsList from "../NotificationsList/NotificationsList";
import { useInAppNotifications } from "../../../../../../state/context/InAppNotifications";
import RequireFeatureFlag from "../../../../../../components/features/FeatureFlag";

const NotificationBell = () => {
  const { unreadNotificationsCount } = useInAppNotifications();

  return (
    <RequireFeatureFlag name="IN_APP_NOTIFICATIONS_BELL">
      <Dropdown
        button={
          <div className={styles.container}>
            <IoNotifications className={styles.icon} />
            {unreadNotificationsCount > 0 && (
              <div className={styles.badge}>{unreadNotificationsCount}</div>
            )}
          </div>
        }
      >
        <NotificationsList />
      </Dropdown>
    </RequireFeatureFlag>
  );
};

export default NotificationBell;
