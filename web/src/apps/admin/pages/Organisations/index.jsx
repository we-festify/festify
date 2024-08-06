import { Route, Routes } from "react-router-dom";
import OrganisationsList from "./OrganisationsList";
import CreateOrganisation from "./CreateOrganisation";

const OrganisationsIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<OrganisationsList />} />
      <Route path="/create" element={<CreateOrganisation />} />
    </Routes>
  );
};

export default OrganisationsIndex;
