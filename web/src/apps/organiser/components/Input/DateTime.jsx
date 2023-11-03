import React, { useState } from "react";
import styles from "./Input.module.css";

const DateTime = ({
  label,
  name,
  validations,
  onValidation,
  onChange,
  defaultValue,
  readOnly,
}) => {
  const [error, setError] = useState("");
  const [datetime, setDateTime] = useState("");

  const validate = () => {
    let isValid = true;
    if (validations?.required && !datetime) {
      setError(`${label} is required`);
      isValid = false;
    }
    if (onValidation) onValidation(isValid);
    if (isValid) setError("");
    return isValid;
  };

  return (
    <div className={styles.group}>
      <label className={styles.label}>{label}</label>
      <input
        type="datetime-local"
        name={name}
        defaultValue={defaultValue}
        onChange={(e) => {
          setDateTime(e.target.value);
          if (onChange) onChange(e.target.value);
        }}
        onBlur={validate}
        required={validations?.required}
        readOnly={readOnly}
        className={styles.input + " " + (error ? styles.error : "")}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default DateTime;
