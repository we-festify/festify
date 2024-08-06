import styles from "./Timeline.module.css";
import { formatDateTime } from "../../../../utils/time";

const Timeline = ({ timeline }) => {
  const today = new Date();
  return (
    <div className={styles.timeline}>
      {timeline?.map((item, index) => (
        <div
          className={
            styles.item + " " + (new Date(item.time) < today ? styles.past : "")
          }
          key={`${item.time}-${index}`}
        >
          <p className={styles.title}>{item.title}</p>
          <p className={styles.time}>
            {formatDateTime(item.time)} <span>({item.subtitle})</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
