import styles from "./Events.module.css";
import Header from "./components/Header/Header";
import CategoriesSidebar from "./components/Sidebar/Sidebar";
import EventsGrid from "./components/Grid/Grid";
import { useMediaQuery } from "./../../../../hooks/useMediaQuery";
import { useLocation } from "react-router-dom";
import Calendar from "./components/Calendar/Calendar";

const EventsPage = () => {
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const location = useLocation();

  return (
    <div className={styles.page}>
      <Header />
      {isPortrait && <CategoriesSidebar />}
      <div className={styles.content}>
        {!isPortrait && <CategoriesSidebar />}
        {location.pathname === "/events/timeline" ? (
          <Calendar />
        ) : (
          <EventsGrid />
        )}
      </div>
    </div>
  );
};

export default EventsPage;
