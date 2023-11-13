import React from "react";
import { useGetAllOrganisationsQuery } from "../../../../state/redux/organisations/organisationsApi";
import DataTable from "../../../../components/DataTable/DataTable";
import DataTableSkeleton from "../../../../components/DataTable/DataTableSkeleton";

const OrganisationsList = () => {
  const {
    data: { organisations } = {},
    error,
    isLoading,
  } = useGetAllOrganisationsQuery();

  if (isLoading) return <DataTableSkeleton rows={5} />;

  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

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
      ]}
      title="Organisations List"
      data={organisations}
    />
  );
};

export default OrganisationsList;
