import React from "react";
import { Route, Routes } from "react-router-dom";
import ClientIndex from "../apps/client";
import AdminPanelIndex from "../apps/admin";
import OrganiserPanelIndex from "../apps/organiser";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import RequireAdmin from "./custom/RequireAdmin";
import RequireOrganiser from "./custom/RequireOrganiser";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
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
