import { Outlet, Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../state/redux/auth/authSlice";
import { useSelector } from "react-redux";
import { useAuth } from "../../state/context/Auth";
import FullPageLoading from "../../components/FullPageLoading";

const RequireLoggedIn = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { isLoading } = useAuth();

  if (!isLoggedIn && !isLoading) {
    console.log("You are not logged in", isLoading);
    return (
      <Navigate to="/a/login" state={{ from: window.location.pathname }} />
    );
  }

  return (
    <>
      {isLoading && <FullPageLoading />}
      <Outlet />
    </>
  );
};

export default RequireLoggedIn;
