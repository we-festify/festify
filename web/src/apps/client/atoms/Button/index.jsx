import styles from "./Button.module.css";

const Button = ({ variant = "primary", className, ...props }) => {
  return (
    <button
      className={`${className} ${styles.button} ${styles[variant]}`}
      {...props}
    />
  );
};

export default Button;
