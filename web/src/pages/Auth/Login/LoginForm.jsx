import { useState } from "react";
import styles from "./../common.module.css";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../state/redux/auth/authSlice";
import Logo from "../../../components/Logo/Logo";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../../state/redux/auth/authApi";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const { email, password } = e.target.elements;
    try {
      const data = await login({
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
          <Link className={styles.forgotPassword} to="/a/forgot-password">
            Forgot Password?
          </Link>
        </div>
        {error && <span className={styles.error}>{error}</span>}
        <button className={styles.primary} disabled={isLoading} type="submit">
          {isLoading ? "Loading..." : "Login"}
        </button>
        <div className={styles.info}>
          <span>Don't have an account?</span>
          <Link to="/a/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
