import styles from "./BottomNavigationBar.module.css";

const BottomNavigationBar = ({
  tabs,
  activeTabIndex,
  onTabChange,
  showLabels = true,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => {
          const isActive = index === activeTabIndex;
          return (
            <div
              className={`${styles.tab} ${isActive ? styles.active : ""}`}
              key={`${tab.name}-${index}`}
            >
              <button onClick={() => onTabChange(index)}>
                {isActive ? tab.activeIcon || tab.icon : tab.icon}
                {showLabels && (
                  <span className={styles.name}>{tab.name || tab.label}</span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigationBar;
