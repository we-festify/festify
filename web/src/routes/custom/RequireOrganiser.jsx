import { Outlet, Navigate } from "react-router-dom";
import {
  selectIsLoggedIn,
  selectIsOrganiser,
} from "../../state/redux/auth/authSlice";
import { useSelector } from "react-redux";
import Forbidden from "../../pages/Forbidden/Forbidden";
import { useAuth } from "../../state/context/Auth";
import FullPageLoading from "../../components/FullPageLoading";

const RequireOrganiser = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isOrganiser = useSelector(selectIsOrganiser);
  const { isLoading } = useAuth();

  if (!isLoggedIn && !isLoading) {
    return (
      <Navigate to="/a/login" state={{ from: window.location.pathname }} />
    );
  }

  if (!isOrganiser && !isLoading) {
    return (
      <Forbidden message="You must be an organiser to access this page." />
    );
  }

  return (
    <>
      {isLoading && <FullPageLoading />}
      <Outlet />
    </>
  );
};

export default RequireOrganiser;
