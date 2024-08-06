import styles from "./Card.module.css";
import Skeleton from "../../../../../../components/Skeleton/Skeleton";

const CardSkeleton = () => {
  return (
    <Skeleton className={styles.card}>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: "0.5rem",
          padding: "1rem",
        }}
      >
        <Skeleton height="1rem" width="5rem" />
        <Skeleton height="0.7rem" />
        <Skeleton height="0.7rem" width="7rem" />
      </div>
    </Skeleton>
  );
};

export default CardSkeleton;
