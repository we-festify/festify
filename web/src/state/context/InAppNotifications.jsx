import React, { createContext, useContext, useEffect, useState } from "react";
import { useWebSocket } from "./WebSocket";
import { InAppNotification } from "../../services/local-db";

const InAppNotificationsContext = createContext(null);

export const useInAppNotifications = () =>
  useContext(InAppNotificationsContext);

const InAppNotificationsProvider = ({ children }) => {
  const { subscribe, unsubscribe } = useWebSocket();
  const [newNotifications, setNewNotifications] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);

  useEffect(() => {
    subscribe(
      "notification:new",
      (payload) => {
        setNewNotifications((prev) => [payload, ...prev]);
        setAllNotifications((prev) => [payload, ...prev]);
        InAppNotification.insertOne({
          title: payload.title,
          body: payload.body,
          url: payload.url,
          read: false,
          timestamp: payload.timestamp,
          readAt: null,
        });
      },
      "notifications-provider"
    );

    InAppNotification.find({ read: false }).then((notifications) => {
      setNewNotifications(notifications);
    });

    InAppNotification.find().then((notifications) => {
      setAllNotifications(notifications);
    });

    return () => {
      unsubscribe("notification:new", "notifications-provider");
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const markAllAsRead = () => {
    const readAt = new Date();
    InAppNotification.updateMany({ read: false }, { read: true, readAt }).then(
      () => {
        setNewNotifications((prev) =>
          prev.map((n) => ({ ...n, read: true, readAt }))
        );
        setAllNotifications((prev) =>
          prev.map((n) => ({ ...n, read: true, readAt }))
        );
      }
    );
  };

  const markAsRead = (notification) => {
    const readAt = new Date();
    InAppNotification.updateOne(
      { timestamp: notification.timestamp },
      { read: true, readAt }
    ).then(() => {
      setNewNotifications((prev) =>
        prev.map((n) => {
          if (n.timestamp === notification.timestamp) {
            return { ...n, read: true, readAt };
          }
          return n;
        })
      );
      setAllNotifications((prev) =>
        prev.map((n) => {
          if (n.timestamp === notification.timestamp) {
            return { ...n, read: true, readAt };
          }
          return n;
        })
      );
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
