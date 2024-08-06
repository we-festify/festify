import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ClientIndex from "../apps/client";
import RequireAdmin from "./custom/RequireAdmin";
import RequireOrganiser from "./custom/RequireOrganiser";
import AuthIndex from "../pages/Auth";
import UtilityIndex from "../pages/utility";
import FullPageLoading from "../components/FullPageLoading";

const AdminPanelIndex = lazy(() => import("../apps/admin"));
const OrganiserPanelIndex = lazy(() => import("../apps/organiser"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/a/*" element={<AuthIndex />} />
      <Route path="/u/*" element={<UtilityIndex />} />
      <Route path="/*" element={<ClientIndex />} />
      <Route path="/admin/*" element={<RequireAdmin />}>
        <Route
          path="*"
          element={
            <Suspense fallback={<FullPageLoading />}>
              <AdminPanelIndex />
            </Suspense>
          }
        />
      </Route>
      <Route path="/organiser/*" element={<RequireOrganiser />}>
        <Route
          path="*"
          element={
            <Suspense fallback={<FullPageLoading />}>
              <OrganiserPanelIndex />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
