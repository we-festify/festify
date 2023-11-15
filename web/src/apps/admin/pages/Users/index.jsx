import React from "react";
import { Route, Routes } from "react-router-dom";
import UsersList from "./UsersList";
import CreateUser from "./CreateUser";

const UsersIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersList />} />
      <Route path="/create" element={<CreateUser />} />
    </Routes>
  );
};

export default UsersIndex;
