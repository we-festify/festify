import { Route, Routes } from "react-router-dom";
import NotFound from "../../pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import EventsIndex from "./pages/Events";
import NavProvider from "../../state/context/ClientNavbar";
import "./index.css";
import Profile from "./pages/Profile/Profile";
import RequireLoggedIn from "../../routes/custom/RequireLoggedIn";
import SponsorsIndex from "./pages/Sponsors";
import ToastProvider from "./components/Toast";
import Location from "./pages/Location/Location";
import RequireFeatureFlag from "../../components/features/FeatureFlag";

const ClientIndex = () => {
  return (
    <NavProvider>
      <ToastProvider>
        <Routes>
          <Route path="" element={<Home />} />
          <Route
            path="events/*"
            element={
              <RequireFeatureFlag name="EVENTS_PAGE">
                <EventsIndex />
              </RequireFeatureFlag>
            }
          />
          <Route
            path="sponsors/*"
            element={
              <RequireFeatureFlag name="SPONSORS_PAGE">
                <SponsorsIndex />
              </RequireFeatureFlag>
            }
          />
          <Route
            path="location/*"
            element={
              <RequireFeatureFlag name="LOCATION_PAGE">
                <Location />
              </RequireFeatureFlag>
            }
          />
          <Route path="profile/*" element={<RequireLoggedIn />}>
            <Route path="" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ToastProvider>
    </NavProvider>
  );
};

export default ClientIndex;
