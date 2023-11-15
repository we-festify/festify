import React, { useEffect, useState } from "react";
import styles from "./Users.module.css";
import { useCreateUserMutation } from "../../../../state/redux/users/usersApi";
import Card from "../../../organiser/components/Card/Card";
import UserForm from "./components/UserForm";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

const CreateUser = () => {
  const [user, setUser] = useState({});
  const [createUser, { error, isSuccess, isLoading }] = useCreateUserMutation();

  const handleSubmit = () => {
    createUser(user);
  };

  useEffect(() => {
    if (isSuccess) {
      setUser({});
    }
  }, [isSuccess]);

  return (
    <div className={styles.page}>
      <Card>
        <div className={styles.createUserCard}>
          <h4 className={styles.title}>User Details</h4>
          <p className={styles.subtitle}>
            Enter the details of the user you want to create.
            {error && <p className={styles.error}>{error?.data?.message}</p>}
          </p>
          <UserForm
            defaultValue={user}
            onSubmit={handleSubmit}
            onChange={(user) => setUser(user)}
          />
        </div>
      </Card>
      <LoadingSpinner isLoading={isLoading} fullScreen={true} />
    </div>
  );
};

export default CreateUser;
