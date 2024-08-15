import { useState } from "react";
import styles from "../Events.module.css";
import Grid, { GridItem } from "../../../../../components/Grid/Grid";
import Input from "../../../../../components/AdminCommons/Input";
import ListInput from "../../../components/ListInput/ListInput";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../../state/redux/auth/authSlice";
import ImagePreview from "./ImagePreview/ImagePreview";

const EventForm = ({ onSubmit, defaultValue, onChange }) => {
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
    startTime: "",
    endTime: "",
    timeline: [],
    category: "other",
    tags: [],
    rulebookUrl: "",

    isRegistrationRequired: false,
    registrationFeesInINR: 0,
    minTeamSize: 1,
    maxTeamSize: 1,
    registrationsStart: "",
    registrationsEnd: "",

    isEntryPassRequired: false,
    entryPassPriceInINR: 0,
    totalEntryPasses: 0, // 0 means unlimited
    entryPassDistributionStart: "",
    entryPassDistributionEnd: "",

    ...(defaultValue || {}),
  });

  const handleChange = (name, value) => {
    setEvent({ ...event, [name]: value });
    if (onChange) onChange({ ...event, [name]: value });
  };

  const handleCanSubmit = (isValid) => {
    setCanSubmit(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(event);
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
          <ImagePreview
            src={event.image}
            blurHash={event.imageBlurHash}
            onHashChange={(hash) => handleChange("imageBlurHash", hash)}
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
        <GridItem sm={12} md={6} lg={4}>
          <Input.DateTime
            label="Start Time"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("startTime", value)}
            defaultValue={event.startTime}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.DateTime
            label="End Time"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("endTime", value)}
            defaultValue={event.endTime}
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

        <GridItem sm={12} md={4} lg={4}>
          <Input.Radio
            label="Is Registration Required?"
            entries={["Yes", "No"]}
            onChange={(value) =>
              handleChange("isRegistrationRequired", value === "Yes")
            }
            defaultValue={event.isRegistrationRequired ? "Yes" : "No"}
          />
        </GridItem>
        <GridItem sm={12} md={4} lg={4}>
          <Input.DateTime
            label="Registrations Start Time"
            validations={{ required: event.isRegistrationRequired }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("registrationsStart", value)}
            defaultValue={event.registrationsStart}
          />
        </GridItem>
        <GridItem sm={12} md={4} lg={4}>
          <Input.DateTime
            label="Registrations End Time"
            validations={{ required: event.isRegistrationRequired }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("registrationsEnd", value)}
            defaultValue={event.registrationsEnd}
          />
        </GridItem>
        <GridItem sm={12} md={4} lg={4}>
          <Input.Text
            type="number"
            label="Registration Fees (in INR)"
            validations={{ required: event.isRegistrationRequired }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("registrationFeesInINR", value)}
            defaultValue={event.fee || 0}
          />
        </GridItem>
        <GridItem sm={12} md={4} lg={4}>
          <Input.Text
            type="number"
            label="Minimum Team Size"
            validations={{ required: event.isRegistrationRequired }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("minTeamSize", value)}
            defaultValue={event.minTeamSize || 1}
          />
        </GridItem>
        <GridItem sm={12} md={4} lg={4}>
          <Input.Text
            type="number"
            label="Maximum Team Size"
            validations={{ required: event.isRegistrationRequired }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("maxTeamSize", value)}
            defaultValue={event.maxTeamSize || 1}
          />
        </GridItem>

        <GridItem sm={12} md={4} lg={4}>
          <Input.Radio
            label="Is Entry Pass Required?"
            entries={["Yes", "No"]}
            onChange={(value) =>
              handleChange("isEntryPassRequired", value === "Yes")
            }
            defaultValue={event.isEntryPassRequired ? "Yes" : "No"}
          />
        </GridItem>
        <GridItem sm={12} md={4} lg={4}>
          <Input.DateTime
            label="Entry Pass Distribution Start"
            validations={{ required: event.isEntryPassRequired }}
            onValidation={handleCanSubmit}
            onChange={(value) =>
              handleChange("entryPassDistributionStart", value)
            }
            defaultValue={event.entryPassDistributionStart}
          />
        </GridItem>
        <GridItem sm={12} md={4} lg={4}>
          <Input.DateTime
            label="Entry Pass Distribution End"
            validations={{ required: event.isEntryPassRequired }}
            onValidation={handleCanSubmit}
            onChange={(value) =>
              handleChange("entryPassDistributionEnd", value)
            }
            defaultValue={event.entryPassDistributionEnd}
          />
        </GridItem>
        <GridItem sm={12} md={4} lg={4}>
          <Input.Text
            type="number"
            label="Entry Pass Price (in INR)"
            validations={{ required: event.isEntryPassRequired }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("entryPassPriceInINR", value)}
            defaultValue={event.entryPassPriceInINR || 0}
          />
        </GridItem>
        <GridItem sm={12} md={4} lg={4}>
          <Input.Text
            type="number"
            label="Total Entry Passes"
            validations={{ required: event.isEntryPassRequired }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("totalEntryPasses", value)}
            defaultValue={event.totalEntryPasses || 0}
          />
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

export default EventForm;
