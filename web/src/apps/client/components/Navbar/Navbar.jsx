import React from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useNav } from "../../../../state/context/nav";
import {
  selectUser,
  selectIsAdmin,
  selectIsOrganiser,
} from "./../../../../state/redux/auth/authSlice";
import { useSelector } from "react-redux";
import Logo from "./../../../../components/Logo/Logo";
import { SiAuth0 } from "react-icons/si";

const Navbar = () => {
  const [isPortrait, setIsPortrait] = React.useState(
    window.matchMedia("(orientation: portrait)").matches
  );
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const { links } = useNav();
  const user = useSelector(selectUser);
  const isAdmin = useSelector(selectIsAdmin);
  const isOrganiser = useSelector(selectIsOrganiser);
  const navigate = useNavigate();

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)");
    const listener = (e) => {
      setIsPortrait(e.matches);
    };
    mediaQuery.addEventListener("change", listener);
    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <Logo />
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
              <li key={link.text} className={styles.navlink}>
                {isPortrait && <span className={styles.icon}>{link.icon}</span>}
                <Link
                  to={link.path}
                  className={link.active ? styles.active : ""}
                >
                  {link.text}
                </Link>
              </li>
            ))}
            {isAdmin && (
              <li className={styles.navlink}>
                {isPortrait && (
                  <span className={styles.icon}>
                    <SiAuth0 />
                  </span>
                )}
                <Link to="/admin">Admin Panel</Link>
              </li>
            )}
            {isOrganiser && (
              <li className={styles.navlink}>
                {isPortrait && (
                  <span className={styles.icon}>
                    <SiAuth0 />
                  </span>
                )}
                <Link to="/organiser">Organiser Panel</Link>
              </li>
            )}
          </ul>
        </div>
        {user ? (
          <Link to="/profile">
            <span>
              {user.name}
              {/* <img className={styles.avatar} src={user.avatar} alt="avatar" /> */}
            </span>
          </Link>
        ) : (
          <button className={styles.login} onClick={handleLogin}>
            Login
          </button>
        )}
        {isPortrait && (
          <div
            className={styles.hamburger + " " + (openDrawer ? styles.open : "")}
            onClick={() => setOpenDrawer(!openDrawer)}
          >
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
