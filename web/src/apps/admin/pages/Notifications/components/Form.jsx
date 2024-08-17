import { useState } from "react";
import Grid, { GridItem } from "../../../../../components/Grid/Grid";
import { useGetAllEventsQuery } from "../../../../../state/redux/events/eventsApi";
import Input from "../../../../../components/AdminCommons/Input";

const NotificationForm = ({ defaultValue = {}, onSubmit, onChange }) => {
  const [notification, setNotification] = useState({
    title: "",
    body: "",
    topics: [],
    ...(defaultValue || {}),
  });
  const [canSubmit, setCanSubmit] = useState(false);
  const query = `{ events [{ _id, name }] }`; // Query for getting only the event ids and names
  const { data: { events = [] } = {}, isLoading: areEventsLoading } =
    useGetAllEventsQuery(query);

  const handleChange = (name, value) => {
    setNotification({ ...notification, [name]: value });
    if (onChange instanceof Function)
      onChange({ ...notification, [name]: value });
  };

  const handleCanSubmit = (isValid) => {
    setCanSubmit(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    if (onSubmit instanceof Function) onSubmit(notification);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid columns={12}>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Title"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("title", value)}
            defaultValue={notification.title}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Body"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("body", value)}
            defaultValue={notification.message}
          />
        </GridItem>
        <GridItem sm={12} md={12} lg={12}>
          {areEventsLoading ? (
            <span>Loading...</span>
          ) : (
            <Input.CheckBoxes
              label="Events"
              entries={events?.map(({ name }) => name) || []}
              validations={{ minCount: 1 }}
              onValidation={handleCanSubmit}
              onChange={(values) =>
                handleChange(
                  "topics",
                  values?.map(
                    (name) => events?.find((event) => event.name === name)?._id
                  )
                )
              }
              defaultValue={notification?.topics?.map((id) => ({
                [events?.find((event) => event._id === id)?.name]: true,
              }))}
            />
          )}
        </GridItem>
        <GridItem sm={12} md={12} lg={12}>
          <button
            className="flex justify-center items-center w-full h-10 bg-primary text-white rounded-md cursor-pointer transition-colors hover:bg-primary/90"
            type="submit"
          >
            Submit
          </button>
        </GridItem>
      </Grid>
    </form>
  );
};

export default NotificationForm;
