import { useState } from "react";
import styles from "./Location.module.css";
import "leaflet/dist/leaflet.css";
import "./custom-leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Tooltip,
  Circle,
} from "react-leaflet";
import { Icon } from "leaflet";
import locationPin from "./../../../../assets/images/icons/location-pin.svg?url";
import liveLocationCircle from "./../../../../assets/images/icons/live-location-circle.svg?url";
import { useMap } from "./MapProvider";

// custom icons
const markerPinIcon = new Icon({
  iconUrl: locationPin,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const userLocationCircleIcon = new Icon({
  iconUrl: liveLocationCircle,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [-12, -12],
});

const MapEvents = () => {
  return null;
};

const Map = () => {
  const {
    mapRef,
    markers,
    isLoading,
    home,
    setDestination,
    generateDirections,
  } = useMap();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <MapContainer
      ref={mapRef}
      className={styles.map}
      center={home}
      zoom={16}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {!isLoading &&
        markers &&
        markers.map((marker) => (
          <Marker
            key={marker._id}
            position={[marker.latitude, marker.longitude]}
            icon={markerPinIcon}
          >
            <Tooltip>{marker.name}</Tooltip>
            <Popup>
              <div className={styles.markerPopup}>
                <h4>{marker.name}</h4>
                <p>{marker.description}</p>
                <button
                  className={styles.directionsButton}
                  onClick={(e) => {
                    setDestination([marker.latitude, marker.longitude]);
                    generateDirections();
                    mapRef.current.closePopup();
                  }}
                >
                  Get Directions
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      <UserLocationMarker />
      <MapEvents />
    </MapContainer>
  );
};

const UserLocationMarker = () => {
  const [position, setPosition] = useState(null);
  const [radius, setRadius] = useState(0);
  const { setUserLocation } = useMap();

  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      setRadius(e.accuracy);
      setUserLocation(e.latlng);
      map.closePopup();
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <>
      <Marker icon={userLocationCircleIcon} position={position}>
        <Circle center={position} radius={radius} stroke={false} />
      </Marker>
    </>
  );
};

export default Map;
