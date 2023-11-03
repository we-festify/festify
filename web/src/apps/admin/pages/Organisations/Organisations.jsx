import React from "react";
import styles from "./Organisations.module.css";
import Card from "../../components/Card/Card";
import OrganisationsList from "./OrganisationsList";

const Organisations = () => {
  return (
    <div className={styles.page}>
      <Card>
        <OrganisationsList />
      </Card>
    </div>
  );
};

export default Organisations;
