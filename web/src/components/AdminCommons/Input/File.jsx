import { useState } from "react";
import styles from "./Input.module.css";

const File = ({
  label,
  name,
  accept,
  validations,
  onValidation,
  onChange,
  defaultValue,
  readOnly,
}) => {
  const [error, setError] = useState("");
  const [file, setFile] = useState(defaultValue || "");

  const validate = () => {
    let isValid = true;
    if (validations?.required && !file) {
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
        type="file"
        defaultValue={defaultValue}
        onChange={(e) => {
          setFile(e.target.value);
          if (onChange) onChange(e.target.value);
        }}
        onBlur={validate}
        required={validations?.required}
        readOnly={readOnly}
        className={styles.input + " " + (error ? styles.error : "")}
        name={name}
        accept={accept}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default File;
