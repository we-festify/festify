import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { selectUser } from "./../../../../state/redux/auth/authSlice";
import { useSelector } from "react-redux";
import Logo from "./../../../../components/Logo/Logo";
import { useAdminSidebar } from "../../../../state/context/AdminSidebar";

const Navbar = () => {
  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia("(orientation: portrait)").matches
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const { links } = useAdminSidebar();
  const user = useSelector(selectUser);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)");
    const listener = (e) => {
      setIsPortrait(e.matches);
    };
    mediaQuery.addEventListener("change", listener);
    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        <div className={styles.left}>
          {isPortrait && <Logo light={false} />}
        </div>
        <div className={styles.right}>
          <div
            className={
              (isPortrait ? styles.drawer : "") +
              " " +
              (openDrawer ? styles.open : "")
            }
          >
            <ul className={styles.navlinks}>
              {links?.map((link) => (
                <li key={link.text}>
                  <Link
                    to={link.path}
                    className={
                      styles.navlink + " " + (link.active ? styles.active : "")
                    }
                  >
                    {isPortrait && (
                      <span className={styles.icon}>{link.icon}</span>
                    )}
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {user && (
            <Link to="/profile">
              <span>
                {user.name}
                {/* <img className={styles.avatar} src={user.avatar} alt="avatar" /> */}
              </span>
            </Link>
          )}
          {isPortrait && (
            <div
              className={
                styles.hamburger + " " + (openDrawer ? styles.open : "")
              }
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              <div className={styles.line}></div>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
