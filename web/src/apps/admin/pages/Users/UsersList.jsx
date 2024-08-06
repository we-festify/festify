import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../../../state/redux/users/usersApi";
import DataTable from "../../../../components/AdminCommons/DataTable/DataTable";
import DataTableSkeleton from "../../../../components/AdminCommons/DataTable/DataTableSkeleton";
import styles from "./Users.module.css";
import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useDebounce from "../../../../hooks/useDebounce";

const UsersList = () => {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedLimit = useDebounce(limit, 500);
  const debouncedPage = useDebounce(page, 500);
  const debouncedSearch = useDebounce(search, 500);

  const {
    data: { users, pagination: { total, count } = {} } = {},
    error,
    isFetching,
    isLoading,
  } = useGetAllUsersQuery({
    limit: debouncedLimit,
    page: debouncedPage,
    search: debouncedSearch,
  });
  const [deleteUser, { error: deleteError }] = useDeleteUserMutation();

  const onSearchQueryChange = (query) => {
    setSearch(query);
  };

  const onPageLimitChange = (limit) => {
    setLimit(limit);
  };

  const onPageChange = (page) => {
    setPage(page + 1);
  };

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
          controlled={{
            currentPage: debouncedPage - 1,
            pageLimit: debouncedLimit,
            onPageChange,
            onPageLimitChange,
            onSearchQueryChange,
            showLoading: isFetching,
            totalCount: total,
            totalPages: Math.ceil(total / limit),
            count,
          }}
        />
      </Card>
    </div>
  );
};

export default UsersList;
