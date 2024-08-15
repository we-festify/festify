import { createContext, useContext, useEffect, useState } from "react";
import { InAppNotification } from "../../services/local-db";
import { messaging } from "../../config/firebase";
import { onMessage } from "firebase/messaging";

const InAppNotificationsContext = createContext(null);

export const useInAppNotifications = () =>
  useContext(InAppNotificationsContext);

const InAppNotificationsProvider = ({ children }) => {
  const [newNotifications, setNewNotifications] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);

  useEffect(() => {
    InAppNotification.find({ read: false }).then((notifications) => {
      setNewNotifications(notifications.map((notif) => notif.toJSON()));
    });

    InAppNotification.find()
      .then((notifications) => {
        setAllNotifications(notifications.map((notif) => notif.toJSON()));
      })
      .catch((err) => {
        console.error(err);
      });

    // fcm notification
    onMessage(messaging, (payload) => {
      if (!payload.notification) return; // ignore messages without notification
      try {
        const notif = {
          title: payload.notification?.title,
          body: payload.notification?.body,
          url: payload.webpush?.fcm_ptions?.link,
          read: false,
          timestamp: new Date().toUTCString(),
          readAt: null,
        };
        setNewNotifications((prev) => [notif, ...prev]);
        setAllNotifications((prev) => [notif, ...prev]);
        InAppNotification.insertOne(notif);
      } catch (err) {
        console.error(err);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const markAllAsRead = () => {
    const readAt = new Date();
    InAppNotification.updateMany({ read: false }, { read: true, readAt })
      .then(() => {
        setNewNotifications((prev) =>
          prev.map((notif) => ({ ...notif, read: true, readAt }))
        );
        setAllNotifications((prev) =>
          prev.map((notif) => ({ ...notif, read: true, readAt }))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const markAsRead = (notification) => {
    const readAt = new Date();
    InAppNotification.updateOne(
      { timestamp: notification.timestamp },
      { read: true, readAt }
    )
      .then(() => {
        setNewNotifications((prev) =>
          prev.map((notif) => {
            if (notif.timestamp === notification.timestamp) {
              return { ...notif, read: true, readAt };
            }
            return notif;
          })
        );
        setAllNotifications((prev) =>
          prev.map((notif) => {
            if (notif.timestamp === notification.timestamp) {
              return { ...notif, read: true, readAt };
            }
            return notif;
          })
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const value = {
    unreadNotifications: newNotifications,
    allNotifications: allNotifications,
    unreadNotificationsCount: newNotifications.filter((n) => !n.read).length,
    markAllAsRead,
    markAsRead,
  };

  return (
    <InAppNotificationsContext.Provider value={value}>
      {children}
    </InAppNotificationsContext.Provider>
  );
};

export default InAppNotificationsProvider;
