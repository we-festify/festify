import React, { useState } from "react";
import styles from "./UpdateInfo.module.css";
import Grid, { GridItem } from "../../../../../../components/Grid/Grid";
import Input from "../../../../atoms/Input";
import Button from "../../../../atoms/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  setUser,
} from "../../../../../../state/redux/auth/authSlice";
import { useUpdateUserMutation } from "../../../../../../state/redux/users/usersApi";
import { toast } from "react-toastify";

const UpdateInfo = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [value, setValue] = useState(user || {});
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleChange = (key, value) => {
    setValue((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(value);
    try {
      const data = await updateUser({
        userId: user?._id,
        user: value,
      }).unwrap();
      dispatch(setUser(data.user));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(
        error.data?.message ||
          error.error?.message ||
          (typeof error.data === "string" && error.data) ||
          "Unable to update profile"
      );
      console.log(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>Personal Info</h2>
      <Grid columns={12}>
        <GridItem sm={12} md={6} lg={4}>
          <Input
            variant="text"
            label="Name"
            name="name"
            defaultValue={user?.name}
            onChange={(value) => handleChange("name", value)}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input
            variant="text"
            label="Email"
            type="email"
            name="email"
            defaultValue={user?.email}
            onChange={(value) => handleChange("email", value)}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input
            variant="radio"
            label="Gender"
            name="gender"
            entries={["male", "female", "other"]}
            defaultValue={user?.gender}
            onChange={(value) => handleChange("gender", value)}
          />
        </GridItem>
      </Grid>
      <h2 className={styles.heading}>College Info</h2>
      <Grid columns={12}>
        <GridItem sm={12} md={6} lg={4}>
          <Input
            variant="text"
            label="College"
            name="college"
            defaultValue={user?.college}
            onChange={(value) => handleChange("college", value)}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input
            variant="text"
            label="Degree"
            name="degree"
            defaultValue={user?.degree}
            onChange={(value) => handleChange("degree", value)}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input
            variant="text"
            label="Year Of Graduation"
            type="number"
            name="year"
            defaultValue={user?.yearOfGraduation}
            onChange={(value) => handleChange("yearOfGraduation", value)}
          />
        </GridItem>
        <GridItem sm={12} md={6} lg={4}>
          <Input
            variant="text"
            label="ZIP Code"
            type="number"
            name="zip"
            defaultValue={user?.zipCode}
            onChange={(value) => handleChange("zipCode", value)}
          />
        </GridItem>
      </Grid>
      <Grid columns={12}>
        <GridItem sm={12} md={12} lg={12}>
          <Button variant="primary" type="submit" disabled={isLoading}>
            Update
          </Button>
        </GridItem>
      </Grid>
    </form>
  );
};

export default UpdateInfo;
