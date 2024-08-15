import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import ClientIndex from "../apps/client";
import RequireAdmin from "./custom/RequireAdmin";
import RequireOrganiser from "./custom/RequireOrganiser";
import AuthIndex from "../pages/Auth";
import UtilityIndex from "../pages/utility";
import FullPageLoading from "../components/FullPageLoading";
import { ThemeProvider } from "../state/context/Theme";

const AdminPanelIndex = lazy(() => import("../apps/admin"));
const OrganiserPanelIndex = lazy(() => import("../apps/organiser"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/a/*" element={<AuthIndex />} />
      <Route path="/u/*" element={<UtilityIndex />} />
      <Route
        path="/*"
        element={
          <ThemeProvider defaultTheme="dark" storageKey="festify-theme">
            <ClientIndex />
          </ThemeProvider>
        }
      />
      <Route path="/admin/*" element={<RequireAdmin />}>
        <Route
          path="*"
          element={
            <Suspense fallback={<FullPageLoading />}>
              <ThemeProvider
                defaultTheme="light"
                storageKey="festify-admin-theme"
              >
                <AdminPanelIndex />
              </ThemeProvider>
            </Suspense>
          }
        />
      </Route>
      <Route path="/organiser/*" element={<RequireOrganiser />}>
        <Route
          path="*"
          element={
            <Suspense fallback={<FullPageLoading />}>
              <ThemeProvider
                defaultTheme="light"
                storageKey="festify-org-theme"
              >
                <OrganiserPanelIndex />
              </ThemeProvider>
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
