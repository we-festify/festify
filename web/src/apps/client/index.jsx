import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../../pages/NotFound/NotFound";

const ClientIndex = () => {
  return (
    <Routes>
      <Route path="" element={<div>ClientIndex</div>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ClientIndex;
