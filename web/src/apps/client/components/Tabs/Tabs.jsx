import React, { useState } from "react";
import styles from "./Tabs.module.css";

const Tabs = ({ items }) => {
  if (!items || items.length < 1)
    throw new Error("Tabs must have at least one item");
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          {items.map((item, index) => (
            <div
              key={item.label}
              className={
                styles.tab +
                " " +
                (index === selectedIndex ? styles.active : "")
              }
              onClick={() => setSelectedIndex(index)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.content}>{items[selectedIndex]?.component}</div>
    </div>
  );
};

export default Tabs;
