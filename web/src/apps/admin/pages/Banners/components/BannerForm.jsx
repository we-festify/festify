import { useState } from "react";
import styles from "../Banners.module.css";
import Grid, { GridItem } from "../../../../../components/Grid/Grid";
import Input from "../../../../../components/AdminCommons/Input";

const BannerForm = ({ onSubmit, defaultValue, onChange }) => {
  const [banner, setBanner] = useState(defaultValue || {});
  const [canSubmit, setCanSubmit] = useState(false);

  const handleChange = (name, value) => {
    setBanner({ ...banner, [name]: value });
    if (onChange) onChange({ ...banner, [name]: value });
  };

  const handleCanSubmit = (isValid) => {
    setCanSubmit(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit) onSubmit(banner);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid columns={12}>
        <GridItem sm={12} md={12} lg={12}>
          <Input.TextArea
            label="Text"
            name="text"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("text", value)}
            defaultValue={banner.text}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Dropdown
            label="Variant"
            name="variant"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            entries={["success", "warning", "info", "error"]}
            onChange={(value) => handleChange("variant", value)}
            defaultValue={banner.variant}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Target path"
            name="target"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("target", value)}
            defaultValue={banner.target}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Radio
            label="Is active?"
            entries={["Yes", "No"]}
            validations={{ required: true }}
            onChange={(value) => handleChange("isActive", value === "Yes")}
            defaultValue={banner.isActive ? "Yes" : "No"}
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

export default BannerForm;
