import React from "react";
import styles from "./Forbidden.module.css";
import MorphBackgroundDark from "../../components/MorphBackgroundDark/MorphBackgroundDark";
import { useNavigate } from "react-router-dom";

const Forbidden = ({ message }) => {
  const navigate = useNavigate();

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1, { replace: true });
  };

  return (
    <MorphBackgroundDark>
      <div className={styles.container}>
        <h1 className={styles.title}>403</h1>
        <p className={styles.subtitle}>
          {message || "You don't have permission to access this page."}
        </p>
        <button className={styles.button} onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </MorphBackgroundDark>
  );
};

export default Forbidden;
