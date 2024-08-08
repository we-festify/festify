import Card from "../../components/Card/Card";
import styles from "./FeatureFlags.module.css";
import { useGetFeatureFlagsQuery } from "../../../../state/redux/features/featuresApi";
import DataTable from "../../../../components/AdminCommons/DataTable/DataTable";
import FeatureToggle from "./FeatureToggle";

const FeatureFlagsIndex = () => {
  const { data: { featureFlags } = {} } = useGetFeatureFlagsQuery();

  return (
    <div className={styles.page}>
      <Card>
        <DataTable
          data={featureFlags}
          title="Feature Flags"
          columns={[
            { key: "name", label: "Name" },
            { key: "description", label: "Description" },
            {
              key: "enabled",
              label: "Enabled",
              modifier: (enabled, row) => <FeatureToggle feature={row} />,
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default FeatureFlagsIndex;
