import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { selectUser } from "./../../../../state/redux/auth/authSlice";
import { useSelector } from "react-redux";
import Logo from "./../../../../components/Logo/Logo";
import { useAdminSidebar } from "../../../../state/context/AdminSidebar";
import { IoChevronBack } from "react-icons/io5";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const [openDrawer, setOpenDrawer] = useState(false);
  const { links } = useAdminSidebar();
  const user = useSelector(selectUser);

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        <div className={styles.left}>
          {isPortrait ? (
            location.pathname.split("/").length > 3 ? (
              <IoChevronBack
                className={styles.back}
                size={24}
                onClick={handleGoBack}
                style={{ marginLeft: "-0.5rem", marginRight: "1rem" }}
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
                <React.Fragment key={link.text}>
                  <li key={link.text}>
                    <Link
                      to={link.path}
                      className={
                        styles.navlink +
                        " " +
                        (link.active ? styles.active : "")
                      }
                      onClick={() => setOpenDrawer(false)}
                    >
                      {isPortrait && (
                        <span className={styles.icon}>{link.icon}</span>
                      )}
                      {link.text}
                    </Link>
                  </li>
                  {link.active && link.sublinks && (
                    <ul className={styles.sublinks}>
                      {link.sublinks.map((sublink) => (
                        <li key={sublink.text}>
                          <Link
                            to={sublink.path}
                            className={
                              styles.navlink +
                              " " +
                              (sublink.active ? styles.active : "")
                            }
                            onClick={() => setOpenDrawer(false)}
                          >
                            {isPortrait && (
                              <span className={styles.icon}>
                                {sublink.icon}
                              </span>
                            )}
                            {sublink.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
          {user && (
            <Link to="/profile">
              <span>{user.name}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
