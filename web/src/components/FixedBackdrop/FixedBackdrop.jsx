import styles from "./FixedBackdrop.module.css";

const FixedBackdrop = ({ children }) => {
  return (
    <div className={styles.background}>
      <div className={styles.bubble} />
      <div className={styles.bubble} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default FixedBackdrop;
