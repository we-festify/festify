import React, { useState } from "react";
import styles from "./../common.module.css";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../state/redux/auth/authSlice";
import Logo from "../../../components/Logo/Logo";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../../state/redux/auth/authApi";
import FormProgress from "../../../components/FormProgress/FormProgress";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState({});
  // paginated register form
  const [page, setPage] = useState(0);
  const pages = [
    {
      label: "Account",
      fields: [
        {
          label: "Name",
          name: "name",
          type: "text",
          placeholder: "name",
          required: true,
          autoComplete: "name",
        },
        {
          label: "Email",
          name: "email",
          type: "email",
          placeholder: "email",
          required: true,
          autoComplete: "email",
        },
        {
          label: "Password",
          name: "password",
          type: "password",
          placeholder: "password",
          required: true,
          autoComplete: "new-password",
        },
        {
          label: "Confirm Password",
          name: "confirmPassword",
          type: "password",
          placeholder: "confirm password",
          required: true,
          autoComplete: "new-password",
        },
      ],
      validate: () => {
        const requiredFields = pages[page].fields.filter(
          (field) => field.required
        );
        for (const field of requiredFields) {
          if (!formValues[field.name]) {
            setError(`${field.label} is required`);
            return false;
          }
        }
        if (formValues.password !== formValues.confirmPassword) {
          setError("Passwords do not match");
          return false;
        }
        return true;
      },
    },
    {
      label: "College",
      fields: [
        {
          label: "College",
          name: "college",
          placeholder: "college",
          required: true,
        },
        {
          label: "ZIP Code",
          name: "zipCode",
          placeholder: "zip code",
          required: true,
        },
        {
          label: "Degree",
          name: "degree",
          placeholder: "degree",
          required: true,
        },
        {
          label: "Graduation Year",
          name: "yearOfGraduation",
          placeholder: "graduation year",
          required: true,
        },
      ],
      validate: () => {
        const requiredFields = pages[page].fields.filter(
          (field) => field.required
        );
        for (const field of requiredFields) {
          if (!formValues[field.name]) {
            setError(`${field.label} is required`);
            return false;
          }
        }
        return true;
      },
    },
    {
      label: "Personal",
      fields: [
        {
          label: "Gender",
          name: "gender",
          type: "radio",
          options: ["male", "female", "other"],
          required: true,
        },
      ],
      validate: () => {
        const requiredFields = pages[page].fields.filter(
          (field) => field.required
        );
        for (const field of requiredFields) {
          if (!formValues[field.name]) {
            setError(`${field.label} is required`);
            return false;
          }
        }
        return true;
      },
    },
  ];

  const hasNext = () => {
    return page < pages.length - 1;
  };

  const hasPrevious = () => {
    return page > 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (hasNext() && pages[page].validate()) {
      setPage(page + 1);
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    if (hasPrevious()) {
      setPage(page - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await register(formValues).unwrap();
      dispatch(setCredentials(data));
    } catch (error) {
      setError(error.data?.message);
    }
  };

  return (
    <div className={styles.form}>
      <Logo className={styles.logo} />
      <div className={styles.progress}>
        <FormProgress pages={pages} currentPageIndex={page} />
      </div>
      <form onSubmit={handleSubmit}>
        {pages[page].fields.map((field) => {
          let inputElement;
          switch (field.type) {
            case "radio":
              inputElement = (
                <div className={styles.radioGroup}>
                  {field.options.map((option) => (
                    <div key={option} className={styles.radio}>
                      <input
                        type="radio"
                        name={field.name}
                        id={option}
                        value={option}
                        onChange={handleChange}
                        required={field.required}
                        defaultChecked={formValues[field.name] === option}
                      />
                      <label htmlFor={option}>{option}</label>
                    </div>
                  ))}
                </div>
              );
              break;
            default:
              inputElement = (
                <input
                  className={styles.input}
                  type={field.type || "text"}
                  name={field.name}
                  id={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  onChange={handleChange}
                  defaultValue={formValues[field.name] || ""}
                  autoComplete={field.autoComplete}
                />
              );
              break;
          }
          return (
            <div key={field.name} className={styles.formGroup}>
              <label htmlFor={field.name} className={styles.label}>
                {field.label}
              </label>
              {inputElement}
            </div>
          );
        })}
        {error && <span className={styles.error}>{error}</span>}
        <div className={styles.actions}>
          {hasPrevious() && (
            <button
              className={styles.secondary}
              disabled={isLoading}
              type="button"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
          <button
            className={styles.primary}
            disabled={isLoading}
            type={page === pages.length - 1 ? "submit" : "button"}
            onClick={page === pages.length - 1 ? null : handleNext}
          >
            {page === pages.length - 1 ? "Register" : "Next"}
          </button>
        </div>
        <div className={styles.info}>
          <span>Already have an account?</span>
          <Link to="/a/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
