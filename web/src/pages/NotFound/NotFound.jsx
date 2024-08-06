import styles from "./NotFound.module.css";
import { useNavigate } from "react-router-dom";
import FixedBackdrop from "../../components/FixedBackdrop/FixedBackdrop";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1, { replace: true });
  };

  return (
    <FixedBackdrop>
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>
          Oops! We can't seem to find the page you're looking for.
        </p>
        <button className={styles.button} onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </FixedBackdrop>
  );
};

export default NotFound;
