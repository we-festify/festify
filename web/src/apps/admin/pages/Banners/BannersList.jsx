import {
  useDeleteBannerByIdMutation,
  useGetBannersQuery,
} from "../../../../state/redux/banner/bannerApi";
import Card from "../../components/Card/Card";
import DataTable from "../../../../components/AdminCommons/DataTable/DataTable";
import { useNavigate } from "react-router-dom";

const BannersList = () => {
  const { data: { banners } = {}, isLoading } = useGetBannersQuery();
  const [deleteBanner] = useDeleteBannerByIdMutation();
  const navigate = useNavigate();

  return (
    <div className="p-4 overflow-auto">
      <Card>
        <DataTable
          title="Banners"
          columns={[
            {
              label: "Text",
              key: "text",
            },
            {
              label: "Target",
              key: "target",
            },
            {
              label: "Variant",
              key: "variant",
            },
            {
              label: "Active",
              key: "isActive",
              modifier: (value) => (value ? "Yes" : "No"),
            },
          ]}
          data={banners}
          getRowId={(row) => row._id}
          actions={{
            delete: (id) => {
              const confirm = window.confirm(
                "Are you sure you want to delete the banner: " +
                  banners.find((banner) => banner._id === id).text
              );
              if (!confirm) return;
              deleteBanner(id);
            },
            edit: (id) => {
              navigate("/admin/banners/edit/" + id);
            },
          }}
        />
      </Card>
    </div>
  );
};

export default BannersList;
