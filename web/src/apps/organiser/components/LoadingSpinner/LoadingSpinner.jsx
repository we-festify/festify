import React from "react";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = ({ isLoading = false, fullScreen }) => {
  if (!isLoading) return null;

  return (
    <div className={styles.backdrop + " " + (fullScreen ? styles.fixed : "")}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
