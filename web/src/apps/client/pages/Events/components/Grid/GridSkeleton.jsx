import styles from "./Grid.module.css";
import CardSkeleton from "../Card/CardSkeleton";

const GridSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
};

export default GridSkeleton;
