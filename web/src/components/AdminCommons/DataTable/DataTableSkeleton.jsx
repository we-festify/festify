import styles from "./DataTableSkeleton.module.css";
import Skeleton from "../../Skeleton/Skeleton";

const DataTableSkeleton = ({ rows = 5 }) => {
  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Skeleton width="7rem" height="1.5rem" borderRadius="0.2rem" />
        </div>
        <div className={styles.actions}>
          <Skeleton width="4rem" height="1.5rem" borderRadius="0.2rem" />
          <Skeleton width="8rem" height="1.5rem" borderRadius="0.2rem" />
          <Skeleton width="4rem" height="1.5rem" borderRadius="0.2rem" />
        </div>
      </div>
      <div className={styles.body}>
        {Array(rows)
          .fill()
          .map((_, i) => (
            <div key={i} className={styles.row}>
              <div className={styles.cell} style={{ flex: 1 }}>
                <Skeleton height="2rem" borderRadius="0.2rem" />
              </div>
              <div className={styles.cell} style={{ flex: 3 }}>
                <Skeleton height="2rem" borderRadius="0.2rem" />
              </div>
              <div className={styles.cell} style={{ flex: 8 }}>
                <Skeleton height="2rem" borderRadius="0.2rem" />
              </div>
            </div>
          ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.pagination}>
          <Skeleton width="12rem" height="1.5rem" borderRadius="0.2rem" />
        </div>
      </div>
    </div>
  );
};

export default DataTableSkeleton;
