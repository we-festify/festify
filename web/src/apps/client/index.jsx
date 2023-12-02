import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../../pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import EventsIndex from "./pages/Events";
import NavProvider from "../../state/context/ClientNavbar";
import { ToastContainer } from "react-toastify";
import "./index.css";
import Profile from "./pages/Profile/Profile";
import RequireLoggedIn from "../../routes/custom/RequireLoggedIn";

const ClientIndex = () => {
  return (
    <NavProvider>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="events/*" element={<EventsIndex />} />
        <Route path="profile/*" element={<RequireLoggedIn />}>
          <Route path="" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </NavProvider>
  );
};

export default ClientIndex;
