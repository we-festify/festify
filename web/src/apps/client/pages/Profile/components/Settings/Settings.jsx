import React, { useEffect, useState } from "react";
import styles from "./Settings.module.css";
import WebPushService from "./../../../../../../services/webPush";
import {
  useGetWebPushSubscriptionQuery,
  useSubscribeWebPushMutation,
  useTestWebPushMutation,
  useUnsubscribeWebPushMutation,
} from "../../../../../../state/redux/notification/notificationApi";
import Button from "../../../../atoms/Button";
import { selectIsAdmin } from "../../../../../../state/redux/auth/authSlice";
import { useSelector } from "react-redux";

const Settings = () => {
  return (
    <div className={styles.container}>
      <NotificationSettingsGroup />
    </div>
  );
};

const NotificationSettingsGroup = () => {
  const { data: { subscription } = {} } = useGetWebPushSubscriptionQuery();
  const [subscribeToWebPush, {}] = useSubscribeWebPushMutation();
  const [unsubscribeFromWebPush, {}] = useUnsubscribeWebPushMutation();
  const [push, setPush] = useState(false);
  const [testWebPush, {}] = useTestWebPushMutation();
  const isAdmin = useSelector(selectIsAdmin);

  useEffect(() => {
    if (subscription && subscription?.subscriptions?.length > 0) {
      setPush(true);
    } else {
      setPush(false);
    }
  }, [subscription]);

  const handlePushChange = async (e) => {
    const { checked } = e.target;
    setPush(checked);
    try {
      if (!checked) {
        const payload = await WebPushService.unsubscribe();
        if (payload) {
          unsubscribeFromWebPush(payload);
        }
        return;
      }
      if (!WebPushService.hasPermission()) {
        await WebPushService.requestPermission();
      }
      let subscription = await WebPushService.getSubscription();
      if (!subscription) {
        subscription = await WebPushService.subscribe();
      }
      subscribeToWebPush(subscription);
      console.log("Subscribed to web push");
    } catch (error) {
      setPush(!checked);
      console.error(error);
    }
  };

  const handleTestWebPush = async () => {
    testWebPush({
      title: "Test Web Push",
      body: "This is a test notification",
    });
  };

  return (
    <div className={styles.group}>
      <h2 className={styles.title}>Notifications</h2>
      <div className={styles.item}>
        <p className={styles.key}>Email</p>
        <input type="checkbox" className={styles.value} checked disabled />
      </div>
      <div className={styles.item}>
        <p className={styles.key}>Web Push</p>
        <input
          type="checkbox"
          className={styles.value}
          id="push"
          checked={push}
          onChange={handlePushChange}
        />
      </div>
      <div className={styles.item}>
        <p className={styles.key}>In-App</p>
        <input type="checkbox" className={styles.value} checked disabled />
      </div>
      {isAdmin && (
        <Button
          variant="outline-secondary"
          style={{ marginTop: "1rem" }}
          onClick={handleTestWebPush}
        >
          Test Web Push
        </Button>
      )}
    </div>
  );
};

export default Settings;
