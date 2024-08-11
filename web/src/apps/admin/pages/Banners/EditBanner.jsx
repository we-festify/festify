import { useEffect, useState } from "react";
import styles from "./Banners.module.css";
import {
  useGetBannerByIdQuery,
  useUpdateBannerByIdMutation,
} from "../../../../state/redux/banner/bannerApi";
import { toast } from "../../components/Toast";
import Card from "../../components/Card/Card";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import BannerForm from "./components/BannerForm";
import { useParams } from "react-router-dom";

const EditBanner = () => {
  const { bannerId } = useParams();
  const {
    data: { banner: initialBanner } = {},
    isLoading: initialBannerLoading,
    isSuccess: initialBannerSuccess,
  } = useGetBannerByIdQuery(bannerId);
  const [banner, setBanner] = useState(initialBanner);
  const [updateBanner, { error, isLoading }] = useUpdateBannerByIdMutation();

  const handleSubmit = async () => {
    try {
      await updateBanner({
        bannerId,
        banner,
      }).unwrap();
      toast.success("Banner created successfully!");
    } catch (err) {
      toast.error(
        err?.data?.message || err?.message || "Something went wrong."
      );
    }
  };

  useEffect(() => {
    if (initialBannerSuccess) {
      setBanner(initialBanner);
    }
  }, [initialBannerSuccess, initialBanner]);

  return (
    <div className={styles.page}>
      <Card>
        <div className={styles.createBannerCard}>
          <h4 className={styles.title}>Edit Banner</h4>
          <p className={styles.subtitle}>
            Edit the details of the banner you want to create.
            {error && <p className={styles.error}>{error?.data?.message}</p>}
          </p>
          <BannerForm
            key={banner?._id}
            defaultValue={banner}
            onSubmit={handleSubmit}
            onChange={(banner) => setBanner(banner)}
          />
        </div>
      </Card>
      <LoadingSpinner isLoading={initialBannerLoading} fullScreen={true} />
    </div>
  );
};

export default EditBanner;
