import { useGetMyPermissionsQuery } from "../../state/redux/config/configApi";

const Permit = ({ children, action }) => {
  const { data: { permissions } = {} } = useGetMyPermissionsQuery();

  if (!permissions) return null;
  if (!action) return null;

  if (!permissions.includes(action)) return null;

  return <>{children}</>;
};

export default Permit;
