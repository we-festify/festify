import { useState } from "react";
import styles from "../Location.module.css";
import Grid, { GridItem } from "../../../../../components/Grid/Grid";
import Input from "../../../../../components/AdminCommons/Input";

const Form = ({ onSubmit, defaultValue, onChange }) => {
  const [marker, setMarker] = useState(defaultValue || {});
  const [canSubmit, setCanSubmit] = useState(false);

  const handleChange = (name, value) => {
    setMarker({ ...marker, [name]: value });
    if (onChange) onChange({ ...marker, [name]: value });
  };

  const handleCanSubmit = (isValid) => {
    setCanSubmit(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit) onSubmit(marker);
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
            defaultValue={marker.name}
          />
        </GridItem>
        <GridItem sm={12} md={12} lg={12}>
          <Input.TextArea
            label="Description"
            name="description"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("description", value)}
            defaultValue={marker.description}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Latitude"
            name="latitude"
            type="number"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("latitude", value)}
            defaultValue={marker.latitude}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Longitude"
            name="longitude"
            type="number"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("longitude", value)}
            defaultValue={marker.longitude}
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

export default Form;
