import { useState } from "react";
import Grid, { GridItem } from "../../../../../components/Grid/Grid";
import Input from "../../../../../components/AdminCommons/Input";
import styles from "./../Users.module.css";

const Form = ({ onSubmit, defaultValue, onChange, mode = "create" }) => {
  const [user, setUser] = useState(
    defaultValue || {
      name: "",
      email: "",
      password: "",
      role: "",
      organisation: "",
      college: "",
      zipCode: "",
      degree: "",
      yearOfGraduation: "",
      gender: "",
    }
  );
  const [canSubmit, setCanSubmit] = useState(false);

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
    if (onChange) onChange({ ...user, [name]: value });
  };

  const handleCanSubmit = (isValid) => {
    setCanSubmit(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canSubmit) onSubmit(user);
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
            defaultValue={user.name}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={8}>
          <Input.Text
            type="email"
            label="Email"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("email", value)}
            defaultValue={user.email}
          />
        </GridItem>
        {mode === "create" && (
          <GridItem sm={12} md={6} lg={4}>
            <Input.Text
              type="password"
              label="Password"
              validations={{ required: true }}
              onValidation={handleCanSubmit}
              onChange={(value) => handleChange("password", value)}
              defaultValue={user.password}
            />
          </GridItem>
        )}
        <GridItem sm={12} md={6} lg={4}>
          <Input.Dropdown
            label="Role"
            entries={["user", "organiser", "admin"]}
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("role", value)}
            defaultValue={user.role}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Organisation"
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("organisation", value)}
            defaultValue={user.organisation}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="College"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("college", value)}
            defaultValue={user.college}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Zip Code"
            type="number"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("zipCode", value)}
            defaultValue={user.zipCode}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Degree"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("degree", value)}
            defaultValue={user.degree}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Text
            label="Year of Graduation"
            type="number"
            validations={{ required: true }}
            onValidation={handleCanSubmit}
            onChange={(value) => handleChange("yearOfGraduation", value)}
            defaultValue={user.yearOfGraduation}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input.Radio
            label="Gender"
            entries={["male", "female", "other"]}
            validations={{ required: true }}
            onChange={(value) => handleChange("gender", value)}
            defaultValue={user.gender}
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
