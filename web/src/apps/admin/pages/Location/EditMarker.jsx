import { useEffect, useState } from "react";
import styles from "./Location.module.css";
import {
  useUpdateMarkerByIdMutation,
  useGetMarkerByIdQuery,
} from "../../../../state/redux/map/mapApi";
import { useParams } from "react-router-dom";
import { toast } from "../../components/Toast";
import Card from "../../components/Card/Card";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import Form from "./components/Form";

const EditMarker = () => {
  const { markerId } = useParams();
  const {
    data: { marker: initialMarker } = {},
    isLoading: initialMarkerLoading,
    isSuccess: initialMarkerSuccess,
  } = useGetMarkerByIdQuery(markerId);
  const [updateMarker, { error }] = useUpdateMarkerByIdMutation();
  const [marker, setMarker] = useState(initialMarker);

  const handleSubmit = async () => {
    try {
      await updateMarker({
        markerId,
        marker,
      }).unwrap();
      toast.success("Marker updated successfully!");
    } catch (err) {
      toast.error("Error updating marker.");
    }
  };

  useEffect(() => {
    if (initialMarkerSuccess) {
      setMarker(initialMarker);
    }
  }, [initialMarkerSuccess, initialMarker]);

  return (
    <div className={styles.page}>
      <Card>
        <div className={styles.createMarkerCard}>
          <h4 className={styles.title}>Update Marker</h4>
          <p className={styles.subtitle}>
            Enter the details of the marker you want to edit.
            {error && <p className={styles.error}>{error?.data?.message}</p>}
          </p>
          <Form
            key={marker?._id}
            defaultValue={marker}
            onSubmit={handleSubmit}
            onChange={(marker) => setMarker(marker)}
          />
        </div>
      </Card>
      <LoadingSpinner isLoading={initialMarkerLoading} fullScreen={true} />
    </div>
  );
};

export default EditMarker;
