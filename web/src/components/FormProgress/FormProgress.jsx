import React from "react";
import styles from "./FormProgress.module.css";
import { BsCheck } from "react-icons/bs";

const FormProgress = ({ pages, currentPageIndex }) => {
  return (
    <div className={styles.progress}>
      {pages.map((item, index) => (
        <React.Fragment key={index}>
          <div
            className={`${styles.progressItem} ${
              index < currentPageIndex ? styles.completed : ""
            } ${index === currentPageIndex ? styles.active : ""}`}
          >
            <div className={styles.icon}>
              {index < currentPageIndex ? (
                <BsCheck size={20} />
              ) : index === currentPageIndex ? (
                <span className={styles.dot} />
              ) : (
                <span className={styles.number}>{index + 1}</span>
              )}
            </div>
            <div className={styles.label}>{item.label}</div>
          </div>
          {index < pages.length - 1 && (
            <div
              className={`${styles.line} ${
                index < currentPageIndex ? styles.completed : ""
              }`}
              style={{ width: `${100 / (pages.length - 1)}%` }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FormProgress;
