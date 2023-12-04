import React from "react";
import styles from "./BottomNavigationBar.module.css";

const BottomNavigationBar = ({ tabs, activeTabIndex, onTabChange }) => {
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => {
          const isActive = index === activeTabIndex;
          return (
            <div
              className={`${styles.tab} ${isActive ? styles.active : ""}`}
              key={tab.path}
            >
              <button onClick={() => onTabChange(index)}>
                {isActive ? tab.activeIcon : tab.icon}
                <span className={styles.name}>{tab.name}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigationBar;
