import { Route, Routes } from "react-router-dom";
import ClientIndex from "../apps/client";
import AdminPanelIndex from "../apps/admin";
import OrganiserPanelIndex from "../apps/organiser";
import RequireAdmin from "./custom/RequireAdmin";
import RequireOrganiser from "./custom/RequireOrganiser";
import AuthIndex from "../pages/Auth";
import UtilityIndex from "../pages/utility";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/a/*" element={<AuthIndex />} />
      <Route path="/u/*" element={<UtilityIndex />} />
      <Route path="/*" element={<ClientIndex />} />
      <Route path="/admin/*" element={<RequireAdmin />}>
        <Route path="*" element={<AdminPanelIndex />} />
      </Route>
      <Route path="/organiser/*" element={<RequireOrganiser />}>
        <Route path="*" element={<OrganiserPanelIndex />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
