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
import {
  clearCredentials,
  selectIsAdmin,
} from "../../../../../../state/redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../../../../../state/redux/auth/authApi";
import { toast } from "react-toastify";

const Settings = () => {
  const dispatch = useDispatch();
  const [logout, {}] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredentials()); // clear credentials from redux store
    } catch (error) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className={styles.container}>
      <NotificationSettingsGroup />
      <div className={styles.group}>
        <Button variant="outline-secondary" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

const NotificationSettingsGroup = () => {
  const [testWebPush, {}] = useTestWebPushMutation();
  const isAdmin = useSelector(selectIsAdmin);

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
      <WebPushToggleItem />
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

const WebPushToggleItem = () => {
  const { data: { subscription } = {}, isLoading } =
    useGetWebPushSubscriptionQuery();
  const [subscribeToWebPush, {}] = useSubscribeWebPushMutation();
  const [unsubscribeFromWebPush, {}] = useUnsubscribeWebPushMutation();
  const [push, setPush] = useState(false);

  useEffect(() => {
    WebPushService.getSubscription().then((sub) => {
      if (sub) {
        let found = false;
        subscription?.subscriptions?.forEach((s) => {
          if (s.endpoint === sub.endpoint) {
            setPush(true);
            found = true;
          }
        });
        if (!found) {
          setPush(false);
        }
      } else {
        setPush(false);
      }
    });
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
        console.log("Unsubscribed from web push");
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

  return (
    <div key={subscription?._id} className={styles.item}>
      <p className={styles.key}>Web Push</p>
      {isLoading ? (
        <p className={styles.value}>Loading...</p>
      ) : (
        <input
          type="checkbox"
          className={styles.value}
          checked={push}
          onChange={handlePushChange}
        />
      )}
    </div>
  );
};

export default Settings;
