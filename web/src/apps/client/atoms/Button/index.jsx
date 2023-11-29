import React from "react";
import styles from "./Button.module.css";

const Button = ({ variant = "primary", ...props }) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...props} />
  );
};

export default Button;
