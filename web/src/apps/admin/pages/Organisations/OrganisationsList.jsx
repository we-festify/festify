import React from "react";
import { useGetAllOrganisationsQuery } from "../../../../state/redux/organisations/organisationsApi";
import DataTable, {
  DataTableRow,
} from "../../../../components/DataTable/DataTable";

const OrganisationsList = () => {
  const {
    data: { organisations } = {},
    error,
    isLoading,
  } = useGetAllOrganisationsQuery();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  return (
    <DataTable columns={["id", "name"]} title="Organisations List">
      {organisations?.map((organisation) => (
        <DataTableRow key={organisation._id} id={organisation._id}>
          <td>{organisation._id}</td>
          <td>{organisation.name}</td>
        </DataTableRow>
      ))}
    </DataTable>
  );
};

export default OrganisationsList;
