import MarkersList from "./MarkersList";
import CreateMarker from "./CreateMarker";
import EditMarker from "./EditMarker";
import { Routes, Route } from "react-router-dom";

const LocationIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<MarkersList />} />
      <Route path="/markers/create" element={<CreateMarker />} />
      <Route path="/markers/edit/:markerId" element={<EditMarker />} />
    </Routes>
  );
};

export default LocationIndex;
