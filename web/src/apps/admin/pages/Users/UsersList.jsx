import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../../../state/redux/users/usersApi";
import DataTable from "../../../../components/AdminCommons/DataTable/DataTable";
import DataTableSkeleton from "../../../../components/AdminCommons/DataTable/DataTableSkeleton";
import styles from "./Users.module.css";
import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const navigate = useNavigate();
  const { data: { users } = {}, error, isLoading } = useGetAllUsersQuery();
  const [deleteUser, { error: deleteError }] = useDeleteUserMutation();

  if (isLoading)
    return (
      <div className={styles.page}>
        <DataTableSkeleton rows={5} />
      </div>
    );

  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div className={styles.page}>
      <Card>
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
            {
              label: "Gender",
              key: "gender",
            },
            {
              label: "Role",
              key: "role",
            },
          ]}
          title="Users List"
          data={users}
          actions={{
            delete: (id) => {
              const confirm = window.confirm(
                "Are you sure you want to delete the user: " +
                  users.find((user) => user._id === id).name
              );
              if (!confirm) return;
              deleteUser(id);
            },
            edit: (id) => {
              navigate(`/admin/users/edit/${id}`);
            },
          }}
        />
      </Card>
    </div>
  );
};

export default UsersList;
