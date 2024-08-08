import { useEffect, useState } from "react";
import { useGetFeatureFlagQuery } from "../state/redux/features/featuresApi";

const useFeatureFlag = (name, config = {}) => {
  const { data: { featureFlag } = {} } = useGetFeatureFlagQuery(name, config);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (featureFlag) {
      setEnabled(featureFlag.enabled);
    }
  }, [featureFlag]);

  return enabled;
};

export default useFeatureFlag;
