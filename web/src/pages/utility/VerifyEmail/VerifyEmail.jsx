import React, { useEffect, useState } from "react";
import styles from "./VerifyEmail.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../../../services/auth";
import MorphBackgroundDark from "../../../components/MorphBackgroundDark/MorphBackgroundDark";

const VerifyEmail = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!token) return setError("Invalid token");
    setLoading(true);
    authService
      .verifyEmail(token)
      .then((res) => {
        setMessage(res.message);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location]);

  const handleGoHome = (e) => {
    e.preventDefault();
    navigate("/", { replace: true });
  };

  return (
    <MorphBackgroundDark>
      <div className={styles.container}>
        <p className={styles.subtitle}>
          {loading ? "Verifying..." : error ? error : message}
        </p>
        <button className={styles.button} onClick={handleGoHome}>
          Go to Home
        </button>
      </div>
    </MorphBackgroundDark>
  );
};

export default VerifyEmail;
