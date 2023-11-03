import React from "react";
import styles from "./Users.module.css";
import Card from "../../components/Card/Card";
import UsersList from "./UsersList";

const Users = () => {
  return (
    <div className={styles.page}>
      <Card>
        <UsersList />
      </Card>
    </div>
  );
};

export default Users;
