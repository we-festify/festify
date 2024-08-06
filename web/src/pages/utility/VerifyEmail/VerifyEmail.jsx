import { useEffect, useState } from "react";
import styles from "./VerifyEmail.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyEmailMutation } from "../../../state/redux/auth/authApi";
import FixedBackdrop from "../../../components/FixedBackdrop/FixedBackdrop";

const VerifyEmail = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const navigate = useNavigate();
  const [verifyEmail, { isLoading, error, isSuccess }] =
    useVerifyEmailMutation();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!token)
      setMessage(
        "Invalid token. Please try again later. If the problem persists, contact support."
      );
    verifyEmail(token);
  }, [location, token, verifyEmail]);

  useEffect(() => {
    if (isSuccess) setMessage("Email verified successfully.");
  }, [isSuccess]);

  const handleGoHome = (e) => {
    e.preventDefault();
    navigate("/", { replace: true });
  };

  return (
    <FixedBackdrop>
      <div className={styles.container}>
        <p className={styles.subtitle}>
          {isLoading ? "Verifying..." : error ? error.data?.message : message}
        </p>
        <button className={styles.button} onClick={handleGoHome}>
          Go to Home
        </button>
      </div>
    </FixedBackdrop>
  );
};

export default VerifyEmail;
