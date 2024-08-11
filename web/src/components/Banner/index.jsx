import { IoMdClose } from "react-icons/io";
import styles from "./Banner.module.css";
import { useState } from "react";

const Banner = ({ text, variant = "info", onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose instanceof Function) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.banner + " " + styles[variant]}>
      <div className={styles.bannerContent}>{text}</div>
      <IoMdClose size={18} className={styles.close} onClick={handleClose} />
    </div>
  );
};

export default Banner;
