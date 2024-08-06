import styles from "./Announcements.module.css";
import Avatar from "../../../../components/Avatar/Avatar";
import { useGetAnnouncementsByEventIdQuery } from "../../../../../../state/redux/events/eventsApi";
import { formatDateTimePassed } from "../../../../../../utils/time";
import { useLocation } from "react-router-dom";

const Announcements = () => {
  const location = useLocation();
  const eventId = location.pathname.split("/")[2];
  const { data: { announcements } = {}, error } =
    useGetAnnouncementsByEventIdQuery({ eventId, page: 1, limit: 10 });

  return (
    <div className={styles.container}>
      <div className={styles.announcements}>
        {announcements?.length > 0 ? (
          announcements.map((announcement) => (
            <Announcement key={announcement._id} announcement={announcement} />
          ))
        ) : (
          <div className={styles.empty}>
            {error?.data?.message || "No announcements yet"}
          </div>
        )}
      </div>
    </div>
  );
};

const Announcement = ({ announcement }) => {
  return (
    <div className={styles.announcement}>
      <div className={styles.title}>{announcement.title}</div>
      <div className={styles.header}>
        <div className={styles.left}>
          <Avatar
            avatarCode={announcement.createdBy?.avatarCode}
            name={announcement.createdBy?.name}
          />
          <div className={styles.details}>
            <p className={styles.name}>{announcement.createdBy?.name}</p>
            <p className={styles.time}>
              {formatDateTimePassed(announcement.createdAt)}
            </p>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.badge}>{announcement.createdBy?.role}</div>
        </div>
      </div>
      <div className={styles.description}>{announcement.description}</div>
    </div>
  );
};

export default Announcements;
