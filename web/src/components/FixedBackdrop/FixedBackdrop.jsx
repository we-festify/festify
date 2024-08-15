import styles from "./FixedBackdrop.module.css";

const FixedBackdrop = ({ children }) => {
  return (
    <div className={styles.background + " bg-grid bg-grid-md md:bg-grid-lg"}>
      {/* <div className={styles.bubble} />
      <div className={styles.bubble} /> */}
      <div className={styles.bgGradientOverlay} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default FixedBackdrop;
