import React from "react";
import { Route, Routes } from "react-router-dom";
import ClientIndex from "../apps/client";
import AdminPanelIndex from "../apps/admin";
import OrganiserPanelIndex from "../apps/organiser";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<ClientIndex />} />
      <Route path="/admin/*" element={<AdminPanelIndex />} />
      <Route path="/organiser/*" element={<OrganiserPanelIndex />} />
    </Routes>
  );
};

export default AppRoutes;
