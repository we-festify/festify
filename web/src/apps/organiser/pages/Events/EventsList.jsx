import styles from "./Events.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../state/redux/auth/authSlice";
import {
  useDeleteEventMutation,
  useGetEventsByOrganisationIdQuery,
} from "../../../../state/redux/events/eventsApi";
import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../../components/AdminCommons/DataTable/DataTable";

const EventsList = () => {
  const { organisation } = useSelector(selectUser);
  const {
    data: { events } = {},
    error,
    isLoading,
  } = useGetEventsByOrganisationIdQuery(organisation);
  const [deleteEvent] = useDeleteEventMutation();
  const navigate = useNavigate();

  const handleEditEvent = (id) => {
    navigate(`/organiser/events/edit/${id}`);
  };

  const handleDeleteEvent = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirm) return;
    deleteEvent(id);
  };

  const handleShowEventDetails = (id) => {
    navigate(`/organiser/events/details/${id}`);
  };

  if (isLoading) return <div>Loading...</div>;

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
              label: "Type",
              key: "type",
            },
            {
              label: "Venue",
              key: "venue",
            },
            {
              label: "Summary",
              key: "summary",
            },
          ]}
          title="Events"
          data={events}
          selectedColumns={["name", "type", "venue", "summary"]}
          actions={{
            edit: handleEditEvent,
            delete: handleDeleteEvent,
            details: handleShowEventDetails,
          }}
        />
      </Card>
    </div>
  );
};

export default EventsList;
