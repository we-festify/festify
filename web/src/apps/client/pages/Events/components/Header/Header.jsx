import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { IoIosSearch } from "react-icons/io";
import { useEventsPage } from "../../../../../../state/context/ClientEventsPage";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { viewTransition } from "../../../../../../utils/view_transition";
import { MdOutlineViewTimeline } from "react-icons/md";
import { FiGrid } from "react-icons/fi";

const Header = () => {
  const { suggestions, searchByQuery } = useEventsPage();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchByQuery(search);
    }, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  const handleSuggestionClick = (suggestion) => {
    setSearch("");
    viewTransition(() => {
      navigate(`/events/${suggestion.id}`);
    });
  };

  const markSearchedPart = (name) => {
    // mark the matching part
    const index = name.toLowerCase().indexOf(search.toLowerCase());
    const first = name.slice(0, index);
    const middle = name.slice(index, index + search.length);
    const last = name.slice(index + search.length);
    return (
      <>
        {first}
        <mark className={styles.match}>{middle}</mark>
        {last}
      </>
    );
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.title}>Events</h1>
      </div>
      <div className={styles.right}>
        {location.pathname !== "/events/timeline" ? (
          <Link to="timeline" className={styles.calendar}>
            <MdOutlineViewTimeline className={styles.icon} />
            <span className={styles.text}>Calendar</span>
          </Link>
        ) : (
          <Link to="/events" className={styles.calendar}>
            <FiGrid size={14} className={styles.icon} />
            <span className={styles.text}>Grid</span>
          </Link>
        )}
        <div className={styles.search}>
          <IoIosSearch className={styles.icon} />
          <input
            type="text"
            placeholder="Search for events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {suggestions.length > 0 && (
            <ul key={search} className={styles.suggestions}>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {markSearchedPart(suggestion.name)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
