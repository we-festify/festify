import { useEffect, useState } from "react";
import styles from "./Sponsor.module.css";
import { useLocation } from "react-router-dom";
import Card from "../../components/Card/Card";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import Form from "./components/Form";
import {
  useGetSponsorByIdQuery,
  useUpdateSponsorMutation,
} from "../../../../state/redux/sponsor/sponsorsApi";
import { toast } from "../../components/Toast";

const EditSponsor = () => {
  const location = useLocation();
  const sponsorId = location.pathname.split("/").pop();
  const {
    data: { sponsor: initialSponsor } = {},
    isLoading: initialSponsorLoading,
    isSuccess: initialSponsorSuccess,
  } = useGetSponsorByIdQuery(sponsorId);
  const [updateSponsor, { error }] = useUpdateSponsorMutation();
  const [sponsor, setSponsor] = useState(initialSponsor);

  const handleSubmit = async () => {
    try {
      await updateSponsor({
        sponsorId,
        sponsor,
      }).unwrap();
      toast.success("Sponsor updated successfully!");
    } catch (err) {
      toast.error("Error updating sponsor.");
    }
  };

  useEffect(() => {
    if (initialSponsorSuccess) {
      setSponsor(initialSponsor);
    }
  }, [initialSponsorSuccess, initialSponsor]);

  return (
    <div className={styles.page}>
      <Card>
        <div className={styles.createSponsorCard}>
          <h4 className={styles.title}>Sponsor Details</h4>
          <p className={styles.subtitle}>
            Enter the details of the sponsor you want to edit.
            {error && <p className={styles.error}>{error?.data?.message}</p>}
          </p>
          <Form
            key={sponsor?._id}
            defaultValue={sponsor}
            onChange={setSponsor}
            onSubmit={handleSubmit}
          />
        </div>
      </Card>
      <LoadingSpinner isLoading={initialSponsorLoading} fullScreen={true} />
    </div>
  );
};

export default EditSponsor;
