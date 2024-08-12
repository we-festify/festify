import { useState } from "react";
import styles from "./Input.module.css";
import { Input } from "../ui/input";

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
  // add 5:30 to the time
  if (defaultValue) {
    defaultValue = new Date(
      new Date(defaultValue).getTime() + 5.5 * 60 * 60 * 1000
    )
      .toISOString()
      .slice(0, -8);
  }
  const [datetime, setDateTime] = useState(defaultValue || "");

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
      <Input
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
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default DateTime;
