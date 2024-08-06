import styles from "./Location.module.css";
import { MdGpsFixed } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { useMap } from "./MapProvider";

const LocationActions = () => {
  const { navigateToUserLocation, navigateToHome } = useMap();

  return (
    <div className={styles.locationActions}>
      <button className={styles.actionButton} onClick={navigateToHome}>
        <GoHomeFill />
      </button>
      <button className={styles.actionButton} onClick={navigateToUserLocation}>
        <MdGpsFixed />
      </button>
    </div>
  );
};

export default LocationActions;
