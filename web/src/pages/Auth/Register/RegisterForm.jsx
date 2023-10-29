import React, { useState } from "react";
import styles from "./../common.module.css";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../state/redux/auth/authSlice";
import Logo from "../../../components/Logo/Logo";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../../state/redux/auth/authApi";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = e.target.elements;
    if (password.value !== confirmPassword.value) {
      setError("Passwords do not match");
      return;
    }
    try {
      const data = await register({
        name: name.value,
        email: email.value,
        password: password.value,
      }).unwrap();
      dispatch(setCredentials(data));
    } catch (error) {
      setError(error.data?.message);
    }
  };

  return (
    <div className={styles.form}>
      <Logo className={styles.logo} />
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="name"
            id="name"
            name="name"
            placeholder="name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="confirm password"
            required
          />
        </div>
        {error && <span className={styles.error}>{error}</span>}
        {isLoading && <span className={styles.loading}>Loading...</span>}
        <button type="submit">Register</button>
        <div className={styles.info}>
          <span>Already have an account?</span>
          <Link to="/a/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
