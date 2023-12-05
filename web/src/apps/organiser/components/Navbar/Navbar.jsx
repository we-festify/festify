import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { selectUser } from "./../../../../state/redux/auth/authSlice";
import { useSelector } from "react-redux";
import Logo from "./../../../../components/Logo/Logo";
import { useOrganiserSidebar } from "../../../../state/context/OrganiserSidebar";
import { viewTransition } from "../../../../utils/view_transition";
import { MdChevronLeft } from "react-icons/md";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia("(orientation: portrait)").matches
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const { links } = useOrganiserSidebar();
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
                    >
                      {isPortrait && (
                        <span className={styles.icon}>{link.icon}</span>
                      )}
                      {link.text}
                    </Link>
                  </li>
                  {link.sublinks && (
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
              <span>
                {user.name}
                {/* <img className={styles.avatar} src={user.avatar} alt="avatar" /> */}
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
