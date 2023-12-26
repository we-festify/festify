import React from "react";
import styles from "./NotificationBell.module.css";
import { IoNotifications } from "react-icons/io5";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import NotificationsList from "../NotificationsList/NotificationsList";
import { useInAppNotifications } from "../../../../../../state/context/InAppNotifications";

const NotificationBell = () => {
  const { unreadNotificationsCount } = useInAppNotifications();

  return (
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
  );
};

export default NotificationBell;
