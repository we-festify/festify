import { Outlet, Navigate } from "react-router-dom";
import {
  selectIsLoggedIn,
  selectIsAdmin,
} from "../../state/redux/auth/authSlice";
import { useSelector } from "react-redux";
import Forbidden from "../../pages/Forbidden/Forbidden";
import { useAuth } from "../../state/context/Auth";
import FullPageLoading from "../../components/FullPageLoading";

const RequireAdmin = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);
  const { isLoading } = useAuth();

  if (!isLoggedIn && !isLoading) {
    return (
      <Navigate to="/a/login" state={{ from: window.location.pathname }} />
    );
  }

  if (!isAdmin && !isLoading) {
    return <Forbidden message="You must be an admin to access this page." />;
  }

  return (
    <>
      {isLoading && <FullPageLoading />}
      <Outlet />
    </>
  );
};

export default RequireAdmin;
