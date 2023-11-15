import React from "react";
import styles from "./Skeleton.module.css";

const Skeleton = ({
  variant,
  width,
  height,
  borderRadius,
  animation = "pulse",
  flex,
}) => {
  return (
    <div
      className={styles.skeleton + " " + styles[animation]}
      style={{
        width: variant === "circle" ? Math.max(width, height) : width,
        height: variant === "circle" ? Math.max(width, height) : height,
        borderRadius: variant === "circle" ? "50%" : borderRadius,
        flex: flex,
      }}
    ></div>
  );
};

export default Skeleton;
