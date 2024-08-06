import { useState } from "react";
import styles from "../Sponsor.module.css";
import Grid, { GridItem } from "../../../../../components/Grid/Grid";
import Input from "../../../../../components/AdminCommons/Input";

const Form = ({ onSubmit, defaultValue, onChange }) => {
  const [sponsor, setSponsor] = useState(defaultValue || {});
  const [canSubmit, setCanSubmit] = useState(false);

  const handleChange = (name, value) => {
    setSponsor({ ...sponsor, [name]: value });
    if (onChange) onChange({ ...sponsor, [name]: value });
  };

  const handleCanSubmit = (isValid) => {
    setCanSubmit(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit) onSubmit(sponsor);
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
            defaultValue={sponsor.name}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Type"
            name="type"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("type", value)}
            defaultValue={sponsor.type}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Priority"
            name="priority"
            type="number"
            validations={{ required: true, minValue: 1 }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("priority", value)}
            defaultValue={sponsor.priority}
          />
        </GridItem>
        <GridItem sm={12} md={12} lg={12}>
          <Input.TextArea
            label="Description"
            name="description"
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("description", value)}
            defaultValue={sponsor.description}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Website URL"
            name="websiteUrl"
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("websiteUrl", value)}
            defaultValue={sponsor.websiteUrl}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Logo URL"
            name="logoUrl"
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("logoUrl", value)}
            defaultValue={sponsor.logoUrl}
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
