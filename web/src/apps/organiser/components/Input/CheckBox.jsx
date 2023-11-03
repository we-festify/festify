import React, { useState } from "react";
import styles from "./Input.module.css";

const CheckBox = ({
  label,
  name,
  entries,
  validations,
  onValidation,
  onChange,
  defaultValues,
  readOnly,
}) => {
  const [error, setError] = useState("");
  const [values, setValues] = useState([]);

  const validate = () => {
    let isValid = true;
    if (validations?.required && values.length === 0) {
      setError(`${label} is required`);
      isValid = false;
    }
    if (validations?.minCount && values.length < validations.minCount) {
      setError(`${label} must have at least ${validations.minCount} entries`);
      isValid = false;
    }
    if (validations?.maxCount && values.length > validations.maxCount) {
      setError(`${label} must have at most ${validations.maxCount} entries`);
      isValid = false;
    }
    if (onValidation) onValidation(isValid);
    if (isValid) setError("");
    return isValid;
  };

  return (
    <div className={styles.group}>
      <label className={styles.label}>{label}</label>
      <div className={styles.checkboxes}>
        {entries?.map((value) => (
          <div className={styles.checkbox} key={value}>
            <input
              type="checkbox"
              name={name}
              defaultChecked={defaultValues?.includes(value)}
              onChange={(e) => {
                if (e.target.checked) {
                  setValues([...values, e.target.value]);
                } else {
                  setValues(values.filter((v) => v !== e.target.value));
                }
                if (onChange) onChange(e.target.value);
              }}
              required={validations?.required}
              readOnly={readOnly}
              onBlur={validate}
              className={styles.input}
            />
            <label htmlFor={value?.toLowerCase()}>{value}</label>
          </div>
        ))}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default CheckBox;
