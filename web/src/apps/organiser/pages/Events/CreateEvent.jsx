import React, { useEffect, useState } from "react";
import styles from "./Events.module.css";
import Card from "../../components/Card/Card";
import Input from "../../components/Input";
import Grid, { GridItem } from "../../../../components/Grid/Grid";
import ListInput from "../../components/ListInput/ListInput";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../state/redux/auth/authSlice";
import { useCreateEventMutation } from "../../../../state/redux/events/eventsApi";

const CreateEvent = () => {
  const user = useSelector(selectUser);
  const organisationId = user.organisation;
  const [canSubmit, setCanSubmit] = useState(false);
  const [event, setEvent] = useState({
    name: "",
    type: "",
    venue: "",
    summary: "",
    description: "",
    image: "",
    organisation: organisationId,
    timeline: [],
  });
  const [createEvent, { error, isLoading }] = useCreateEventMutation();

  const handleCanSubmit = (isValid) => {
    setCanSubmit(isValid);
  };

  const handleChange = (name, value) => {
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(event);
    if (canSubmit) createEvent(event);
  };

  return (
    <div className={styles.page}>
      <Card>
        <div className={styles.createEventCard}>
          <h4 className={styles.title}>Event Details</h4>
          <p className={styles.subtitle}>
            Enter the details of the event you want to create.
          </p>
          <form onSubmit={handleSubmit}>
            <Grid columns={12}>
              <GridItem sm={12} md={6} lg={4}>
                <Input.Text
                  label="Name"
                  validations={{ required: true }}
                  onValidation={handleCanSubmit}
                  onChange={(value) => handleChange("name", value)}
                />
              </GridItem>
              <GridItem sm={12} md={6} lg={4}>
                <Input.Dropdown
                  label="Type"
                  entries={[
                    "event",
                    "competition",
                    "exhibition",
                    "workshop",
                    "other",
                  ]}
                  validations={{ required: true }}
                  onValidation={handleCanSubmit}
                  onChange={(value) => handleChange("type", value)}
                />
              </GridItem>
              <GridItem sm={12} md={6} lg={4}>
                <Input.Text
                  label="Venue"
                  validations={{ required: true }}
                  onValidation={handleCanSubmit}
                  onChange={(value) => handleChange("venue", value)}
                />
              </GridItem>
              <GridItem sm={12} md={6} lg={4}>
                <Input.Text
                  label="Summary"
                  validations={{ required: true }}
                  onValidation={handleCanSubmit}
                  onChange={(value) => handleChange("summary", value)}
                />
              </GridItem>
              <GridItem sm={12} md={12} lg={12}>
                <Input.TextArea
                  label="Description"
                  validations={{ required: true }}
                  onValidation={handleCanSubmit}
                  onChange={(value) => handleChange("description", value)}
                />
              </GridItem>
              <GridItem sm={12} md={6} lg={4}>
                <Input.Text
                  label="Image URL"
                  validations={{ required: true }}
                  onValidation={handleCanSubmit}
                  onChange={(value) => handleChange("image", value)}
                />
              </GridItem>
              <GridItem sm={12} md={6} lg={4}>
                <Input.Text
                  label="Organisation ID"
                  readOnly={true}
                  defaultValue={organisationId}
                />
              </GridItem>
              <GridItem sm={12} md={12} lg={12}>
                <ListInput
                  label="Timeline"
                  validations={{ required: true }}
                  onValidation={handleCanSubmit}
                  onChange={(value) => handleChange("timeline", value)}
                >
                  <Input.DateTime
                    label="Date Time"
                    name="time"
                    validations={{ required: true }}
                  />
                  <Input.Text
                    label="Venue"
                    name="venue"
                    validations={{ required: true }}
                  />
                  <Input.TextArea
                    label="Description"
                    name="description"
                    validations={{ required: true }}
                  />
                </ListInput>
              </GridItem>
              {error && (
                <GridItem sm={12} md={12} lg={12}>
                  <p className={styles.error}>{error}</p>
                </GridItem>
              )}
              {isLoading && (
                <GridItem sm={12} md={12} lg={12}>
                  <p className={styles.loading}>
                    Creating event, please wait...
                  </p>
                </GridItem>
              )}
              <GridItem sm={12} md={12} lg={12}>
                <button className={styles.submit} type="submit">
                  Create Event
                </button>
              </GridItem>
            </Grid>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default CreateEvent;
