import styles from "./Tabs.module.css";

const Tabs = ({ tabs, activeIndex, onTabChange }) => {
  if (!tabs || tabs.length < 1)
    throw new Error("Tabs must have at least one item");

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tabs.map((item, index) => (
          <div
            key={item.label || item.name}
            className={
              styles.tab + " " + (index === activeIndex ? styles.active : "")
            }
            onClick={() => onTabChange(index)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
