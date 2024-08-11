import { useState } from "react";
import styles from "./Banners.module.css";
import { useCreateBannerMutation } from "../../../../state/redux/banner/bannerApi";
import { toast } from "../../components/Toast";
import Card from "../../components/Card/Card";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import BannerForm from "./components/BannerForm";

const CreateBanner = () => {
  const [banner, setBanner] = useState({});
  const [createBanner, { error, isLoading }] = useCreateBannerMutation();

  const handleSubmit = async () => {
    try {
      await createBanner(banner).unwrap();
      toast.success("Banner created successfully!");
    } catch (err) {
      toast.error(
        err?.data?.message || err?.message || "Something went wrong."
      );
    }
  };

  return (
    <div className={styles.page}>
      <Card>
        <div className={styles.createBannerCard}>
          <h4 className={styles.title}>Create Banner</h4>
          <p className={styles.subtitle}>
            Enter the details of the banner you want to create.
            {error && <p className={styles.error}>{error?.data?.message}</p>}
          </p>
          <BannerForm
            defaultValue={banner}
            onSubmit={handleSubmit}
            onChange={(banner) => setBanner(banner)}
          />
        </div>
      </Card>
      <LoadingSpinner isLoading={isLoading} fullScreen={true} />
    </div>
  );
};

export default CreateBanner;
