import { useLocation } from "react-router-dom";
import {
  useGetFCMQuery,
  useGetNotificationPermissionQuery,
  useSubscribeFCMMutation,
  useSubscribeToTopicsMutation,
  useUnsubscribeFromTopicsMutation,
  useUpdateNotificationPermissionMutation,
} from "../../../../../../state/redux/notification/notificationApi";
import FCMService from "../../../../../../services/fcm";
import { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { toast } from "../../../../components/Toast";
import { cn } from "../../../../../../utils/tailwind";

const SubscribeEventNotificationsButton = () => {
  const location = useLocation();
  const eventId = location.pathname.split("/").pop();
  const { data: { fcm } = {} } = useGetFCMQuery();
  const { data: { notificationPermission } = {} } =
    useGetNotificationPermissionQuery();
  const [updatePermission, {}] = useUpdateNotificationPermissionMutation();
  const [subscribeToFCM, {}] = useSubscribeFCMMutation();
  const [subscribeToTopics, {}] = useSubscribeToTopicsMutation();
  const [unsubscribeFromTopics, {}] = useUnsubscribeFromTopicsMutation();
  const [hasSubscribed, setHasSubscribed] = useState(false);

  useEffect(() => {
    const initialise = async () => {
      try {
        if (
          notificationPermission?.push &&
          FCMService.hasGivenNotificationPermission()
        ) {
          const token = await FCMService.getToken();
          if (!(token && fcm?.tokens?.includes(token))) {
            // If the user has given permission but the token is not found in the database
            await subscribeToFCM(token).unwrap();
          }
          if (notificationPermission?.topics?.includes(eventId)) {
            setHasSubscribed(true);
          }
        }
      } catch {
        // If there is an error
        // Do nothing
      }
    };

    initialise();
  }, [notificationPermission, fcm, eventId]);

  // This function can have inconsistent behavior
  const handleSubscriptionChange = async (e) => {
    e.preventDefault();
    try {
      if (!hasSubscribed) {
        const token = await FCMService.requestPermission();
        await updatePermission({
          push: true,
          topics: [...(notificationPermission?.topics || []), eventId],
        }).unwrap();
        await subscribeToFCM(token).unwrap();
        await subscribeToTopics({ topics: [eventId], token }).unwrap();
        setHasSubscribed(true);
        toast.success("Subscribed to event notifications");
      } else {
        const token = await FCMService.getToken();
        await updatePermission({
          push: false,
          topics: notificationPermission?.topics?.filter(
            (topic) => topic !== eventId
          ),
        }).unwrap();
        await unsubscribeFromTopics({ topics: [eventId], token }).unwrap();
        setHasSubscribed(false);
        toast.success("Unsubscribed from event notifications");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <button
        className={cn(
          "flex gap-2 items-center hover:text-green-500 py-1 px-3 ring-1 rounded-md ring-white/50 hover:ring-green-500 transition-all",
          hasSubscribed && "ring-green-500 text-green-500 bg-green-500/10"
        )}
        onClick={handleSubscriptionChange}
      >
        <IoNotifications />
        <span>{hasSubscribed ? "Subscribed" : "Subscribe"}</span>
      </button>
    </div>
  );
};

export default SubscribeEventNotificationsButton;
