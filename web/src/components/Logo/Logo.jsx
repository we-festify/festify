import styles from "./logo.module.css";
import { Link } from "react-router-dom";

const Logo = ({ className, light = true }) => {
  return (
    <Link
      to="/"
      className={styles.logo + " " + className}
      style={{
        color: light ? "white" : "var(--color-primary-500)",
      }}
    >
      festify
    </Link>
  );
};

export default Logo;
