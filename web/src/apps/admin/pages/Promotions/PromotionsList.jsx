import styles from "./Promotions.module.css";
import Card from "../../../organiser/components/Card/Card";
import {
  useGetAllPromotionsQuery,
} from "../../../../state/redux/promotions/promotionsApi";
import DataTable from "../../../../components/AdminCommons/DataTable/DataTable";
import { useNavigate } from "react-router-dom";

const PromotionsList = () => {
  const navigate = useNavigate();
  const { data: { promotions } = {}, isLoading } = useGetAllPromotionsQuery();

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
              label: "Promo Code",
              key: "promoCode",
            },
            {
              label: "Expiry Date",
              key: "expiry",
            },
            {
              label: "Status",
              key: "isActive",
              modifier: (value) => (value? "Active" : "Inactive"),
            }
          ]}
          title="Promotion Campaigns List"
          data={promotions}
          actions={{
            edit: (id) => {
              navigate(`/admin/promotions/edit/${id}`);
            },
          }}
        />
      </Card>
    </div>
  );
};

export default PromotionsList;
