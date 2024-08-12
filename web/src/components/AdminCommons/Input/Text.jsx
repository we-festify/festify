import { useState } from "react";
import styles from "./Input.module.css";
import { Input } from "./../ui/input";
import Help from "../Help/Help";

const Text = ({
  type,
  name,
  label,
  validations,
  onChange,
  onValidation,
  defaultValue,
  readOnly,
  help,
  ...props
}) => {
  const [error, setError] = useState("");
  const [value, setValue] = useState(defaultValue || "");

  const validate = () => {
    let isValid = true;
    if (validations?.required && !value) {
      setError(`${label} is required`);
      isValid = false;
    }
    if (validations?.minLength && value.length < validations.minLength) {
      setError(`${label} must be at least ${validations.minLength} characters`);
      isValid = false;
    }
    if (validations?.maxLength && value.length > validations.maxLength) {
      setError(`${label} must be at most ${validations.maxLength} characters`);
      isValid = false;
    }
    if (validations?.minValue && value < validations.minValue) {
      setError(`${label} must be at least ${validations.minValue}`);
      isValid = false;
    }
    if (validations?.maxValue && value > validations.maxValue) {
      setError(`${label} must be at most ${validations.maxValue}`);
      isValid = false;
    }
    if (validations?.pattern && !validations.pattern.test(value)) {
      setError(`${label} is invalid`);
      isValid = false;
    }
    if (onValidation) onValidation(isValid);
    if (isValid) setError("");
    return isValid;
  };

  return (
    <div className={styles.group}>
      <label className={styles.label}>
        {label} {help && <Help size={14}>{help}</Help>}
      </label>
      <Input
        {...props}
        type={type}
        defaultValue={defaultValue}
        onChange={(e) => {
          setValue(e.target.value);
          if (onChange) onChange(e.target.value);
        }}
        required={validations?.required}
        min={validations?.minValue}
        max={validations?.maxValue}
        minLength={validations?.minLength}
        maxLength={validations?.maxLength}
        readOnly={readOnly}
        onBlur={validate}
        name={name}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Text;
