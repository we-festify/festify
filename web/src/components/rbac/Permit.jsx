import {
  selectConfigLoading,
  selectPermissions,
} from "../../state/redux/config/configSlice";
import { selectUser } from "../../state/redux/auth/authSlice";
import { useSelector } from "react-redux";

const Permit = ({ children, type, action }) => {
  const permissions = useSelector(selectPermissions);
  const user = useSelector(selectUser);
  const configLoading = useSelector(selectConfigLoading);

  if (configLoading) return null;

  if (!permissions) return null;
  if (!type || !action) return null;

  const { role } = user || {};
  const permissionGranted = permissions[role]?.[type]?.[action];
  if (!permissionGranted) return null;

  return <>{children}</>;
};

export default Permit;
