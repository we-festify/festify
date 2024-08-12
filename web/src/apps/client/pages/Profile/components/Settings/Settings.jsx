import { useEffect, useState } from "react";
import styles from "./Settings.module.css";
import WebPushService from "./../../../../../../services/webPush";
import {
  useGetFCMQuery,
  useGetNotificationPermissionQuery,
  useGetWebPushSubscriptionQuery,
  useSubscribeFCMMutation,
  useSubscribeWebPushMutation,
  useTestFCMMutation,
  useUnsubscribeFCMMutation,
  useUnsubscribeWebPushMutation,
  useUpdateNotificationPermissionMutation,
} from "../../../../../../state/redux/notification/notificationApi";
import Button from "../../../../atoms/Button";
import {
  clearCredentials,
  selectIsAdmin,
} from "../../../../../../state/redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../../../../../state/redux/auth/authApi";
import { toast } from "../../../../components/Toast";
import FCMService from "../../../../../../services/fcm";

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
  const { data: { notificationPermission } = {} } =
    useGetNotificationPermissionQuery();
  const [testFCMNotification, {}] = useTestFCMMutation();
  const isAdmin = useSelector(selectIsAdmin);

  const handleTestWebPush = async () => {
    testFCMNotification({
      title: "Test Web Push",
      body: "This is a test notification",
    });
  };

  return (
    <div className={styles.group}>
      <h2 className={styles.title}>Notifications</h2>
      <div className={styles.item}>
        <p className={styles.key}>Email</p>
        <input
          type="checkbox"
          className={styles.value}
          defaultChecked={notificationPermission?.email || false}
          disabled
        />
      </div>
      <FCMToggleItem />
      <div className={styles.item}>
        <p className={styles.key}>In-App</p>
        <input
          type="checkbox"
          className={styles.value}
          defaultChecked={notificationPermission?.inApp || true}
          disabled
        />
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
  const { data: { notificationPermission } = {} } =
    useGetNotificationPermissionQuery();
  const [updatePermission, {}] = useUpdateNotificationPermissionMutation();
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
            updatePermission({ push: true });
          }
        });
        if (!found) {
          // If the subscription is not found in the database, try to subscribe again
          // if the user has given permission
          if (notificationPermission?.push) {
            subscribeToWebPush(sub);
            setPush(true);
          } else {
            setPush(false);
          }
        }
      } else {
        setPush(false);
      }
    });
  }, [subscription]);

  // This function can have inconsistent behavior
  const handlePushChange = async (e) => {
    const { checked } = e.target;
    setPush(checked);
    try {
      if (!checked) {
        const payload = await WebPushService.unsubscribe();
        if (payload) {
          unsubscribeFromWebPush(payload);
          updatePermission({ push: false });
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
      updatePermission({ push: true });
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

const FCMToggleItem = () => {
  const {
    data: { notificationPermission } = {},
    isLoading: arePermissionsLoading,
  } = useGetNotificationPermissionQuery();
  const { data: { fcm } = {}, isLoading: isFCMLoading } = useGetFCMQuery();
  const [updatePermission, {}] = useUpdateNotificationPermissionMutation();
  const [subscribeToFCM, {}] = useSubscribeFCMMutation();
  const [unsubscribeFromFCM, {}] = useUnsubscribeFCMMutation();
  const [push, setPush] = useState(false);

  useEffect(() => {
    const initialise = async () => {
      try {
        if (
          notificationPermission?.push &&
          FCMService.hasGivenNotificationPermission()
        ) {
          const token = await FCMService.getToken();
          if (token && fcm?.tokens?.includes(token)) {
            // If the user has given permission and the token is found in the database
            setPush(true);
          } else {
            // If the user has given permission but the token is not found in the database
            await subscribeToFCM(token).unwrap();
            setPush(true);
          }
        }
      } catch {
        // If there is an error
        // Do nothing
      }
    };

    initialise();
  }, [notificationPermission, fcm]);

  // This function can have inconsistent behavior
  const handlePushChange = async (e) => {
    const { checked } = e.target;
    setPush(checked);
    try {
      if (checked) {
        const token = await FCMService.requestPermission();
        await updatePermission({ push: true }).unwrap();
        await subscribeToFCM(token).unwrap();

        // Subscribe to all topics (if any)
        fcm?.topics?.forEach(async (topic) => {
          await FCMService.subscribeToTopic([token], topic);
        });
      } else {
        const token = await FCMService.getToken();
        await updatePermission({ push: false }).unwrap();
        await unsubscribeFromFCM(token).unwrap();

        // Unsubscribe from all topics (if any)
        fcm?.topics?.forEach(async (topic) => {
          await FCMService.unsubscribeFromTopic([token], topic);
        });
      }
    } catch (error) {
      setPush(!checked);
      console.error(error);
    }
  };

  return (
    <div key={fcm?._id + notificationPermission?._id} className={styles.item}>
      <p className={styles.key}>Web Push FCM</p>
      {arePermissionsLoading || isFCMLoading ? (
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
