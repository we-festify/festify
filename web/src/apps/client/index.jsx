import React from "react";
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

const ClientIndex = () => {
  return (
    <NavProvider>
      <ToastProvider>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="events/*" element={<EventsIndex />} />
          <Route path="sponsors/*" element={<SponsorsIndex />} />
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
