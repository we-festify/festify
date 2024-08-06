import { useState } from "react";
import styles from "./../common.module.css";
import Logo from "../../../components/Logo/Logo";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../../../state/redux/auth/authApi";

const ForgotPasswordForm = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    const { email } = e.target.elements;
    try {
      const data = await forgotPassword(email.value).unwrap();
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            required
          />
        </div>
        {error && <span className={styles.error}>{error}</span>}
        {message && <span className={styles.message}>{message}</span>}
        <button className={styles.primary} disabled={isLoading} type="submit">
          {isLoading ? "Loading..." : "Send Email"}
        </button>
        <div className={styles.info}>
          <span>Want to login?</span>
          <Link to="/a/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
