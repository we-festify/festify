import React, { useState } from "react";
import styles from "./Input.module.css";

const Radio = ({
  label,
  name,
  entries,
  validations,
  onValidation,
  onChange,
  defaultValue,
  readOnly,
}) => {
  const [error, setError] = useState("");
  const [value, setValue] = useState("");

  const validate = () => {
    let isValid = true;
    if (validations?.required && !value) {
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
      <div className={styles.radioButtons}>
        {entries?.map((value) => (
          <div className={styles.radioButton} key={value}>
            <input
              type="radio"
              defaultChecked={defaultValue === value}
              onChange={(e) => {
                setValue(e.target.value);
                if (onChange) onChange(e.target.value);
              }}
              onBlur={validate}
              required={validations?.required}
              readOnly={readOnly}
              className={styles.input}
              name={name}
            />
            <label htmlFor={value?.toLowerCase()}>{value}</label>
          </div>
        ))}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Radio;