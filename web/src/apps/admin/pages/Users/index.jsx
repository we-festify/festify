import { Route, Routes } from "react-router-dom";
import UsersList from "./UsersList";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";

const UsersIndex = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersList />} />
      <Route path="/create" element={<CreateUser />} />
      <Route path="/edit/:id" element={<EditUser />} />
    </Routes>
  );
};

export default UsersIndex;
