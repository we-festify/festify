import React from "react";
import styles from "./Avatar.module.css";
import { ReactComponent as F1 } from "./../../../../assets/images/avatars/f/1.svg";
import { ReactComponent as F2 } from "./../../../../assets/images/avatars/f/2.svg";
import { ReactComponent as F3 } from "./../../../../assets/images/avatars/f/3.svg";
import { ReactComponent as F4 } from "./../../../../assets/images/avatars/f/4.svg";
import { ReactComponent as F5 } from "./../../../../assets/images/avatars/f/5.svg";
import { ReactComponent as F6 } from "./../../../../assets/images/avatars/f/6.svg";
import { ReactComponent as F7 } from "./../../../../assets/images/avatars/f/7.svg";
import { ReactComponent as F8 } from "./../../../../assets/images/avatars/f/8.svg";
import { ReactComponent as F9 } from "./../../../../assets/images/avatars/f/9.svg";
import { ReactComponent as F10 } from "./../../../../assets/images/avatars/f/10.svg";
import { ReactComponent as F11 } from "./../../../../assets/images/avatars/f/11.svg";
import { ReactComponent as F12 } from "./../../../../assets/images/avatars/f/12.svg";
import { ReactComponent as F13 } from "./../../../../assets/images/avatars/f/13.svg";
import { ReactComponent as F14 } from "./../../../../assets/images/avatars/f/14.svg";
import { ReactComponent as F15 } from "./../../../../assets/images/avatars/f/15.svg";
import { ReactComponent as F16 } from "./../../../../assets/images/avatars/f/16.svg";
import { ReactComponent as F17 } from "./../../../../assets/images/avatars/f/17.svg";
import { ReactComponent as F18 } from "./../../../../assets/images/avatars/f/18.svg";
import { ReactComponent as C1 } from "./../../../../assets/images/avatars/c/1.svg";
import { ReactComponent as C2 } from "./../../../../assets/images/avatars/c/2.svg";
import { ReactComponent as C3 } from "./../../../../assets/images/avatars/c/3.svg";
import { ReactComponent as C4 } from "./../../../../assets/images/avatars/c/4.svg";
import { ReactComponent as C5 } from "./../../../../assets/images/avatars/c/5.svg";
import { ReactComponent as C6 } from "./../../../../assets/images/avatars/c/6.svg";
import { ReactComponent as C7 } from "./../../../../assets/images/avatars/c/7.svg";
import { ReactComponent as C8 } from "./../../../../assets/images/avatars/c/8.svg";
import { ReactComponent as C9 } from "./../../../../assets/images/avatars/c/9.svg";
import { ReactComponent as C10 } from "./../../../../assets/images/avatars/c/10.svg";
import { ReactComponent as C11 } from "./../../../../assets/images/avatars/c/11.svg";
import { ReactComponent as C12 } from "./../../../../assets/images/avatars/c/12.svg";
import { ReactComponent as C13 } from "./../../../../assets/images/avatars/c/13.svg";
import { ReactComponent as C14 } from "./../../../../assets/images/avatars/c/14.svg";
import { ReactComponent as C15 } from "./../../../../assets/images/avatars/c/15.svg";
import { ReactComponent as C16 } from "./../../../../assets/images/avatars/c/16.svg";

export const faces = [
  F1,
  F2,
  F3,
  F4,
  F5,
  F6,
  F7,
  F8,
  F9,
  F10,
  F11,
  F12,
  F13,
  F14,
  F15,
  F16,
  F17,
  F18,
];
export const clothes = [
  C1,
  C2,
  C3,
  C4,
  C5,
  C6,
  C7,
  C8,
  C9,
  C10,
  C11,
  C12,
  C13,
  C14,
  C15,
  C16,
];

export const faceColors = ["#ebbfbf", "#d8a17e", "#c68642"];

export const clothColors = [
  "#a374e0",
  "#e19d6f",
  "#ea7171",
  "#e0e464",
  "#e76fe7",
  "#6fe7c9",
  "#6fdde7",
  "#6f9fe7",
];

export const backgroundColors = [
  "#bdf0c6",
  "#c8ecfc",
  "#fec7d3",
  "#ddd4fb",
  "#fddcc9",
  "#c9fddc",
  "#c9fddc",
];

const extractNumber = (str) => {
  if (!str) return null;
  if (typeof str === "number") return str;
  const num = str.match(/\d+/g);
  return num ? num[0] : null;
};

const Avatar = ({
  avatarCode,
  image,
  name = "Avatar",
  size = 40,
  className,
}) => {
  const getFontSize = (size) => {
    if (!size) return null;
    if (typeof size === "number") return size / 2;
    const num = extractNumber(size);
    return size.replace(num, num / 2);
  };

  if (avatarCode) {
    const { Face, Cloth, faceColor, clothColor, backgroundColor } =
      decodeAvatarCode(avatarCode);
    return (
      <div
        className={styles.avatar}
        style={{
          width: size,
          height: size,
          fontSize: getFontSize(size),
          "--size": `${size}px`,
          "--fill-face": faceColor || "#ebbfbf",
          "--fill-cloth": clothColor || "#a374e0",
          backgroundColor: backgroundColor || "#bdf0c6",
        }}
      >
        <div className={styles.face}>
          <Face />
        </div>
        <div className={styles.cloth}>
          <Cloth />
        </div>
      </div>
    );
  }

  return image ? (
    <img
      src={image}
      alt={name || "Avatar"}
      className={styles.avatar}
      style={{ width: size, height: size }}
    />
  ) : (
    <span
      className={styles.avatar + " " + className}
      style={{ width: size, height: size, fontSize: getFontSize(size) }}
    >
      {name
        .split(" ")
        .map((name) => name.charAt(0).toUpperCase())
        .slice(0, 2)}
    </span>
  );
};

const decodeAvatarCode = (code) => {
  const [face, cloth, faceColor, clothColor, backgroundColor] = code.split("-");
  const faceIndex = extractNumber(face);
  const clothIndex = extractNumber(cloth);
  const faceColorIndex = extractNumber(faceColor);
  const clothColorIndex = extractNumber(clothColor);
  const backgroundColorIndex = extractNumber(backgroundColor);
  return {
    Face: faceIndex ? faces[faceIndex - 1] : F1,
    Cloth: clothIndex ? clothes[clothIndex - 1] : C1,
    faceColor: faceColorIndex ? faceColors[faceColorIndex - 1] : faceColors[0],
    clothColor: clothColorIndex
      ? clothColors[clothColorIndex - 1]
      : clothColors[0],
    backgroundColor: backgroundColorIndex
      ? backgroundColors[backgroundColorIndex - 1]
      : backgroundColors[0],
  };
};

export const encodeAvatarCode = ({
  faceIndex,
  clothIndex,
  faceColorIndex,
  clothColorIndex,
  backgroundColorIndex,
}) => {
  const face = faceIndex ? `f/${faceIndex + 1}` : "f/1";
  const cloth = clothIndex ? `c/${clothIndex + 1}` : "c/16";
  const faceColor = faceColorIndex ? `f/${faceColorIndex + 1}` : "f/1";
  const clothColor = clothColorIndex ? `c/${clothColorIndex + 1}` : "c/16";
  const backgroundColor = backgroundColorIndex
    ? `b/${backgroundColorIndex + 1}`
    : "b/1";
  return `${face}-${cloth}-${faceColor}-${clothColor}-${backgroundColor}`;
};

export default Avatar;
