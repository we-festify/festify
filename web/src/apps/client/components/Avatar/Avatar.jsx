import React from "react";
import styles from "./Avatar.module.css";

const Avatar = ({ image, name, size }) => {
  const extractNumber = (str) => {
    if (!str) return null;
    if (typeof str === "number") return str;
    const num = str.match(/\d+/g);
    return num ? num[0] : null;
  };

  const getFontSize = (size) => {
    if (!size) return null;
    if (typeof size === "number") return size / 2;
    const num = extractNumber(size);
    return size.replace(num, num / 2);
  };

  return image ? (
    <img
      src={image}
      alt={name || "Avatar"}
      className={styles.avatar}
      style={{ width: size, height: size }}
    />
  ) : (
    <span
      className={styles.avatar}
      style={{ width: size, height: size, fontSize: getFontSize(size) }}
    >
      {name
        .split(" ")
        .map((name) => name.charAt(0).toUpperCase())
        .slice(0, 2)}
    </span>
  );
};

export default Avatar;
