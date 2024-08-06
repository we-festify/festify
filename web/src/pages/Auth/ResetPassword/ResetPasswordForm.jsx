import { useState } from "react";
import styles from "./../common.module.css";
import Logo from "../../../components/Logo/Logo";
import { Link, useLocation } from "react-router-dom";
import { useResetPasswordMutation } from "../../../state/redux/auth/authApi";

const ResetPasswordForm = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const validate = (password, confirmPassword) => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    const { password, confirmPassword } = e.target.elements;
    if (!validate(password.value, confirmPassword.value)) return;
    try {
      const data = await resetPassword({
        token,
        password: password.value,
      }).unwrap();
      setMessage(data.message);
    } catch (error) {
      setError(error.data?.message);
    }
  };

  return (
    <div className={styles.form}>
      <Logo className={styles.logo} />
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            required
            autoComplete="new-password"
            onChange={() => setError(null)}
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
            autoComplete="new-password"
            onChange={() => setError(null)}
          />
        </div>
        {error && <span className={styles.error}>{error}</span>}
        {message && <span className={styles.message}>{message}</span>}
        <button className={styles.primary} disabled={isLoading} type="submit">
          {isLoading ? "Loading..." : "Reset Password"}
        </button>
        <div className={styles.info}>
          <span>Want to login?</span>
          <Link to="/a/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
