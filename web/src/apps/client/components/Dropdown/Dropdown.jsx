import { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.css";

const Dropdown = ({ children, button }) => {
  const wrapperRef = useRef(null);
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper + " " + (open ? styles.show : styles.hide)}
    >
      <div className={styles.button} onClick={() => setOpen((prev) => !prev)}>
        {button}
      </div>
      <div ref={dropdownRef} className={styles.dropdown}>
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
