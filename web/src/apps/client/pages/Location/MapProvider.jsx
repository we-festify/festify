import { createContext, useContext, useRef, useState } from "react";

import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import { toast } from "../../components/Toast";
import { useGetAllMarkersQuery } from "../../../../state/redux/map/mapApi";

const MapContext = createContext();

export const useMap = () => useContext(MapContext);

const DEFAULT_CENTER = [23.814533785116048, 86.44127580721457]; // IIT(ISM) Dhanbad

const MapProvider = ({ children }) => {
  const { data: { markers } = {}, isLoading } = useGetAllMarkersQuery();
  const mapRef = useRef(null);
  const routingMachineRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);

  const navigateToUserLocation = () => {
    if (mapRef.current) {
      mapRef.current.locate();
    }
  };

  const navigateToHome = () => {
    if (mapRef.current && markers?.[0]) {
      mapRef.current.flyTo([markers[0].latitude, markers[0].longitude], 16);
    } else {
      toast.error("No home location found!");
    }
  };

  const generateDirections = () => {
    if (!mapRef.current) return;
    if (!destination) return toast.error("Please select a destination first!");
    if (!userLocation) return toast.error("Please locate yourself first!");

    const waypoints = [userLocation, destination];

    if (routingMachineRef.current) {
      mapRef.current.removeControl(routingMachineRef.current);
    }

    routingMachineRef.current = L.Routing.control({
      waypoints,
      routeWhileDragging: true,
      showAlternatives: true,
      lineOptions: {
        styles: [
          { color: "var(--color-primary-500)", opacity: 0.8, weight: 6 },
        ],
      },
      addWaypoints: false,
      draggableWaypoints: false,
      createMarker: () => null,
    }).addTo(mapRef.current);
  };

  const value = {
    mapRef,
    navigateToUserLocation,
    markers,
    isLoading,
    home: markers?.[0]
      ? [markers[0].latitude, markers[0].longitude]
      : DEFAULT_CENTER,
    navigateToHome,
    userLocation,
    setUserLocation,
    destination,
    setDestination,
    generateDirections,
  };

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

export default MapProvider;
