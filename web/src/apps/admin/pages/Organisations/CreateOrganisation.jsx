import { useEffect, useState } from "react";
import styles from "./Organisations.module.css";
import Card from "../../components/Card/Card";
import OrganisationForm from "./components/OrganisationForm";
import { useCreateOrganisationMutation } from "../../../../state/redux/organisations/organisationsApi";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

const CreateOrganisation = () => {
  const [createOrganisation, { error, isSuccess, isLoading }] =
    useCreateOrganisationMutation();
  const [organisation, setOrganisation] = useState({});

  const handleSubmit = () => {
    createOrganisation(organisation);
  };

  useEffect(() => {
    if (isSuccess) {
      setOrganisation({});
    }
  }, [isSuccess]);

  return (
    <div className={styles.page}>
      <Card>
        <div className={styles.createOrganisationCard}>
          <h4 className={styles.title}>Organisation Details</h4>
          <p className={styles.subtitle}>
            Enter the details of the organisation you want to create.
            {error && <p className={styles.error}>{error?.data?.message}</p>}
          </p>
          <OrganisationForm
            defaultValue={organisation}
            onSubmit={handleSubmit}
            onChange={(organisation) => setOrganisation(organisation)}
          />
          {isSuccess && (
            <p className={styles.subtitle}>
              Organisation created successfully!
            </p>
          )}
        </div>
      </Card>
      <LoadingSpinner isLoading={isLoading} fullScreen={true} />
    </div>
  );
};

export default CreateOrganisation;
