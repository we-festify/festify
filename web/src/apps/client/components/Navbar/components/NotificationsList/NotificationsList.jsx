import { useState } from "react";
import styles from "./NotificationsList.module.css";
import { useNavigate } from "react-router-dom";
import { useInAppNotifications } from "../../../../../../state/context/InAppNotifications";
import Tabs from "../../../Tabs/Tabs";
import { formatDateTimePassed } from "../../../../../../utils/time";

const NotificationsList = () => {
  const { unreadNotifications, allNotifications, markAsRead, markAllAsRead } =
    useInAppNotifications();
  const navigate = useNavigate();
  const [activeTabIndex, setActiveTab] = useState(0);

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification);
    }
    if (notification.url) {
      navigate(notification.url);
    }
  };

  const tabs = [
    {
      label: "New",
      notifications: unreadNotifications,
    },
    {
      label: "All",
      notifications: allNotifications,
    },
  ];

  return (
    <div className={styles.container}>
      <Tabs
        tabs={tabs}
        activeIndex={activeTabIndex}
        onTabChange={(index) => setActiveTab(index)}
      />
      <div className={styles.actions}>
        <div className={styles.action} onClick={markAllAsRead}>
          Mark all as read
        </div>
      </div>
      <div key={activeTabIndex} className={styles.notifications}>
        {tabs[activeTabIndex].notifications.map((notification, index) => (
          <div
            key={notification.title + index}
            className={styles.notification}
            onClick={() => handleNotificationClick(notification)}
          >
            <div className={styles.title}>
              {notification.title}
              {!notification.read && <div className={styles.dot}></div>}
            </div>
            <div className={styles.description}>{notification.body}</div>
            <div className={styles.description}>
              {formatDateTimePassed(notification.timestamp)}
            </div>
          </div>
        ))}
        {tabs[activeTabIndex].notifications.length < 1 && (
          <div className={styles.empty}>
            {activeTabIndex === 0
              ? "You have no new notifications"
              : "You have no notifications"}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsList;
