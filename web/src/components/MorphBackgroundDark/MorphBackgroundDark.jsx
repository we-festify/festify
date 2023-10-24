import React from "react";
import styles from "./morphBackgroundDark.module.css";

const MorphBackgroundDark = ({ children }) => {
  return (
    <div className={styles.background}>
      <div className={styles.bubble} />
      <div className={styles.bubble} />
      {children}
    </div>
  );
};

export default MorphBackgroundDark;
