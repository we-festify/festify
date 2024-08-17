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
  } = useGetBannerByIdQuery(bannerId);
  const [updateBanner, { error }] = useUpdateBannerByIdMutation();

  const handleSubmit = async (banner) => {
    try {
      await updateBanner({
        bannerId,
        banner,
      }).unwrap();
      toast.success("Banner updated successfully!");
    } catch (err) {
      toast.error(
        err?.data?.message || err?.message || "Something went wrong."
      );
    }
  };

  return (
    <div className="p-4 overflow-auto">
      <Card>
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Edit banner details</h4>
            <p className="text-sm text-[var(--color-text-light-admin)]">
              Enter the details of the banner you want to edit.
              {error && (
                <p className="text-sm text-red-500">{error?.data?.message}</p>
              )}
            </p>
          </div>
          <BannerForm
            key={initialBanner?._id}
            defaultValue={initialBanner}
            onSubmit={handleSubmit}
          />
        </div>
      </Card>
      <LoadingSpinner isLoading={initialBannerLoading} fullScreen={true} />
    </div>
  );
};

export default EditBanner;
