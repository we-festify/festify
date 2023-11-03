import React from "react";
import styles from "./Events.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../state/redux/auth/authSlice";
import { useGetEventsByOrganisationIdQuery } from "../../../../state/redux/events/eventsApi";
import DataTable, {
  DataTableRow,
} from "../../../../components/DataTable/DataTable";
import Card from "../../components/Card/Card";

const EventsList = () => {
  const { organisation } = useSelector(selectUser);
  const {
    data: { events } = {},
    error,
    isLoading,
  } = useGetEventsByOrganisationIdQuery(organisation);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{JSON.stringify(error)}</div>;

  return (
    <div className={styles.page}>
      <Card>
        <DataTable columns={["id", "name", "date"]} title="Events List">
          {events.map((event) => (
            <DataTableRow key={event._id} id={event._id}>
              <td>{event._id}</td>
              <td>{event.name}</td>
              <td>{event.date}</td>
            </DataTableRow>
          ))}
        </DataTable>
      </Card>
    </div>
  );
};

export default EventsList;
