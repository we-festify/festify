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
  const [activeTab, setActiveTab] = useState(0);

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
        activeIndex={activeTab}
        onTabChange={(index) => setActiveTab(index)}
      />
      <div className={styles.actions}>
        <div className={styles.action} onClick={markAllAsRead}>
          Mark all as read
        </div>
      </div>
      <div className={styles.notifications}>
        {tabs[activeTab].notifications.map((notification) => (
          <div
            key={notification.id}
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
        {tabs[activeTab].notifications.length < 1 && (
          <div className={styles.empty}>
            {activeTab === 0
              ? "You have no new notifications"
              : "You have no notifications"}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsList;
