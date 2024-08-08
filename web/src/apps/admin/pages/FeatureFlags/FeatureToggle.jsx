import { useToggleFeatureFlagMutation } from "../../../../state/redux/features/featuresApi";
import { toast } from "../../components/Toast";
import styles from "./FeatureFlags.module.css";

const FeatureToggle = ({ feature }) => {
  const [toggleFeatureFlag] = useToggleFeatureFlagMutation();

  const handleToggle = async (name) => {
    try {
      await toggleFeatureFlag(name).unwrap();
    } catch (err) {
      toast.error(err.data.message || err.message || "Something went wrong.");
    }
  };

  return (
    <div className={styles.checkbox}>
      <input
        className={styles.input}
        type="checkbox"
        defaultChecked={feature?.enabled || false}
        onChange={(e) => handleToggle(feature?.name)}
      />
    </div>
  );
};

export default FeatureToggle;
