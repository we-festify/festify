import styles from "./Location.module.css";
import Navbar from "../../components/Navbar/Navbar";
import FixedBackdrop from "../../../../components/FixedBackdrop/FixedBackdrop";
import Map from "./Map";
import MapProvider from "./MapProvider";
import LocationActions from "./LocationActions";

const Location = () => {
  return (
    <FixedBackdrop>
      <Navbar />
      <MapProvider>
        <div className={styles.container}>
          <Map />
          <LocationActions />
        </div>
      </MapProvider>
    </FixedBackdrop>
  );
};

export default Location;
