import { useState } from "react";
import styles from "./Sponsor.module.css";
import { useCreateSponsorMutation } from "../../../../state/redux/sponsor/sponsorsApi";
import Card from "../../components/Card/Card";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import Form from "./components/Form";
import { toast } from "../../components/Toast";

const CreateSponsor = () => {
  const [sponsor, setSponsor] = useState({});
  const [createSponsor, { error, isLoading }] = useCreateSponsorMutation();

  const handleSubmit = async () => {
    try {
      await createSponsor(sponsor).unwrap();
      toast.success("Sponsor created successfully!");
    } catch (err) {
      toast.error("Error creating sponsor.");
    }
  };

  return (
    <div className={styles.page}>
      <Card>
        <div className={styles.createSponsorCard}>
          <h4 className={styles.title}>Create Sponsor</h4>
          <p className={styles.subtitle}>
            Enter the details of the user you want to create.
            {error && <p className={styles.error}>{error?.data?.message}</p>}
          </p>
          <Form
            defaultValue={sponsor}
            onSubmit={handleSubmit}
            onChange={(sponsor) => setSponsor(sponsor)}
          />
        </div>
      </Card>
      <LoadingSpinner isLoading={isLoading} fullScreen={true} />
    </div>
  );
};

export default CreateSponsor;
