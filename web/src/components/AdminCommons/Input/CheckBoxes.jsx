import { useState } from "react";
import styles from "./Input.module.css";

const CheckBoxes = ({
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
  const [values, setValues] = useState(defaultValues || {});

  const validate = () => {
    let isValid = true;
    const selectedValues = Object.keys(values).filter((key) => values[key]);
    if (validations?.required && selectedValues.length === 0) {
      setError(`${label} is required`);
      isValid = false;
    }
    if (validations?.minCount && selectedValues.length < validations.minCount) {
      setError(`${label} must have at least ${validations.minCount} entries`);
      isValid = false;
    }
    if (validations?.maxCount && selectedValues.length > validations.maxCount) {
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
              defaultChecked={defaultValues?.[value] || false}
              onChange={(e) => {
                const newValues = { ...values };
                if (e.target.checked) newValues[value] = true;
                else delete newValues[value];
                setValues(newValues);
                console.log(newValues);
                if (onChange) onChange(Object.keys(newValues));
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

export default CheckBoxes;
