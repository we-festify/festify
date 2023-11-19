import React, { useState } from "react";
import styles from "../Events.module.css";
import Grid, { GridItem } from "../../../../../components/Grid/Grid";
import Input from "../../../../../components/AdminCommons/Input";
import ListInput from "../../../components/ListInput/ListInput";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../state/redux/auth/authSlice";

const Form = ({ onSubmit, defaultValue, onChange }) => {
  const user = useSelector(selectUser);
  const organisationId = user.organisation;
  const [canSubmit, setCanSubmit] = useState(false);

  const [event, setEvent] = useState(
    defaultValue || {
      name: "",
      type: "",
      venue: "",
      summary: "",
      description: "",
      image: "",
      organisation: organisationId,
      timeline: [],
      category: "other",
      minTeamSize: 1,
      maxTeamSize: 1,
      tags: [],
      feesInINR: 0,
      registrationsStart: "",
      registrationsEnd: "",
      isTicketed: false,
      rulebookUrl: "",
    }
  );

  const handleChange = (name, value) => {
    setEvent({ ...event, [name]: value });
    if (onChange) onChange({ ...event, [name]: value });
  };

  const handleCanSubmit = (isValid) => {
    setCanSubmit(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit) onSubmit(event);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid columns={12}>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Name"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("name", value)}
            defaultValue={event.name}
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
            defaultValue={event.type}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Venue"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("venue", value)}
            defaultValue={event.venue}
          />
        </GridItem>
        <GridItem sm={12} md={12} lg={8}>
          <Input.Text
            label="Summary"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("summary", value)}
            defaultValue={event.summary}
          />
        </GridItem>
        <GridItem sm={12} md={12} lg={12}>
          <Input.TextArea
            label="Description"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("description", value)}
            defaultValue={event.description}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Image URL"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("image", value)}
            defaultValue={event.image}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Rulebook URL"
            validations={{}}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("rulebookUrl", value)}
            defaultValue={event.rulebookUrl}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Organisation ID"
            readOnly={true}
            defaultValue={organisationId}
          />
        </GridItem>
        <GridItem sm={12} md={4} lg={4}>
          <Input.Radio
            label="Is this a ticketed event?"
            entries={["Yes", "No"]}
            validations={{ required: true }}
            onChange={(value) => handleChange("isTicketed", value === "Yes")}
            defaultValue={event.isTicketed ? "Yes" : "No"}
          />
        </GridItem>
        <GridItem sm={12} md={4} lg={4}>
          <Input.DateTime
            label="Registrations Start Time"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("registrationsStart", value)}
            defaultValue={event.registrationsStart}
          />
        </GridItem>
        <GridItem sm={12} md={4} lg={4}>
          <Input.DateTime
            label="Registrations End Time"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("registrationsEnd", value)}
            defaultValue={event.registrationsEnd}
          />
        </GridItem>
        <GridItem sm={12} md={4} lg={4}>
          <Input.Dropdown
            label="Category"
            entries={[
              "design",
              "management",
              "technical",
              "literary",
              "art",
              "dramatics",
              "dance",
              "music",
              "quiz",
              "gaming",
              "workshop",
              "other",
            ]}
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("category", value)}
            defaultValue={event.category || "other"}
          />
        </GridItem>
        <GridItem sm={12} md={8} lg={4}>
          <Input.Tags
            key={event.tags}
            label="Tags"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("tags", value)}
            defaultValue={event.tags}
          />
        </GridItem>
        <GridItem sm={12} md={4} lg={4}>
          <Input.Text
            type="number"
            label="Fee (in INR * 100)"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("feesInINR", value)}
            defaultValue={event.fee || 0}
          />
        </GridItem>
        <GridItem sm={12} md={4} lg={4}>
          <Input.Text
            type="number"
            label="Minimum Team Size"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("minTeamSize", value)}
            defaultValue={event.minTeamSize || 1}
          />
        </GridItem>
        <GridItem sm={12} md={4} lg={4}>
          <Input.Text
            type="number"
            label="Maximum Team Size"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("maxTeamSize", value)}
            defaultValue={event.maxTeamSize || 1}
          />
        </GridItem>
        <GridItem sm={12} md={12} lg={12}>
          <ListInput
            label="Timeline"
            name="timeline"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("timeline", value)}
            defaultValue={event.timeline}
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
        <GridItem sm={12} md={12} lg={12}>
          <button className={styles.submit} type="submit">
            Submit
          </button>
        </GridItem>
      </Grid>
    </form>
  );
};

export default Form;
