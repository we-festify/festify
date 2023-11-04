import React from "react";
import { useGetAllUsersQuery } from "../../../../state/redux/users/usersApi";
import DataTable, {
  DataTableRow,
} from "../../../../components/DataTable/DataTable";

const UsersList = () => {
  const { data: { users } = {}, error, isLoading } = useGetAllUsersQuery();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <DataTable columns={["id", "name", "email", "role"]} title="Users List">
      {users.map((user) => (
        <DataTableRow key={user._id} id={user._id}>
          <td>{user._id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
        </DataTableRow>
      ))}
    </DataTable>
  );
};

export default UsersList;
