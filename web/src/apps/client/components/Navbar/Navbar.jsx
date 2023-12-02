import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useClientNavbar } from "../../../../state/context/ClientNavbar";
import {
  selectUser,
  selectIsAdmin,
  selectIsOrganiser,
} from "./../../../../state/redux/auth/authSlice";
import { useSelector } from "react-redux";
import Logo from "./../../../../components/Logo/Logo";
import { SiAuth0 } from "react-icons/si";
import { MdChevronLeft } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { useLocation } from "react-router-dom";
import { viewTransition } from "../../../../utils/view_transition";

const Navbar = () => {
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const [openDrawer, setOpenDrawer] = useState(false);
  const { links } = useClientNavbar();
  const user = useSelector(selectUser);
  const isAdmin = useSelector(selectIsAdmin);
  const isOrganiser = useSelector(selectIsOrganiser);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/a/login");
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    viewTransition(() => {
      const path = location.pathname.split("/");
      path.pop();
      navigate(path.join("/"), { replace: true });
    });
  };

  return (
    <div className={styles.wrapper}>
      {isPortrait && (
        <div className={styles.drawer + " " + (openDrawer ? styles.open : "")}>
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
            <li className={styles.navlink}>
              {isPortrait && (
                <span className={styles.icon}>
                  <IoMdPerson />
                </span>
              )}
              <Link to="/profile">Profile</Link>
            </li>
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
      )}
      <div className={styles.navbar}>
        <div className={styles.left}>
          {isPortrait ? (
            location.pathname.split("/").length > 2 ? (
              <MdChevronLeft
                className={styles.back}
                size={32}
                onClick={handleGoBack}
                style={{ marginLeft: "-0.7rem" }}
              />
            ) : (
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
            )
          ) : (
            ""
          )}
          <Logo />
        </div>
        <div className={styles.right}>
          {!isPortrait && (
            <div>
              <ul className={styles.navlinks}>
                {links?.map((link) => (
                  <li key={link.text} className={styles.navlink}>
                    {isPortrait && (
                      <span className={styles.icon}>{link.icon}</span>
                    )}
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
          )}
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
