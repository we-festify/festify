import styles from "./Location.module.css";
import Card from "../../components/Card/Card";
import DataTable from "../../../../components/AdminCommons/DataTable/DataTable";
import {
  useDeleteMarkerByIdMutation,
  useGetAllMarkersQuery,
} from "../../../../state/redux/map/mapApi";
import { useNavigate } from "react-router-dom";

const MarkersList = () => {
  const navigate = useNavigate();
  const { data: { markers } = {}, isLoading } = useGetAllMarkersQuery();
  const [deleteMarker, { error: deleteError }] = useDeleteMarkerByIdMutation();

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
              label: "Latitude",
              key: "latitude",
            },
            {
              label: "Longitude",
              key: "longitude",
            },
          ]}
          title="Markers List"
          data={markers}
          actions={{
            delete: (id) => {
              const confirm = window.confirm(
                "Are you sure you want to delete the marker: " +
                  markers.find((marker) => marker._id === id).name
              );
              if (!confirm) return;
              deleteMarker(id);
            },
            edit: (id) => {
              navigate("/admin/location/markers/edit/" + id);
            },
          }}
        />
      </Card>
    </div>
  );
};

export default MarkersList;
