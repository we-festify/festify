import { useState } from "react";
import styles from "./Input.module.css";

const Dropdown = ({
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
  const [value, setValue] = useState(defaultValue);

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
      <select
        className={styles.input + " " + (error ? styles.error : "")}
        defaultValue={defaultValue}
        onChange={(e) => {
          setValue(e.target.value);
          if (onChange) onChange(e.target.value);
        }}
        required={validations?.required}
        readOnly={readOnly}
        onBlur={validate}
        name={name}
      >
        <option value="" disabled>
          Select {label}
        </option>
        {entries?.map((value) => (
          <option className={styles.option} key={value}>
            {value}
          </option>
        ))}
      </select>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Dropdown;
