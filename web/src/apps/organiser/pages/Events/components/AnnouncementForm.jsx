import { useState } from "react";
import styles from "../Events.module.css";
import Grid, { GridItem } from "../../../../../components/Grid/Grid";
import Input from "../../../../../components/AdminCommons/Input";
import { useParams } from "react-router-dom";
import { useCreateAnnouncementMutation } from "../../../../../state/redux/events/eventsApi";
import { toast } from "../../../components/Toast";

const AnnouncementForm = ({ defaultValue }) => {
  const { eventId } = useParams();
  const [announcement, setAnnouncement] = useState(
    defaultValue || {
      title: "",
      description: "",
    }
  );
  const [createAnnouncement, {}] = useCreateAnnouncementMutation();
  const [canSubmit, setCanSubmit] = useState(false);

  const handleChange = (name, value) => {
    setAnnouncement({ ...announcement, [name]: value });
  };

  const handleCanSubmit = (isValid) => {
    setCanSubmit(isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSubmit) return;

    try {
      await createAnnouncement({ announcement, eventId: eventId }).unwrap();
      setAnnouncement({ title: "", description: "" });
      toast.success("Announcement posted successfully!");
    } catch (err) {
      toast.error(
        err.data.message || err.error.message || "Something went wrong"
      );
    }
  };

  return (
    <form className={styles.announcement} onSubmit={handleSubmit}>
      <Grid columns={12}>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Title"
            placeholder="Add a title..."
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            defaultValue={announcement.title}
            onChange={(value) => handleChange("title", value)}
          />
        </GridItem>
        <GridItem sm={12} md={12} lg={12}>
          <Input.TextArea
            label="Description"
            placeholder="Add a description..."
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            defaultValue={announcement.description}
            onChange={(value) => handleChange("description", value)}
          />
        </GridItem>
      </Grid>

      <div className={styles.actions}>
        <button className={styles.submit} type="submit">
          Post
        </button>
      </div>
    </form>
  );
};

export default AnnouncementForm;
