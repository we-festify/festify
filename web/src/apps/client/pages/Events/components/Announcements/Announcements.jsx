import React, { useState } from "react";
import styles from "./Announcements.module.css";
import Avatar from "../../../../components/Avatar/Avatar";
import {
  useCreateAnnouncementMutation,
  useGetAnnouncementsByEventIdQuery,
} from "../../../../../../state/redux/events/eventsApi";
import { formatDateTimePassed } from "../../../../../../utils/time";
import { useLocation } from "react-router-dom";
import Permit from "../../../../../../components/rbac/Permit";
import { toast } from "../../../../components/Toast";

const Announcements = () => {
  const location = useLocation();
  const eventId = location.pathname.split("/")[2];
  const { data: { announcements } = {}, error } =
    useGetAnnouncementsByEventIdQuery({ eventId, page: 1, limit: 10 });

  return (
    <div className={styles.container}>
      <Permit type="announcement" action="create">
        <AnnouncementForm />
      </Permit>
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

const AnnouncementForm = ({ defaultValue }) => {
  const location = useLocation();
  const eventId = location.pathname.split("/")[2];
  const [title, setTitle] = useState(defaultValue?.title || "");
  const [description, setDescription] = useState(
    defaultValue?.description || ""
  );
  const [createAnnouncement, {}] = useCreateAnnouncementMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAnnouncement({ title, description, event: eventId }).unwrap();
      setTitle("");
      setDescription("");
    } catch (err) {
      toast.error(
        err.data.message || err.error.message || "Something went wrong"
      );
    }
  };

  return (
    <form className={styles.announcement} onSubmit={handleSubmit}>
      <input
        placeholder="Add a title..."
        className={styles.title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Add a description..."
        className={styles.description}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <div className={styles.actions}>
        <button className={styles.submit} type="submit">
          Post
        </button>
      </div>
    </form>
  );
};

export default Announcements;
