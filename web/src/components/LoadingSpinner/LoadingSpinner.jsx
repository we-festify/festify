import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = ({
  isLoading = false,
  fullScreen = false,
  size = 64,
  strokeWidth = 4,
}) => {
  if (!isLoading) return null;

  return (
    <div className={styles.backdrop + " " + (fullScreen ? styles.fixed : "")}>
      <div
        className={styles.spinner}
        style={{
          width: size,
          height: size,
          borderWidth: strokeWidth,
        }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
