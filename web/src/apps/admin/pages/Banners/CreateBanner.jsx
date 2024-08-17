import { useCreateBannerMutation } from "../../../../state/redux/banner/bannerApi";
import { toast } from "../../components/Toast";
import Card from "../../components/Card/Card";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import BannerForm from "./components/BannerForm";

const CreateBanner = () => {
  const [createBanner, { error, isLoading }] = useCreateBannerMutation();

  const handleSubmit = async (bannerData, resetForm) => {
    try {
      await createBanner(bannerData).unwrap();
      toast.success("Banner created successfully!");
      resetForm();
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
            <h4 className="font-medium">Create Banner</h4>
            <p className="text-sm text-[var(--color-text-light-admin)]">
              Enter the details of the banner you want to create.
              {error && (
                <p className="text-sm text-red-500">{error?.data?.message}</p>
              )}
            </p>
          </div>
          <BannerForm onSubmit={handleSubmit} />
        </div>
      </Card>
      <LoadingSpinner isLoading={isLoading} fullScreen={true} />
    </div>
  );
};

export default CreateBanner;
