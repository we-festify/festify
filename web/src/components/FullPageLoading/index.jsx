import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Logo from "../Logo/Logo";
import styles from "./FullPageLoading.module.css";

const FullPageLoading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <Logo />
        <LoadingSpinner isLoading={true} size={30} strokeWidth={2} />
      </div>
    </div>
  );
};

export default FullPageLoading;
