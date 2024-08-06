import styles from "./DetailsSkeleton.module.css";
import Skeleton from "../../../../../../components/Skeleton/Skeleton";

const DetailsSkeleton = ({ event = {} }) => {
  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <Skeleton width="6rem" height="1.5rem" />
      </div>
      <div className={styles.image}>
        <Skeleton className={styles.img} />
      </div>
      <div className={styles.details}>
        <Skeleton width="7rem" height="1.5rem" className={styles.heading} />
        <Skeleton height="1.2rem" className={styles.text} />
        <Skeleton width="70%" height="1.2rem" className={styles.text} />
        <Skeleton width="7rem" height="1.5rem" className={styles.heading} />
        <Skeleton height="1.2rem" className={styles.text} />
        <Skeleton height="1.2rem" className={styles.text} />
        <Skeleton width="40%" height="1.2rem" className={styles.text} />
        <Skeleton height="1.2rem" className={styles.text} />
        <Skeleton width="7rem" height="1.5rem" className={styles.heading} />
        <div className={styles.actions}>
          <Skeleton flex={1} height="2rem" />
          <Skeleton flex={1} height="2rem" />
        </div>
      </div>
    </div>
  );
};

export default DetailsSkeleton;
