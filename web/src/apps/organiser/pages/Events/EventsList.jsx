import React from "react";
import styles from "./Events.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../state/redux/auth/authSlice";
import { useGetEventsByOrganisationIdQuery } from "../../../../state/redux/events/eventsApi";
import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../../components/DataTable/DataTable";

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
          title="Events List"
          data={events}
        />
      </Card>
    </div>
  );
};

export default EventsList;
