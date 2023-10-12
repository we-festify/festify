import React from "react";
import styles from "./morphBackgroundDark.module.css";

const MorphBackgroundDark = ({ children }) => {
  return (
    <div className={styles.background}>
      {children}
      <div className={styles.bubble} />
      <div className={styles.bubble} />
    </div>
  );
};

export default MorphBackgroundDark;
