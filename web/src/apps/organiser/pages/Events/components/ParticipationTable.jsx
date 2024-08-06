import { useGetParticipationsByEventIdQuery } from "../../../../../state/redux/participants/participantsApi";
import DataTable from "../../../../../components/AdminCommons/DataTable/DataTable";
import { formatDateTime } from "../../../../../utils/time";

const ParticipationTable = ({ eventId }) => {
  const { data: { participations } = {} } =
    useGetParticipationsByEventIdQuery(eventId);
  const columns = [
    {
      label: "Registered At",
      key: "createdAt",
      modifier: (value) => formatDateTime(value),
    },
    {
      label: "Leader",
      key: "leader",
      modifier: (value) => value.name,
    },
    {
      label: "Contact Email",
      key: "leader",
      modifier: (value) => value.email,
    },
    {
      label: "Members Count",
      key: "members",
      modifier: (value) => value.length,
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
