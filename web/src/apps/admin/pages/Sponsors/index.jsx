import { Route, Routes } from "react-router-dom";
import SponsorsList from "./SponsorsList";
import EditSponsor from "./EditSponsor";
import CreateSponsor from "./CreateSponsor";

const SponsorsIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<SponsorsList />} />
      <Route path="/create" element={<CreateSponsor />} />
      <Route path="/edit/:id" element={<EditSponsor />} />
    </Routes>
  );
};

export default SponsorsIndex;
