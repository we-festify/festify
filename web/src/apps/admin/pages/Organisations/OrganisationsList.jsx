import {
  useDeleteOrganisationMutation,
  useGetAllOrganisationsQuery,
} from "../../../../state/redux/organisations/organisationsApi";
import DataTable from "../../../../components/AdminCommons/DataTable/DataTable";
import DataTableSkeleton from "../../../../components/AdminCommons/DataTable/DataTableSkeleton";
import styles from "./Organisations.module.css";
import Card from "../../components/Card/Card";

const OrganisationsList = () => {
  const {
    data: { organisations } = {},
    error,
    isLoading,
  } = useGetAllOrganisationsQuery();
  const [deleteOrganisation, { error: deleteError }] =
    useDeleteOrganisationMutation();

  if (isLoading)
    return (
      <div className={styles.page}>
        <DataTableSkeleton rows={5} />
      </div>
    );

  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

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
          ]}
          title="Organisations List"
          data={organisations}
          actions={{
            delete: (id) => {
              const confirm = window.confirm(
                "Are you sure you want to delete this organisation?"
              );
              if (!confirm) return;
              deleteOrganisation(id);
            },
          }}
        />
      </Card>
    </div>
  );
};

export default OrganisationsList;
