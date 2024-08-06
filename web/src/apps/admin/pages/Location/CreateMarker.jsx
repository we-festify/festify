import { useState } from "react";
import styles from "./Location.module.css";
import { useCreateMarkerMutation } from "../../../../state/redux/map/mapApi";
import { toast } from "../../components/Toast";
import Card from "../../components/Card/Card";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import Form from "./components/Form";

const CreateMarker = () => {
  const [marker, setMarker] = useState({});
  const [createMarker, { error, isLoading }] = useCreateMarkerMutation();

  const handleSubmit = async () => {
    try {
      await createMarker(marker).unwrap();
      toast.success("Marker created successfully!");
    } catch (err) {
      toast.error("Error creating marker.");
    }
  };

  return (
    <div className={styles.page}>
      <Card>
        <div className={styles.createMarkerCard}>
          <h4 className={styles.title}>Create Marker</h4>
          <p className={styles.subtitle}>
            Enter the details of the marker you want to create.
            {error && <p className={styles.error}>{error?.data?.message}</p>}
          </p>
          <Form
            defaultValue={marker}
            onSubmit={handleSubmit}
            onChange={(marker) => setMarker(marker)}
          />
        </div>
      </Card>
      <LoadingSpinner isLoading={isLoading} fullScreen={true} />
    </div>
  );
};

export default CreateMarker;
