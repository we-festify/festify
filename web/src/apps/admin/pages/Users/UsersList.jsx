import React from "react";
import { useGetAllUsersQuery } from "../../../../state/redux/users/usersApi";
import DataTable from "../../../../components/DataTable/DataTable";
import DataTableSkeleton from "../../../../components/DataTable/DataTableSkeleton";

const UsersList = () => {
  const { data: { users } = {}, error, isLoading } = useGetAllUsersQuery();

  if (isLoading) return <DataTableSkeleton rows={5} />;

  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <DataTable
      columns={[
        {
          label: "ID",
          key: "_id",
        },
        {
          label: "Name",
          key: "name",
        },
        {
          label: "Email",
          key: "email",
        },
      ]}
      title="Users List"
      data={users}
      actions={{
        delete: (id) => console.log("delete", id),
      }}
    />
  );
};

export default UsersList;
