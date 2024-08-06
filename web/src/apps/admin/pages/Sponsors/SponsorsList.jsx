import styles from "./Sponsor.module.css";
import Card from "../../components/Card/Card";
import {
  useDeleteSponsorMutation,
  useGetSponsorsQuery,
} from "../../../../state/redux/sponsor/sponsorsApi";
import DataTable from "../../../../components/AdminCommons/DataTable/DataTable";
import { useNavigate } from "react-router-dom";

const SponsorsList = () => {
  const navigate = useNavigate();
  const { data: { sponsors } = {}, isLoading } = useGetSponsorsQuery();
  const [deleteSponsor, { error: deleteError }] = useDeleteSponsorMutation();

  return (
    <div className={styles.page}>
      <Card>
        <DataTable
          columns={[
            {
              label: "Name",
              key: "name",
            },
            {
              label: "Type",
              key: "type",
            },
            {
              label: "Priority",
              key: "priority",
            },
            {
              label: "Logo",
              key: "logoUrl",
              modifier: (value) => (
                <img
                  src={value}
                  alt="logo"
                  style={{
                    width: "auto",
                    height: "24px",
                    objectFit: "contain",
                  }}
                />
              ),
            },
          ]}
          title="Sponsors List"
          data={sponsors}
          actions={{
            delete: (id) => {
              const confirm = window.confirm(
                "Are you sure you want to delete the sponsor: " +
                  sponsors.find((sponsor) => sponsor._id === id).name
              );
              if (!confirm) return;
              deleteSponsor(id);
            },
            edit: (id) => {
              navigate(`/admin/sponsors/edit/${id}`);
            },
          }}
        />
      </Card>
    </div>
  );
};

export default SponsorsList;
