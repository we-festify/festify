import React from "react";
import styles from "./../common.module.css";
import { login } from "../../../state/redux/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthError,
  selectAuthLoading,
} from "../../../state/redux/auth/authSlice";
import Logo from "../../../components/Logo/Logo";

const LoginForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      login({ email: e.target.email.value, password: e.target.password.value })
    );
  };

  return (
    <div className={styles.form}>
      <Logo className={styles.logo} />
      <form onSubmit={handleSubmit}>
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
        {error && <span className={styles.error}>{error}</span>}
        {loading && <span className={styles.loading}>Loading...</span>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
