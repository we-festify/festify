import React from "react";
import styles from "./Events.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../state/redux/auth/authSlice";
import { useGetEventsByOrganisationIdQuery } from "../../../../state/redux/events/eventsApi";
import DataTable, {
  DataTableRow,
} from "../../../../components/DataTable/DataTable";
import Card from "../../components/Card/Card";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const EventsList = () => {
  const { organisation } = useSelector(selectUser);
  const {
    data: { events } = {},
    error,
    isLoading,
  } = useGetEventsByOrganisationIdQuery(organisation);
  const navigate = useNavigate();

  const handleEditEvent = (event) => {
    navigate(`/organiser/events/edit/${event._id}`);
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div className={styles.page}>
      <Card>
        <DataTable
          columns={["Actions", "ID", "Name", "Type", "Venue", "Summary"]}
          title="Events List"
        >
          {events.map((event) => (
            <DataTableRow key={event._id} id={event._id}>
              <td>
                <div className={styles.actions}>
                  <MdEdit
                    className={styles.action}
                    onClick={() => handleEditEvent(event)}
                  />
                </div>
              </td>
              <td>{event._id}</td>
              <td>{event.name}</td>
              <td>{event.type}</td>
              <td>{event.venue}</td>
              <td>{event.summary}</td>
            </DataTableRow>
          ))}
        </DataTable>
      </Card>
    </div>
  );
};

export default EventsList;
