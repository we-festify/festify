import styles from "./EventDetailsLayout.module.css";
import EventsGrid from "../Grid/Grid";
import { useLocation, useNavigate } from "react-router-dom";
import BottomNavigationBar from "../../../../components/BottomNavigationBar/BottomNavigationBar";
import useDetailsNavigation from "../../hooks/useDetailsNavigation";
import { useMediaQuery } from "../../../../../../hooks/useMediaQuery";
import { viewTransition } from "../../../../../../utils/view_transition";
import { MdChevronLeft } from "react-icons/md";

const EventDetailsLayout = () => {
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const location = useLocation();
  const navigate = useNavigate();
  const eventId = location.pathname.split("/").pop();
  const { tabs, activeTabIndex, ActiveComponent, handleChooseTab } =
    useDetailsNavigation();

  const handleGoBack = (e) => {
    e.stopPropagation();
    viewTransition(() => {
      const from = location.state?.from;
      navigate(from || "/events", { replace: true });
    });
  };

  return (
    <>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.left}>
              {!isPortrait && (
                <div className={styles.topNavigationBar} onClick={handleGoBack}>
                  <div className={styles.back}>
                    <MdChevronLeft /> Back
                  </div>
                  <div className={styles.tabs}>
                    {tabs.map((tab, index) => (
                      <div
                        className={`${styles.tab} ${
                          index === activeTabIndex ? styles.active : ""
                        }`}
                        key={tab.key}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleChooseTab(index);
                        }}
                      >
                        {tab.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <ActiveComponent />
            </div>
            <div className={styles.right}>
              <h2 className={styles.title}>More Events</h2>
              <EventsGrid excludeIds={[eventId]} maxCount={5} />
            </div>
          </div>
        </div>
      </div>
      {isPortrait && (
        <BottomNavigationBar
          tabs={tabs}
          activeTabIndex={activeTabIndex}
          onTabChange={handleChooseTab}
        />
      )}
    </>
  );
};

export default EventDetailsLayout;
