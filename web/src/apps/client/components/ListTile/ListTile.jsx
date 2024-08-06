import styles from "./ListTile.module.css";

const ListTile = ({ leading, trailing, title, subtitle }) => {
  return (
    <div className={styles.listTile}>
      <div className={styles.left}>
        {leading}
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>
      <div className={styles.trailing}>{trailing}</div>
    </div>
  );
};

export default ListTile;
