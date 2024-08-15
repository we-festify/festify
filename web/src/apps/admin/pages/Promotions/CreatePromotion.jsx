import { useEffect, useState } from "react";
import styles from "./Promotions.module.css";
import { useCreatePromotionMutation } from "../../../../state/redux/promotions/promotionsApi";
import Card from "../../../organiser/components/Card/Card";
import Form from "./components/Form";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "../../components/Toast";

const CreatePromotion = () => {
  const [promotion, setPromotion] = useState({});
  const [createPromotion, { error, isSuccess, isLoading }] =
    useCreatePromotionMutation();

  const handleSubmit = () => {
    toast.promise(createPromotion(promotion).unwrap(), {
      loading: "Creating promotion campaign...",
      success: "Promotion campaign created successfully!",
      error:
        error?.data?.message ||
        error?.message ||
        "Failed to create promotion campaign",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setPromotion({});
    }
  }, [isSuccess]);

  return (
    <div className={styles.page}>
      <Card>
        <div className={styles.createPromotionCard}>
          <h4 className={styles.title}>Promotion Campaign Details</h4>
          <p className={styles.subtitle}>
            Enter the details of the promotion campaign you want to create.
            {error && <p className={styles.error}>{error?.data?.message}</p>}
          </p>
          <Form
            key={promotion?._id}
            defaultValue={promotion}
            onSubmit={handleSubmit}
            onChange={(promotion) => setPromotion(promotion)}
          />
        </div>
      </Card>
      <LoadingSpinner isLoading={isLoading} fullScreen={true} />
    </div>
  );
};

export default CreatePromotion;
