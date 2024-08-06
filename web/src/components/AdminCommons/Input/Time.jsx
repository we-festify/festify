import { useState } from "react";
import styles from "./Input.module.css";

const Time = ({
  label,
  name,
  validations,
  onValidation,
  onChange,
  defaultValue,
  readOnly,
}) => {
  const [error, setError] = useState("");
  const [time, setTime] = useState(defaultValue || "");

  const validate = () => {
    let isValid = true;
    if (validations?.required && !time) {
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
        type="time"
        defaultValue={defaultValue}
        onChange={(e) => {
          setTime(e.target.value);
          if (onChange) onChange(e.target.value);
        }}
        onBlur={validate}
        required={validations?.required}
        readOnly={readOnly}
        className={styles.input + " " + (error ? styles.error : "")}
        name={name}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Time;
