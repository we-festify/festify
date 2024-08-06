import { useState } from "react";
import Grid, { GridItem } from "../../../../../components/Grid/Grid";
import Input from "../../../../../components/AdminCommons/Input";
import styles from "./../Organisations.module.css";

const OrganisationForm = ({ onSubmit, defaultValue, onChange }) => {
  const [organisation, setOrganisation] = useState(
    defaultValue || {
      name: "",
    }
  );
  const [canSubmit, setCanSubmit] = useState(false);

  const handleChange = (name, value) => {
    setOrganisation({ ...organisation, [name]: value });
    if (onChange) onChange({ ...organisation, [name]: value });
  };

  const handleCanSubmit = (isValid) => {
    setCanSubmit(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit) onSubmit(organisation);
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
            defaultValue={organisation.name}
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

export default OrganisationForm;
