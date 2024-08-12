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
    console.log(promotion);
    toast.promise(createPromotion(promotion), {
      loading: "Creating event...",
      success: "Event created successfully!",
      error: "Error creating event.",
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
