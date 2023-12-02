import React from "react";
import { useGetParticipationsByEventIdQuery } from "../../../../../state/redux/participants/participantsApi";
import DataTable from "../../../../../components/AdminCommons/DataTable/DataTable";
import { formatDateTime } from "../../../../../utils/time";

const ParticipationTable = ({ eventId }) => {
  const { data: { participations } = {} } =
    useGetParticipationsByEventIdQuery(eventId);
  const columns = [
    {
      label: "Registered",
      key: "createdAt",
      modifier: (value) => formatDateTime(value),
    },
    {
      label: "Contact Email",
      key: "leader",
      modifier: (value) => value.email,
    },
    {
      label: "Members",
      key: "members",
      modifier: (value) => value.map(({ name }) => name).join(","),
    },
  ];
  return (
    <DataTable
      title="Participants"
      columns={columns}
      data={participations}
      getRowId={(row) => row._id}
    />
  );
};

export default ParticipationTable;
