import { Outlet, Navigate } from "react-router-dom";
import {
  selectIsLoggedIn,
  selectIsAdmin,
} from "../../state/redux/auth/authSlice";
import { useSelector } from "react-redux";
import Forbidden from "../../pages/Forbidden/Forbidden";

const RequireAdmin = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);

  if (!isLoggedIn) {
    return (
      <Navigate to="/a/login" state={{ from: window.location.pathname }} />
    );
  }

  if (!isAdmin) {
    return <Forbidden message="You must be an admin to access this page." />;
  }

  return <Outlet />;
};

export default RequireAdmin;
