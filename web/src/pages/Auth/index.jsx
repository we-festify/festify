import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";

const AuthIndex = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AuthIndex;
