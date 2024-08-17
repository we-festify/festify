import { useSendNotificationToTopicsMutation } from "../../../../state/redux/notification/notificationApi";
import Card from "../../components/Card/Card";
import { toast } from "../../components/Toast";
import NotificationForm from "./components/Form";

const NotificationsIndex = () => {
  const [sendNotification] = useSendNotificationToTopicsMutation();

  const handleSubmit = async (notification) => {
    try {
      console.log(notification);
      await sendNotification({
        topics: notification.topics,
        notification: {
          title: notification.title,
          body: notification.body,
        },
      }).unwrap();
      toast.success("Notification sent successfully");
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-4 overflow-auto">
      <Card>
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <h2 className="font-medium text-[var(--color-text-admin)]">
              Notifications
            </h2>
            <p className="text-sm text-[var(--color-text-light-admin)]">
              Create and manage notifications
            </p>
          </div>
          <NotificationForm
            onSubmit={handleSubmit}
            onChange={(notification) => console.log(notification)}
          />
        </div>
      </Card>
    </div>
  );
};

export default NotificationsIndex;
