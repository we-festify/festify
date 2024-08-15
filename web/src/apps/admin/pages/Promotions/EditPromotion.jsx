import { useEffect, useState } from "react";
import styles from "./Promotions.module.css";
import { useLocation } from "react-router-dom";
import Card from "../../../organiser/components/Card/Card";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import Form from "./components/Form";
import {
  useGetPromotionByIdQuery,
  useUpdatePromotionMutation,
} from "../../../../state/redux/promotions/promotionsApi";
import { toast } from "../../components/Toast";

const EditPromotion = () => {
  const location = useLocation();
  const promotionId = location.pathname.split("/").pop();
  const {
    data: { promotion: initialPromotion } = {},
    isLoading: initialPromotionLoading,
  } = useGetPromotionByIdQuery(promotionId);
  const [updatePromotion, { error }] = useUpdatePromotionMutation();

  const handleSubmit = async (promotion) => {
    toast.promise(updatePromotion({ id: promotionId, promotion }).unwrap(), {
      loading: "Updating promotion campaign...",
      success: "Promotion campaign updated successfully!",
      error:
        error?.data?.message ||
        error?.message ||
        "Failed to update promotion campaign",
    });
  };

  return (
    <div className={styles.page}>
      <Card>
        <div className={styles.createPromotionCard}>
          <h4 className={styles.title}>Promotion Campaign Details</h4>
          <p className={styles.subtitle}>
            Enter the details of the promotion campaign you want to edit.
            {error && <p className={styles.error}>{error?.data?.message}</p>}
          </p>
          <Form
            key={promotionId + initialPromotion?._id}
            defaultValue={initialPromotion}
            onChange={console.log}
            onSubmit={handleSubmit}
          />
        </div>
      </Card>
      <LoadingSpinner isLoading={initialPromotionLoading} fullScreen={true} />
    </div>
  );
};

export default EditPromotion;
