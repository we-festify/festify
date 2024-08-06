import { useState } from "react";
import styles from "./Input.module.css";

const Tags = ({
  label,
  name,
  validations,
  onChange,
  defaultValue,
  readOnly,
  onValidation,
}) => {
  const [tags, setTags] = useState(defaultValue || []);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    let isValid = true;
    if (validations?.required && !tags) {
      setError(`${label} is required`);
      isValid = false;
    }
    if (validations?.minLength && tags.length < validations.minLength) {
      setError(`${label} must be at least ${validations.minLength} characters`);
      isValid = false;
    }
    if (validations?.maxLength && tags.length > validations.maxLength) {
      setError(`${label} must be at most ${validations.maxLength} characters`);
      isValid = false;
    }
    if (onValidation) onValidation(isValid);
    if (isValid) setError("");
    return isValid;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && value) {
      const newTags = [...tags, ...value.split(",").map((tag) => tag.trim())];
      setTags(newTags);
      setValue("");
      e.target.value = "";
      if (onChange) onChange(newTags);
    }
  };

  const handleRemove = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
    if (onChange) onChange(newTags);
  };

  return (
    <div className={styles.group}>
      <label className={styles.label}>{label}</label>
      <input
        type="text"
        defaultValue={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        minLength={validations?.minLength}
        maxLength={validations?.maxLength}
        pattern={validations?.pattern}
        readOnly={readOnly}
        onBlur={validate}
        className={styles.input + " " + (error ? styles.error : "")}
        name={name}
      />
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.tags}>
        {tags.map((tag, index) => (
          <div key={tag} className={styles.tag}>
            <span>{tag}</span>
            <button
              className={styles.removeTag}
              onClick={() => handleRemove(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
