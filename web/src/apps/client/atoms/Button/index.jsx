import styles from "./Button.module.css";

const Button = ({ variant = "primary", className, ...props }) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className}`}
      {...props}
    />
  );
};

export default Button;
