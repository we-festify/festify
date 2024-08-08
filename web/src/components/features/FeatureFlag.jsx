import { useGetFeatureFlagQuery } from "../../state/redux/features/featuresApi";

const RequireFeatureFlag = ({ name, children }) => {
  const { data: { featureFlag } = {} } = useGetFeatureFlagQuery(name, {
    skip: !name,
  });

  // If the feature flag is not enabled, return null
  if (name && !featureFlag?.enabled) return null;

  return <>{children}</>;
};

export default RequireFeatureFlag;
