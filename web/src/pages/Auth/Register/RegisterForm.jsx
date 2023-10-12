import React from "react";
import styles from "./../common.module.css";
import { register } from "../../../state/redux/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthError,
  selectAuthLoading,
} from "../../../state/redux/auth/authSlice";
import Logo from "../../../components/Logo/Logo";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      register({
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
    );
  };

  return (
    <div className={styles.form}>
      <Logo className={styles.logo} />
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input type="name" id="name" name="name" placeholder="name" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="email" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="confirm password"
          />
        </div>
        {error && <span className={styles.error}>{error}</span>}
        {loading && <span className={styles.loading}>Loading...</span>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
