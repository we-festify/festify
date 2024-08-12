import { useState } from "react";
import styles from "./Input.module.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const Dropdown = ({
  label,
  name,
  entries,
  validations,
  onValidation,
  onChange,
  defaultValue,
  readOnly,
  ...props
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
      <Select
        {...props}
        className={error ? styles.error : ""}
        defaultValue={defaultValue}
        onValueChange={(value) => {
          setValue(value);
          if (onChange) onChange(value);
        }}
        required={validations?.required}
        onBlur={validate}
        name={name}
      >
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {entries?.map((value) => (
            <SelectItem key={value} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Dropdown;
